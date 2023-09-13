import React from 'react'
import styled from 'styled-components'
const Ul = styled.ul<{open:boolean}>`
    .geofence-icon{
      width:1.1rem !important;
      margin-bottom: -4px;
    }
    list-style:none;
    display:flex;
    flex-flow:row nowrap;
    .signout{
      display:none;
    }
   a{
    padding: 18px 10px !important;
    cursor: pointer;
    text-decoration:none;
    color:blue;
   }
    li{
      padding: 18px 10px !important;
      cursor: pointer;
    }
    @media (max-width:768px) {
        flex-flow:column nowrap;
        background-color:#ddd9d9f0; 
        position:fixed;
        transform:${({open})=> open ? 'translateX(0)' : 'translateX(100%)'};
        right:0;
        top:0;
        height:100vh;
        width:250px;
        padding-top:3.5rem;
        transition:transform 0.3s ease-in-out;
        z-index:505;
        .signout{
          display:flex;
          justify-content: flex-end;
          color: brown;
          font-weight: bold;
          font-size: 1rem;
        }
        .elipse{
          display:none;
        }
        li{
            color:white;
            font-weight:400px;
            font-size:14px;
            cursor:pointer
        }
        .user{
          font-size: 12px;
          margin-right: 0px;
          margin-left: 7px;
        }
    }
  
`
const RightNav = (props:any) => {
  return (
    <Ul open={props.open}>
        <div className="icon13">
         <p>Login/register</p>
        </div>
    </Ul>
  
  )
}

export default RightNav