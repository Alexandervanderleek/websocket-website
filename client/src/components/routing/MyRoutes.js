import React, { useContext } from 'react'
import { Routes, Route} from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import Play from '../../pages/Play';
import GoAhead from '../util/GoAhead';
import Protected from '../util/Protected';
import authContext from '../../context/auth/authContext';


export default function MyRoutes() {

  const {isLoggedIn} = useContext(authContext);


  return (
    <Routes>
        
          <Route path="/" element={
            <GoAhead isLoggedIn={isLoggedIn}> <HomePage></HomePage> </GoAhead>
            }></Route>
       
          <Route path="/play" element={
          <Protected isLoggedIn={isLoggedIn}> <Play></Play> </Protected>}>          </Route>
       
    </Routes>
  )
}
