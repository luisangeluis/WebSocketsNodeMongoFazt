import app from "./app";
import { Server as WebsocketServer } from "socket.io"
import http from "http";
import sockets from "./sockets.server";

import { connectMongoDb } from "./db";
import { PORT } from "./config";

connectMongoDb();

const server = http.createServer(app);
const httpServer = server.listen(PORT);

console.log(`Server on port ${PORT}}`);

const io = new WebsocketServer(httpServer);

sockets(io);
