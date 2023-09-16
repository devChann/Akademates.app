import React from 'react'
import styled from 'styled-components'
import { SIDEBAR_DATA as sidebar_items } from '../SideBar/Item'
import { NavLink, useNavigate } from 'react-router-dom'
import { Icons } from '../SideBar/SidebarItems'
const Ul = styled.ul<{open:boolean}>`
    display:none;
    list-style:none;
    .innerlist{
      display: flex;
      gap: 10px;
    }
    @media (max-width:768px) {
        display:flex;
        flex-flow:column nowrap;
        background-color:#ddd9d9f0; 
        position:fixed;
        transform:${({open})=> open ? 'translateX(0)' : 'translateX(100%)'};
        height:100vh;
        width:250px;
        padding-top:3.5rem;
        transition:transform 0.3s ease-in-out;
        z-index:505;
        right:0;

    }
  
`
const Logo = styled.p`
    margin-top:-2.7rem;
    font-size: 20px;
        line-height: 42px;
        color: #227699;
        font-family:var(--title);
`
const RightNav = (props:any) => {
  const navigate = useNavigate();
  const logout = ()=>{
    window.localStorage.setItem("refreshToken","");
    navigate('/auth')
    window.location.reload()
  }
  return (
    <Ul open={props.open}>
        
          <Logo>Akademates</Logo>
       
        {sidebar_items.map((x,r)=>  
          <NavLink to={`/workspace/${x.path}`} className={({ isActive }) =>
            (isActive ? "active-links" : "link")}>
              <div className='innerlist'>
              <Icons imageSource={x.icon} />
                <span>{x.name}</span>
              </div>
          </NavLink>)}
          <div className='innerlist' onClick={logout}>
              <Icons imageSource={'/assets/logoutIcon.svg'} />
                <span>{"Logout"}</span>
          </div>
    </Ul>
  
  )
}

export default RightNav