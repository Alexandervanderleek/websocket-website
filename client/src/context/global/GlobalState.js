import React, { useState} from "react";
import GlobalContext from "./globalContext";

const GlobalState = ({children}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [userName, setUserName] = useState(null);
    const [chips, setChips] = useState(null);
    const [players, setPlayers] = useState(null);


    return (
        <GlobalContext.Provider value={{
            players,
            setPlayers,
            isLoading,
            setIsLoading,
            chips,
            setChips,
            userName,
            setUserName
        }}>
            {children}
        </GlobalContext.Provider>
       
    )
}

export default GlobalState;