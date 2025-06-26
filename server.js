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

  const clientId = clients.length + 1;

  // Broadcasting a message to everyone when somebody joins chat
  clients.map((client) => {
    client.socket.write(`User ${clientId} joined!`);
  });
  socket.write(`id-${clientId}`);

  // Listener added, so everytime data comes through the stream we execute an action.
  socket.on("data", (data) => {
    const dataString = data.toString("utf-8");
    const id = dataString.substring(0, dataString.indexOf("-"));
    const message = dataString.substring(dataString.indexOf("-message-") + 9);
    clients.map((client) => {
      client.socket.write(`> User ${id}: ${message}`);
    });
  });

  // Broadcasting a message to everyone when somebody leaves
  socket.on("end", () => {
    clients.map((client) => {
      client.socket.write(`User ${clientId} left!`);
    });
  });

  socket.on("error", () => {
    clients.map((client) => {
      client.socket.write(`User ${clientId} left!`);
    });
  });

  clients.push({ id: clientId, socket });
});

server.listen(port, host, () => {
  console.log("Opened server on", server.address());
});
