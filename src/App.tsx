import React from 'react';
import './App.css';
import "primereact/resources/themes/nova-alt/theme.css"
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";  
import "primeflex/primeflex.min.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import {Routes,Route,useLocation} from 'react-router-dom'
import Home from './Components/Screens/HomeScreen/Home';
import  {Login} from './Components/Screens/Auth/login' 
import {Sign} from './Components/Screens/Auth/Sign'
import BaseRouter from './Components/Navigation/Routes';
import GrowlContext from './configs/growlContext';
import {Toast as Growl} from 'primereact/toast'
function App() {
  const[userContext,setUserContext]  = React.useState<{} | null>(window.localStorage.getItem("refreshToken"))
  const [isAuthenticated, setisAuthenticated] = React.useState(false)

  React.useEffect(()=>{
    if (userContext) {
      const timeout = setTimeout(() => {
        setisAuthenticated(true)
        setUserContext(null);
      }, 1000 * 60 * 60); // delete token after 1 hour
     
      return () => {
        clearTimeout(timeout);
      };
    }
  },[userContext, isAuthenticated])

  const curreRoute = useLocation()
  const getCurrentRoute = () => curreRoute.pathname.includes('/') || 
  curreRoute.pathname.includes('/register') || curreRoute.pathname.includes('/auth');
  const isHomePage = getCurrentRoute()
  const growl = React.useRef()

  return (
    <>
    <GrowlContext.Provider value={growl as any} >
     <Growl ref={(el)=>growl.current = el as any} />  
     <Routes>
        <Route path='/'  element={<Home />}/>
        <Route path='/auth'  element={<Login />}/>
        <Route path='/register'  element={<Sign />}/>
     </Routes>
     <BaseRouter />
     {/* {!isHomePage	&& ()} */}
     </GrowlContext.Provider>
    </>
  );
}

export default App;
