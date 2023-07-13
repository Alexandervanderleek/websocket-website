const express = require('express');
const connectDB = require('./config/db');
const configureRoutes = require('./routes/index')
const configureMiddleware = require('./middleware/index');
const gameSocket = require('./socket/index');
const GameInstance = require('./gameThings/GameInstance');


let db;

(async function(){
    db = await connectDB();
})();

const app = express();

app.use(express.json());

configureMiddleware(app);

configureRoutes(app);


const server = app.listen(5000, () => {
    console.log("server up")
})

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: "*"
    }
})

const gameInstance =  new GameInstance("BET", io);

gameInstance.initGame();


io.on("connection", (socket) => {
    console.log("socket connection")
    gameSocket.init(socket, io, gameInstance)
})




