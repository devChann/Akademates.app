import React from 'react'
import Header, { DashboardManagement, NavHeader } from './Header'
import {Routes,Route,Link, useLocation, Navigate} from 'react-router-dom';
import Home from '../Screens/HomeScreen/Home';
import { Login } from '../Screens/Auth/login';
import { Sign } from '../Screens/Auth/Sign';
import ProjectScreen from '../Screens/Projects/ProjectScreen';
import FeedsScreen from '../Screens/Feeds/FeedsScreen';
import ExpertsScreen from '../Screens/Experts/ExpertsScreen';
import UserScreen from '../Screens/UserScreen/UserScreen';
interface ProtectedRoutesProps {
  isSignedIn:boolean;
  children:any
}
const navStyle = {
  paddingTop: "10px",
  paddingBottom: "10px",
  width: "175px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "left",
  alignSelf: "center",
  textDecoration: "none",
};

const BaseRouter = () =>{
  const curreRoute = useLocation()
  const isDashboard= curreRoute.pathname === '/dashboard' || 
  curreRoute.pathname === '/project' ||
  curreRoute.pathname === '/experts' ||curreRoute.pathname === '/settings'


  return(
    <>
      <div className="grid">
       {isDashboard &&(
        <>
        <div className="col-1 admin-panel-1st">
        </div>
        <div className="col-2 admin-panel-2nd">
          <div className="col logo">
            <Link className='nav-links' to="/home"><strong>Akademates</strong></Link>
          </div>
          <Header />
        </div>
        </>
       )}
        <div className="col dashboard-content" >
          <Routes>
            <Route path='/dashboard' element={<DashboardManagement /> } />
            <Route path='/project'  element={<ProjectScreen />}/>
            <Route path='/feeds'  element={<FeedsScreen />}/>
            <Route path='/project'  element={<ProjectScreen />}/>
            <Route path='/experts'  element={<ExpertsScreen />}/>
            <Route path='/settings'  element={<UserScreen />}/>
          </Routes>
        </div>
      </div>
    </>
  )
}

export default BaseRouter;

export const ProtectedRoutes = ({isSignedIn,children}:ProtectedRoutesProps)=>{
  if (!isSignedIn) {
    return <Navigate to='/' replace />
  } 
  return children
}