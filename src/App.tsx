import React from 'react';
import './App.css';
import "primereact/resources/themes/mdc-light-indigo/theme.css"
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";  
import 'mapbox-gl/dist/mapbox-gl.css';
import {Routes,Route,useNavigate} from 'react-router-dom'
import Home, { NavBar } from './Components/Screens/HomeScreen/Home';
import  {Login} from './Components/Screens/Auth/login' 
import {Sign} from './Components/Screens/Auth/Sign'
import BaseRouter from './Components/Navigation/Routes';
import GrowlContext from './configs/growlContext';
import {Toast as Growl} from 'primereact/toast'
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import axios from 'axios';
import getFullUrl from './configs/axios-custom';
import { UserDto } from './types';

const Main = styled.div`
     display: flex;
     flex-direction: column;
     width:100%;
    @media (max-width: 768px) {
      overflow-x: hidden;
    }
`
// user ? JSON.parse(user) : null;
function App() {

  const userObject =JSON.parse( window.localStorage.getItem("refreshToken") || "{}")
  const [userContext] = React.useState(userObject);
  
  const [isAuthenticated, setisAuthenticated] = React.useState(false)
  const [userInfo,setUserInfo] = React.useState<UserDto | null>(null);
  const growl = React.useRef()
  const  navigate = useNavigate();

    

  React.useEffect(()=>{
    if (!userContext) {
      navigate('/auth')
      return
  }else{
    const {id} = userContext
    axios.get(getFullUrl(`/api/Auth/user/${id}`)).then((res)=>{
      const a = res.data
      const data = a as UserDto
      setUserInfo(data)
      setisAuthenticated(true)
  }).catch((error)=>{
      console.log(error)
  })
  }
  },[userContext,isAuthenticated])

  return (
    <>
      <GrowlContext.Provider value={growl as any} >
      <Growl ref={(el)=>growl.current = el as any} />
        <Main>
        <NavBar user={userInfo} />
        <Routes>
            <Route path='' index  element={<Home />}/>
            <Route path='/auth'  element={<Login />}/>
            <Route path='/register'  element={<Sign />}/>
            <Route path='/workspace/*' 
              element={<BaseRouter isAuthenticated={isAuthenticated} 
                user={userInfo as UserDto} />} />
         </Routes>
      </Main>
      </GrowlContext.Provider>
    </>
  );
}

export default App;
