// This code uses provided code from the provided repository as a starting point
var server = require("http").createServer();
const express = require("express");
const app = express();

app.use(express.text()); // Middleware to parse plain text data

server.on("request", (request, response) => {
    if (request.method === "POST") {
        let body = [];

        request.on("data", chunk => {
            body.push(chunk);
        });

        request.on("end", () => {
            let bodyString = Buffer.concat(body).toString(); // Convert buffer to string
            
            console.log("Received:", bodyString);
            
            response.setHeader("Content-Type", "text/plain");
            response.end(bodyString); // Echo back the received text
        });

        request.on("error", () => {
            response.statusCode = 400;
            response.end();
        });

        response.on("error", err => {
            console.error(err);
        });
    } else {
        response.statusCode = 405; // Method Not Allowed
        response.end("Only POST requests are supported");
    }
});

// Start Express app for proper handling of POST requests
app.post("/", (req, res) => {
    console.log("Express Received:", req.body); // Use Express request body
    res.setHeader("Content-Type", "text/plain");
    res.send(req.body); // Send back the received text
});

// Start the server
server.listen(process.env.PORT || 8008, () => {
    console.log("Server listening at 8008");
});

module.exports = server; // For testing