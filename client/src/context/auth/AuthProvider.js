import React from "react";
import AuthContext from './authContext';
import useAuth from '../../hooks/useAuth';

const AuthProvider = ({children}) => {
    const [isLoggedIn, register] = useAuth();

  

    return(
        <AuthContext.Provider value={{isLoggedIn, register}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider; 