import React from 'react'
import Header, { DashboardManagement, NavHeader } from './Header'
import {Routes,Route,Link, useLocation} from 'react-router-dom';
import Home from '../Screens/HomeScreen/Home';
import { Login } from '../Screens/Auth/login';
import { Sign } from '../Screens/Auth/Sign';
import ProjectScreen from '../Screens/Projects/ProjectScreen';
import FeedsScreen from '../Screens/Feeds/FeedsScreen';
import ExpertsScreen from '../Screens/Experts/ExpertsScreen';
import UserScreen from '../Screens/UserScreen/UserScreen';

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

  return(
    <>
      <div className="grid">
         <NavHeader />
      </div>
      <div className="grid">
        <div className="col-2">
          <Header />
        </div>
        <div className="col-10">
          <Routes>
            <Route path='/' element={<DashboardManagement /> } />
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