import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom';
import { SIDEBAR_DATA as sideBarItems } from '../SideBar/Item';
import Item from './[Items]';
import styled from 'styled-components';
import Sidebar from '../SideBar';
import { UserDto } from '../../types';
import MessageComponent from '../Screens/Messaging/Message';
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
const CurrentPage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-xs);
  font-size: var(--heading-06-size);
  font-family: var(--label-large-label);
  padding:15px;
  font-size: var(--body-03-default-size);
  color: var(--on-surface);
  font-family: var(--font-poppins);
  @media (max-width: 768px) {
    margin-left:1rem;
  }
`;
const TitleWrapper = styled.div`
  position: relative;
  border-radius: var(--br-81xl);
  background-color: var(--color-steelblue);
  width: 8px;
  height: 32px;
`;
const CurrentTitle = styled.b`
  position: relative;
  line-height: 30px;
  text-transform: capitalize;
`;

interface BaseRouterProps {
  user:UserDto
  isAuthenticated :boolean
}
const BaseRouter:React.FunctionComponent<BaseRouterProps> = ({user,isAuthenticated}) =>{
  const  [currentPath,setCurrentPath] = React.useState("Cockpit");
  const userObject =JSON.parse( window.localStorage.getItem("refreshToken") || "{}")
  
  return(
    <ProtectedRoutes isSignedIn = {userObject? true :false}>
      <div id="main">
      <Sidebar>
        <CurrentPage>
          <TitleWrapper />
          <CurrentTitle>{currentPath}</CurrentTitle>
        </CurrentPage>
        <Routes>
            <Route path='messages' index  element={
                <Item User={user} component = {<MessageComponent />}  setCurrentPath={setCurrentPath} page="Message" />
              }/>
                <Route path='notification' index  element={
                <Item User={user} component = {<></>}  setCurrentPath={setCurrentPath} page="Notification" />
              }/>
          {sideBarItems &&
            sideBarItems.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                element={<Item User={user} component = {item.element}  setCurrentPath={setCurrentPath} page={item.name} />}
              />
            ))}
        </Routes>
      </Sidebar>
    </div>
    </ProtectedRoutes>
    
  )
}

export default BaseRouter;

export const ProtectedRoutes = ({isSignedIn,children}:ProtectedRoutesProps)=>{
  if (!isSignedIn) {
    return <Navigate to='/' replace />
  } 
  return children
}