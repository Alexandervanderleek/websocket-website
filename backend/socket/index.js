const jwt = require('jsonwebtoken');
const Player = require('../gameThings/Player');



const players = {};
current_phase = "BET";




const init = (socket, io, gameInstance) => {
    socket.on("GET_ALL_PLAYERS", async(token) => {
        console.log("Get all players")
        jwt.verify(token, 'pastaman', (err,decoded) => {
            if(err) console.log(err);
            else{
                user = decoded.user;
            }
        })

        if(user) {

            const found = gameInstance.hasPlayer(user.id)

            if(found){
                gameInstance.removePlayer([found.socketId]);
            }
        }

        user = await User.findById(user.id).select('-password');


        gameInstance.addPlayer(socket.id, new Player(
            socket.id,
            user._id,
            user.name,
            user.chipsAmount,
        ))

        socket.emit("GET_ALL_PLAYERS", {
            players: gameInstance.getPlayerList(),
            socketId: socket.id
        });

        socket.broadcast.emit("NEW_PLAYERS",{players: gameInstance.getPlayerList()})
    })

    socket.on("DISCONNECT",()=>{
        console.log("We are disconnecting")
        gameInstance.removePlayer(socket.id)

        socket.broadcast.emit("NEW_PLAYERS", {players: gameInstance.getPlayerList()});

    })

    socket.on("PLACE_BET", async(bet_stat) => {
        jwt.verify(bet_stat.token, 'pastaman', (err,decoded) => {
            if(err) console.log(err);
            else{
                user = decoded.user;
            }
        })

        user = await User.findById(user.id).select('-password');

        if(user.chipsAmount >= bet_stat.bet){
            user.chipsAmount -= bet_stat.bet;
        }

        await user.save()

        socket.emit('BET_PLACE',{
            user: user.chipsAmount,
            result: "placced a bet"
        })

    } )

}


module.exports = { init }