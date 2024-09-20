const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// Serve the landing page at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'slider.html'));
});

// Serve the main page when redirected to /main
app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});