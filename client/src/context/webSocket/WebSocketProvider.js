import io from 'socket.io-client'
import WebSocketContext from './websocketContext';
import authContext from '../auth/authContext';
import globalContext from '../global/globalContext';
import { useContext, useEffect, useState } from 'react';

const WebSocketProvider = ({children}) => {
    const { setPlayers} = useContext(globalContext);
    const { isLoggedIn } = useContext(authContext);
    const [socket, setSocket] = useState(null);
    const [socketId, setSocketId] = useState(null);


    useEffect(()=>{
        window.addEventListener('beforeunload',cleanUp);
        window.addEventListener('beforeclose',cleanUp);
        return() => cleanUp();
    },[])

    useEffect(()=>{
        if(isLoggedIn){
            const token = localStorage.token;
            const websocket = socket || connect();

            token && websocket && websocket.emit('GET_ALL_PLAYERS', token);
        }else{
            cleanUp();
        }
        return () => cleanUp();
    }, [isLoggedIn])


    function cleanUp(){
        window.socket && window.socket.emit('DISCONNECT');
        window.socket && window.socket.close();
        setSocket(null);
        setSocketId(null);
    }

    function connect(){
        const socket = io('http://localhost:5000/',{
            transports: ['websocket'],
            upgrade: false
        });
        registerCallbacks(socket);
        setSocket(socket);
        window.socket = socket;
        return socket;

    }

    function registerCallbacks(socket) {
        socket.on('GET_ALL_PLAYERS', ({players, socketId}) => {
            setSocketId(socketId);
            setPlayers(players);
            console.log(players);
        })

        socket.on('NEW_PLAYERS', ({players}) => {
            setPlayers(players);
        })

        socket.on('PHASE_CHANGE', (msg) => {
            console.log(msg)
        })

        socket.on("BET_PLACE", (msg1)=>{
            console.log(msg1)
        })
    }

    return ( <WebSocketContext.Provider value={{ socket, socketId }}>
        {children}
    </WebSocketContext.Provider>)




}


export default WebSocketProvider;