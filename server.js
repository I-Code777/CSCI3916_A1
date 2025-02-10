//This code uses provided code from the provided repository as a starting point
var server = require("http").createServer();
const express = require("express");
const app = express();

app.use(express.text()); // Middleware to parse text data

server.on("request", (request, response) => {
    if (request.method === "POST") {
        var body = [];
        request.on("data", chunk => {
            body.push(chunk);
        });

        request
            .on("end", () => {
                let bodyString = Buffer.concat(body).toString(); // Convert buffer to string
                console.log(bodyString);
                response.setHeader("Content-Type", "text/plain");
                response.end(bodyString); // Echo back the received text
            })
            .on("error", () => {
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

server.listen(process.env.PORT || 8008, () => {
    console.log("Server listening at 8008");
});

module.exports = server; // for testing