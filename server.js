const net = require("net");

const port = 3080;
const host = "127.0.0.1";

const server = net.createServer();

server.on("connection", (socket) => {
  console.log("A new connection to the server!");
});

server.listen(port, host, () => {
  console.log("Opened server on", server.address());
});
