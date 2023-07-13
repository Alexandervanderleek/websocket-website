import React, { useContext, useEffect, useState } from 'react'
import authContext from '../context/auth/authContext'


export default function HomePage() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const {isLoggedIn, register} = useContext(authContext);

  
    

  return (
    <div className="h-screen flex justify-center items-center bg-blue-300">



        <div className="flex flex-col bg-slate-100 p-8 rounded-md border-2 shadow-lg border-black content-center" >
          <div className="p-3">
            <input type="text" placeholder="Name" value={name} onChange={(e)=>{setName(e.target.value)}} className="input w-full max-w-xs" />
          </div>
          <div className="p-3">
            <input type="text" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="input w-full max-w-xs" />
          </div>

          <div className="flex justify-evenly">
            <button className="btn btn-info">Login</button>  
            <button className="btn btn-success" onClick={()=>{register(name, password)}}>Register</button>
          </div>
        

        </div>
       
    </div>
  )
}
