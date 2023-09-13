import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ItemsList,
  ItemContainer,
  ItemWrapper,
  ItemName,
} from "./SidebarStyles";
import { SIDEBAR_DATA } from "./Item";


interface SidebarProps {
    displaySidebar:boolean;
}
interface IconsProps {
    imageSource:string
}
const Icons:FC<IconsProps> = ({imageSource})=>{
    return <img src={imageSource} alt=""></img>
}
const SidebarItems:FC<SidebarProps> = ({displaySidebar}) => {
  const [activeItem, setActiveItem] = useState(1);
  const navigate = useNavigate();
  const logout = ()=>{
    window.localStorage.setItem("refreshToken","");
    navigate('/auth')
    window.location.reload()
  }
  return (
   <>
    <ItemsList>
      {SIDEBAR_DATA.map((itemData, index) => (
        <ItemContainer
          key={index}
          onClick={() => setActiveItem(itemData.id)}
          className={itemData.id === activeItem ? "active" : ""}
        >
          <Link to={itemData.path}>
            <ItemWrapper>
                <Icons imageSource={itemData.icon} />
              <ItemName displaySidebar={displaySidebar}>
                {itemData.name}
              </ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
      ))}
      <ItemContainer  >
            <ItemWrapper onClick={logout}>
              <Icons imageSource="/assets/logoutIcon.svg" />
              <ItemName displaySidebar={displaySidebar}>
               Log out
              </ItemName>
            </ItemWrapper>
        </ItemContainer>
    </ItemsList>
   </>
    
  );
};

export default SidebarItems;