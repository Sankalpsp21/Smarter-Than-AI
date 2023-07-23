export const newConnection = (socket, io) => {
      console.log("Someone has connected to the socket");

      const handleDisconnect = () => {
            console.log("Someone has disconnected from the socket");
      };

      const handleMessage = (message) => {
            console.log(`Received message: ${message}`);
            io.emit("message", message);
      };

      socket.on("disconnect", handleDisconnect);
      socket.on("message", handleMessage);

      return () => {
            socket.off("disconnect", handleDisconnect);
            socket.off("message", handleMessage);
      };
};
