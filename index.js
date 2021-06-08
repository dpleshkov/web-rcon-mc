const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const RCON = require("rcon-client").Rcon;
const { Server } = require("socket.io");
const io = new Server(server);
require("dotenv").config();

let main = async function() {
    app.set("view engine", "ejs");
    app.use(express.static("public"));

    let rcon = new RCON({
        host: process.env.RCON_HOST,
        port: Number(process.env.RCON_PORT),
        password: process.env.RCON_PASSWORD
    });

    app.get("/", (req, res) => {
        res.render("index");
    });

    server.listen(process.env.PORT || 3742, () => {
        console.log(`Webserver listening on http://localhost:${process.env.PORT}`)
    });

    io.on("connection", (socket) => {
        socket.on("command", async(command) => {
            if (command.pw !== process.env.RCON_PASSWORD) {
                return socket.send("message", {
                    "author": "Out",
                    "content": "Invalid password",
                    "color": "#ff0000"
                })
            } else {
                await rcon.connect();
                let response = await rcon.send(command.command);
                await rcon.end();
                return socket.send("message", {
                    "author": "Out",
                    "content": response
                });
            }
        })
    })
}

main().then();