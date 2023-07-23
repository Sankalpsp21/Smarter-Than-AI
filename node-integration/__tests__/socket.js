// __tests__/socket.js
import { describe, test } from "@jest/globals";
import { Server } from "socket.io";
import { newConnection } from "../socket.js";

describe("my awesome project", () => {
      let io, serverSocket, cleanupFunction;

      beforeEach((done) => {
            const httpServer = require("http").createServer();
            io = new Server(httpServer);

            serverSocket = new Server();
            io.sockets.sockets.set("fake-client-id", serverSocket);

            cleanupFunction = newConnection(serverSocket, io);
            done();
      });

      afterEach(() => {
            cleanupFunction();
      });


      describe("newConnection", () => {
            test("should send a message to the client when a message is received", (done) => {
                  serverSocket.on("message", (message) => {
                        expect(message).toBe("hello");
                        done();
                  });

                  serverSocket.emit("message", "hello");

                  done();
            });

      });
});
