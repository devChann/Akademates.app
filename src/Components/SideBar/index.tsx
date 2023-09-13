import React, { useState } from "react";

import {
  Children,
  SidebarContainer,
  SidebarWrapper,
  SidebarLogoWrapper,
  SidebarLogo,
  SidebarBrand,
  SidebarToggler,
} from "./SidebarStyles";
import SidebarItems from "./SidebarItems";
import styled from "styled-components";

const ParentContainer= styled.div`
    display: flex;
    flex-direction: row;
`

const MOBILE_VIEW = window.innerWidth < 468;

export default function Sidebar({children} :any) {
  const [displaySidebar, setDisplaySidebar] = useState(!MOBILE_VIEW);
  const handleSidebarDisplay = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (window.innerWidth > 468) {
      setDisplaySidebar(!displaySidebar);
    } else {
      setDisplaySidebar(false);
    }
  };
  
  React.useEffect(()=>{
    let r =  displaySidebar as unknown as string
    localStorage.setItem("displaySidebar", r);
  },[displaySidebar])

  return (
    <ParentContainer className="something">
      <SidebarContainer displaySidebar={displaySidebar}>
        <SidebarWrapper>
          <SidebarLogoWrapper displaySidebar={displaySidebar}>
            <SidebarLogo href="#">
              <SidebarBrand
                displaySidebar={displaySidebar}
                className="app__brand__text"
              >
               
              </SidebarBrand>
            </SidebarLogo>
            <SidebarToggler
              displaySidebar={displaySidebar}
              onClick={handleSidebarDisplay}
            >
              <div className="inner__circle" />
            </SidebarToggler>
          </SidebarLogoWrapper>
          <SidebarItems displaySidebar={displaySidebar} />
        </SidebarWrapper>
      </SidebarContainer>
      <Children  displaySidebar={displaySidebar}>{children}</Children>
    </ParentContainer>
  );
}