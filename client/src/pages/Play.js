import React, {useContext,useEffect, useState} from 'react'
import authContext from '../context/auth/authContext'
import globalContext from '../context/global/globalContext';
import websocketContext from '../context/webSocket/websocketContext';


export default function Play() {

  const {isLoggedIn} = useContext(authContext);
  const {players, chips, userName} = useContext(globalContext)
  const [bet, setBet] = useState('');
  const {socket} = useContext(websocketContext);

  const placeBet = () => {
    if(+(bet) > chips){
      alert("Sorry not enough chips")
    }else{
      if(localStorage.token){
        socket.emit("PLACE_BET", {
          token: localStorage.token,
          bet: +(bet)
        })
      }
    }
  }
  
    return (
        <div class="bg-sky-400 h-screen">
          <div class="w-1/2">
            <h1 class="font-bold text-xl">- All players on page -</h1>
            <table class="table w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                  </tr>
                </thead>
                <tbody>
                  {players && players.map((player)=>(
                      <tr>
                      <th>-</th>
                      <td>{player.name}</td>
                      <td>Tax Accountant</td>
                      <td>Red</td>
                    </tr>
                  ))}
                </tbody>
            </table>
          </div>
          
          <div class="stats bg-primary text-primary-content">
  
            <div class="stat">
              <div class="stat-title">Account balance</div>
              <div class="stat-value">$ {chips}</div>
            </div>
            
            <div class="stat">
              <div class="stat-title">Current User</div>
              <div class="stat-value">{userName}</div>
            
            </div>
  
          </div>

          <div>
            <input type="text" placeholder="Type here" onChange={(e)=>{setBet(e.target.value)}} value={bet} class="input input-bordered w-full max-w-xs" />
            <button onClick={placeBet}  class="btn btn-success">Place Bet</button>

          </div>


        </div>
      )
  

 
}
