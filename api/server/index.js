import express from "express";
import logger from "morgan";
import { Server } from "socket.io";
import { createServer } from "node:http";

const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:5173",
	},
});
app.use(logger("dev"));

app.get("/", (req, res) => {
	res.send("hola");
});

io.on("connection", (socket) => {
	console.log("user connected");
	socket.on("chat", (msg) => {
		console.log("mensage", msg);
	});
});

server.listen(port, () => {
	console.log(`Server running on port http://localhost:${port}`);
});
