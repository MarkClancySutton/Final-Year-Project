// Import necessary modules
const http = require('http');
const fs = require('fs');

// Create an HTTP server
const server = http.createServer((req, res) => {
  if (req.url === '/home.js') {
    // Read the content of the "home.js" file
    fs.readFile('home.js', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.end(data);
      }
    });
  } else if (req.url === '/') {
    // Serve an HTML page with a button
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Press Me Button</title>
        </head>
        <body>
          <button id="pressMeButton">Press Me</button>
          <script src="/home.js"></script>
        </body>
      </html>
    `);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found');
  }
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
