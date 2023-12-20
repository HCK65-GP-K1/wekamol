if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const http = require('http')
const app = express();
const cors = require("cors");

const { Server } = require('socket.io')
const server = http.createServer(app)

const errorHandler = require("./middlewares/errorHandler");
const router = require("./routers");

const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  socket.emit('new-connection', {id: socket.id})

})

app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

app.use(errorHandler);

module.exports = { server, io };
