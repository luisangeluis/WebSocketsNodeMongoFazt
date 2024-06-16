import app from "./app";
import { Server as WebsocketServer } from "socket.io"
import http from "http";
import sockets from "./sockets.server";

import { connectMongoDb } from "./db";

connectMongoDb();

const server = http.createServer(app);
const httpServer = server.listen(3000);

console.log(`Server on port 3000`);

const io = new WebsocketServer(httpServer);

sockets(io);
