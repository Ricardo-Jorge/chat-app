const net = require("net");

// TCP - A server that connects two separate endpoints to communicate.
// IPC - communication between two process inside the same operatin system(same device)
const server = net.createServer();

const port = 3080;
const host = "127.0.0.1";

// An array of client sockets
const clients = [];

server.on("connection", (socket) => {
  console.log("A new connection to the server!");

  // Listener added, so everytime data comes through the stream we execute an action.
  socket.on("data", (data) => {
    clients.map((client) => {
      client.write(data);
    });
  });

  clients.push(socket);
});

server.listen(port, host, () => {
  console.log("Opened server on", server.address());
});
