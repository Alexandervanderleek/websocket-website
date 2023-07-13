import { useContext } from "react";
import globalContext from "./context/global/globalContext";
import authContext from "./context/auth/authContext";
import LoadingScreen from "./components/loading/LoadingScreen";
import MyRoutes from "./components/routing/MyRoutes";


function App() {
  
  const {isLoading, userName, chips, setChips, setIsLoading} = useContext(globalContext);
  const {  isLoggedIn , register } = useContext(authContext);
  
  return (
    <>
    {isLoading ? (
      <LoadingScreen></LoadingScreen>
    ):(
      <MyRoutes></MyRoutes>
    )}
    </>




  );
}

export default App;
