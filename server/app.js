if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");

const { Server } = require("socket.io");
const server = http.createServer(app);

const errorHandler = require("./middlewares/errorHandler");
const router = require("./routers");

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const rooms = {
  1: {
    playerList: [],
  },
  2: {
    playerList: [],
  },
  3: {
    playerList: [],
  },
};

io.on("connection", (socket) => {
  // socket.emit("new-connection", { id: socket.id });
  console.log("a user is connected", { id: socket.id });

  socket.on("join-room", (roomId, callback) => {
    socket.join(roomId);

    rooms[roomId].playerList.push({ id: socket.id, score: 0, status: true });

    socket.to(roomId).emit("playerList", rooms[roomId]);

    callback(rooms[roomId]);

    // console.dir(rooms, { depth: null }, "ON JOIN");
  });

  socket.on("gameover", (props) => {
    // console.log(rooms);
    // console.log(props)
    const { room, id, score, status } = props;


    // rooms[room].playerList = rooms[room].playerList.map((player) => {
    //   // console.log(player);
    //   if (player.id === id) {
    //     player.score = score;
    //   }
    //   return player;
    // });

    // // console.log(rooms[room], "JEJEJEJEJJEJEJEE");

    // const maxScore = rooms[room].playerList.reduce(
    //   (max, player) => (player.score > max ? player.score : max),
    //   -Infinity
    // );

    // // console.log(maxScore, "MAXSCORE");

    // const winners = rooms[room].playerList.filter((player) => {
    //   return player.score === maxScore;
    // });
    // // console.log(winners, "SSSSSSSSS");

    // rooms[room].playerList.forEach((player) => {
    //   // console.log(player, "LOOP");
    //   const isWinner = winners.some((winner) => winner.id === player.id);
    //   // console.log(player, "LOOP 2");
    //   const result = isWinner ? "Loser" : "Winner";
    //   // console.log(player, "LOOP 3");

    //   // Emit status and score back to each client
    //   socket.to(player.id).emit("gameResult", { result, score: player.score });
    // });

    rooms[room].playerList = [];
    // console.log(rooms, "ON GAMEOVER");
  });

  // socket.on("disconnect", () => {
  //   console.log("user disconnected", socket.id);
  // });
});

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

app.use(errorHandler);

module.exports = { server, io };
