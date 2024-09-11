# Markdown File Browser

This is a simple web application that allows you to browse, view, and download Markdown files from a specified directory.

## Author
Chetan Vashistth

## Organization
NEC Corporation India

## Features

- List all Markdown files in the `markdown` directory
- View rendered Markdown files in the browser
- Download Markdown files
- Sort files by last modified date
- Display creation and modification dates for each file

## Feature Suggestions

We welcome your ideas for improving Markdown File Browser! If you have suggestions for new features or enhancements, please check out our [Suggestions Guide](suggestions.md) for information on how to submit your ideas.

## Prerequisites

- Node.js (v12 or higher recommended)
- npm (comes with Node.js)

## Installation

1. Clone this repository or download the source code.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the dependencies.

## Usage

1. Place your Markdown files in the `markdown` directory.
2. To start the server in development mode (with auto-restart on file changes):
   ```bash
   npm run dev
   ```
   Or to start the server in production mode:
   ```bash
   npm start
   ```
3. Open a web browser and go to `http://localhost:3000`.
4. You should see a list of your Markdown files. Click on "View" to see the rendered Markdown or "Download" to download the file.

## Hosting on LAN

To make the application accessible on your local network:

1. Find your computer's IP address:
   - On Windows: Open Command Prompt and type `ipconfig`
   - On macOS/Linux: Open Terminal and type `ifconfig` or `ip addr show`

2. Start the server as described in the Usage section.

3. On other devices in the same network, open a web browser and go to `http://<your-ip-address>:3000`
   Replace `<your-ip-address>` with the IP address you found in step 1.

Note: Ensure your firewall allows incoming connections on port 3000, or change the port in `server.js` if needed.

## Project Structure

- `server.js`: The main server file
- `public/index.html`: The front-end HTML file
- `markdown/`: Directory to store your Markdown files
- `package.json`: Project dependencies and scripts
- `nodemon.json`: Configuration for nodemon (used in development)

## Contributing

Feel free to fork this project and submit pull requests with improvements or bug fixes.

## License

This project is open source and available under the [MIT License](LICENSE).

© 2023 NEC Corporation India. All rights reserved.