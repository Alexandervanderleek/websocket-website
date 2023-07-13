class GameInstance {
  constructor(phase, io) {
    this.players = {};
    this.bets = {};
    this.phase = phase;
    this.io = io
  }

  initGame(){
    let start_time = Date.now() 
    setInterval(()=>{
        let time_elapsed = (Date.now() - start_time) / 1000.0
        switch(this.phase){
            case "BET":
                if(time_elapsed>6){
                    console.log("bet")
                    start_time = Date.now();
                    this.io.emit('PHASE_CHANGE','SPIN');
                    this.phase = 'SPIN';
                }
                break;
            case "SPIN":
                if(time_elapsed>6){
                    console.log('spin')
                    start_time = Date.now();
                    this.io.emit('PHASE_CHANGE','PAYOUT');
                    this.phase = 'PAYOUT';
                }
                break;
            case "PAYOUT":
                if(time_elapsed>6){
                    console.log('payout')
                    start_time = Date.now();
                    this.io.emit('PHASE_CHANGE','BET');
                    this.phase = 'BET';
                }
                break;
        }

    
    },1000)
  }

  addPlayer(id,player){
    this.players[id] = player;
   }

   removePlayer(socketId){
    delete this.players[socketId]
   }

   hasPlayer(id){
        Object.values(this.players).find((player) => {
            return player.id == id;
        })
   }

   getPlayerList(){
    return Object.values(this.players).map((player)=>({
        socketId: player.socketId,
        id: player.id,
        name: player.name,
    }))
   }

  

   
}

module.exports = GameInstance;