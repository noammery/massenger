const express = require(`express`);
const { default: mongoose } = require("mongoose");
const app = express();
const http = require("http");
const { Server } = require(`socket.io`);
const cors = require(`cors`);
const bodyParser = require(`body-parser`);
const usersRouter = require(`./routes/usersApi`);
mongoose.Promise = global.Promise;
mongoose
  .connect(
    "mongodb+srv://noammery55:ekoMeuvSpIn6Ig3U@cluster0.hv4fomr.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log(`Connected to Data-base`))
  .catch((err) => console.log(err));

app.use(cors());

app.use(bodyParser.json());

const server = http.createServer(app);

app.use(`/user`, usersRouter);

const io = new Server(server, {
  cors: {
    origin: `http://localhost:3000`,
    methods: ["GET", "POST"],
  },
});

io.on(`connection`, (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on(`join_room`, (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on(`send_message`, (message) => {
    socket.to(message.room).emit("receive_message", message);
  });

  socket.on(`disconnect`, () => {
    console.log(`User  ${socket.id} disconnect`);
  });
});

server.listen(3001, () => {
  console.log("server is running on port 3001");
});
