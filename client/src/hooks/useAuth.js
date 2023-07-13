import { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import setAuthToken from '../util/setAuthToken';
import globalContext from '../context/global/globalContext';

const useAuth = () => {
    localStorage.token && setAuthToken(localStorage.token);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const { setUserName, setChips, setIsLoading } = useContext(globalContext);

    useEffect(()=>{
        
        setIsLoading(true);

        const token = localStorage.token;
        console.log(token)
        if(token) {
            loadUser(token)
        }else{
            setIsLoading(false);
        }

       
    },[])


    const register = async( name, password) =>{
        setIsLoading(true);

        try{
            const res = await Axios.post('http://localhost:5000/api/users',{
                name,
                password
            });

            const token = res.data.token;

            if(token){
                localStorage.setItem('token', token);
                setAuthToken(token);
                await loadUser(token)
                
            }
        }catch(error){
            alert(error);
        }

        setIsLoading(false);

    }

    const loadUser = async(token) => {
        setIsLoading(true)
        try{
            const res = await Axios.get('http://localhost:5000/api/auth',{
                headers: {
                    'x-auth-token': token,
                }
            })

            const {_id, name, chipsAmount } = res.data;

            setIsLoggedIn(true);
            setChips(chipsAmount);
            setUserName(name);

            

        }catch(error){
            localStorage.removeItem('token');
            alert(error)
        }
        setIsLoading(false)
    }

    return [isLoggedIn, register, loadUser];
}

export default useAuth;