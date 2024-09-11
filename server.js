const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const marked = require('marked');
const crypto = require('crypto');

const app = express();
const port = 3000;

// Define the path for the Markdown files folder
const mdFolderPath = path.join(__dirname, 'markdown');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// List Markdown files route
app.get('/list-md', async (req, res) => {
    try {
        const files = await fs.readdir(mdFolderPath);
        const mdFiles = await Promise.all(files
            .filter(file => file.endsWith('.md'))
            .map(async file => {
                const filePath = path.join(mdFolderPath, file);
                const stats = await fs.stat(filePath);
                return {
                    name: file,
                    created: stats.birthtime,
                    modified: stats.mtime
                };
            }));
        
        // Sort by date modified (most recent first)
        mdFiles.sort((a, b) => b.modified - a.modified);
        
        res.json(mdFiles);
    } catch (err) {
        res.status(500).send('Error reading markdown directory');
    }
});

// Render Markdown file route
app.get('/render/:filename', async (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(mdFolderPath, filename);

    try {
        const data = await fs.readFile(filePath, 'utf8');
        const htmlContent = marked.parse(data);
        
        // Generate a unique ETag for this content
        const etag = crypto.createHash('md5').update(data).digest('hex');
        
        res.set({
            'ETag': etag,
            'Cache-Control': 'no-cache'
        });

        res.send(`
            <html>
                <head>
                    <title>${filename}</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
                        pre { background-color: #f4f4f4; padding: 10px; border-radius: 5px; }
                        .home-button { 
                            position: fixed; 
                            top: 10px; 
                            right: 10px; 
                            padding: 10px 20px; 
                            background-color: #007bff; 
                            color: white; 
                            text-decoration: none; 
                            border-radius: 5px; 
                        }
                        .home-button:hover { 
                            background-color: #0056b3; 
                        }
                    </style>
                </head>
                <body>
                    <a href="/" class="home-button">Home</a>
                    ${htmlContent}
                </body>
            </html>
        `);
    } catch (err) {
        res.status(404).send('File not found');
    }
});

// Add this new route for file downloads
app.get('/download/:filename', async (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(mdFolderPath, filename);

    try {
        await fs.access(filePath);
        res.download(filePath);
    } catch (err) {
        res.status(404).send('File not found');
    }
});

const ip = '0.0.0.0'; // This allows the server to listen on all network interfaces
app.listen(port, ip, () => {
    console.log(`MD server running at http://${ip}:${port}`);
    console.log(`For LAN access, use your computer's IP address instead of ${ip}`);
});