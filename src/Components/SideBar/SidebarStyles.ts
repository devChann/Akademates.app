import styled from "styled-components";

// Children Component
export const Children = styled.div<{displaySidebar:boolean}>`
  width: 100%;
  height: 88vh;
  max-height: 88vh;
  transition: margin-left 1s ease; /* Add transition property */
  margin-left:${({displaySidebar})=> displaySidebar ? "14rem" : "4rem"};
  /* resize graph size depending on sidebar  status */

  .events-container{
    max-width: ${({ displaySidebar }) => (displaySidebar ? "81vw" : "91vw")};
  }
  .side-panel{
    max-width: ${({ displaySidebar }) => (displaySidebar ? "81vw" : "91vw")};
    margin-left : ${({ displaySidebar }) => (displaySidebar ? "0rem" : "1rem")};
  }
  .post-wrapper{
    width: ${({ displaySidebar }) => (displaySidebar ? "80vw" : "88vw")};
  }
  .project-table{
    max-width: ${({ displaySidebar }) => (displaySidebar ? "50vw" : "55vw")};
  }
  .post-titles{
    width: ${({ displaySidebar }) => (displaySidebar ? "75vw" : "85vw")};
  }

  @media (max-width: 768px) {
    .post-titles{
      width: 78vw;
    }
    
  }
  .notes {
    width: ${({ displaySidebar }) => (displaySidebar ? "26vw" : "33vw")};
  }
  .chat-panel{
    width: ${({ displaySidebar }) => (displaySidebar ? "60vw" : "70vw")};
  }
  @media (max-width: 468px) {
    margin-left: 0rem;
  }
  
`;

export const SidebarWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
`;

export const SidebarLogoWrapper = styled.div<{displaySidebar:boolean}>`
  /* padding: 0.7rem 0rem; */
  margin-bottom: 1rem;
  display: flex;
  justify-content: ${({ displaySidebar }) =>
    displaySidebar ? "space-between" : "center"};
  align-items: center;

  @media (max-width: 468px) {
    justify-content: center;
  }
`;

export const SidebarLogo = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 468px) {
    display: none;
  }
`;

export const SidebarBrand = styled.span<{displaySidebar:boolean}>`
  display: ${({ displaySidebar }) => (displaySidebar ? "block" : "none")};
`;

export const SidebarToggler = styled.button<{displaySidebar:boolean}>`
  cursor: pointer;
  display: ${({ displaySidebar }) => (displaySidebar ? "block" : "none")};
  background: white;
  border:none;
  margin-left: -2.7rem;
  /* margin-top: 1rem; */
  @media (max-width: 468px) {
    display: block;
  }
`;

// SidebarItem styles
export const ItemsList = styled.ul`
  list-style: none;
  margin-left:none;
  padding: 1.5rem;
  `;

export const ItemContainer = styled.li`
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.5rem 1rem;
  /* border-radius: 0.2rem; */
  cursor: pointer;
  color:#FFFFFF;
  margin-bottom:2rem;
  &:hover {
    background:#227699;
    color:#FFFFFF;
  }

  &.active {
    background: #227699;
   
    span{
      color: #FFF !important;
    }
  }
`;

export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #7c7788;
  font-family: var(--font-inter);
  font-style: normal;
  font-weight: 500;
  font-size: var(--font-size-lg);
  line-height: 150%;
  align-items: center;
`;

export const ItemName = styled.span<{displaySidebar:boolean}>`
  margin-left: ${({ displaySidebar }) => (displaySidebar ? "0.5rem" : "0")};
  display: ${({ displaySidebar }) => (displaySidebar ? "block" : "none")};
  text-transform: capitalize;
  cursor: pointer;
  color: var(--on-surface, #121212);
`;

// Sidebar Container
export const SidebarContainer = styled.div<{displaySidebar:boolean}>`
  position: fixed;
  left: 0;
  width: ${({ displaySidebar }) => (displaySidebar ? "14rem" : "5rem")};
  /* height: 100vh; */
  background-color: var(--default-white);;
  transition: width 350ms ease;
  border-right: 1px solid #d4d8dd;
  overflow-x: hidden;
  z-index:100;
  max-height:88vh;
  height:88vh;
  /* ${({ displaySidebar }) =>
    displaySidebar && "box-shadow: 8px 0px 12px 0px rgba(0,0,0,0.1)"}; */
  .posts-container{
    width: ${({ displaySidebar }) => (displaySidebar ? "55vw" : "67vw")};
  }
  ${ItemWrapper} {
    justify-content: ${({ displaySidebar }) => !displaySidebar && "center"};
  }

  &:hover {
    ${({ displaySidebar }) =>
      !displaySidebar && "box-shadow: 8px 0px 12px 0px rgba(0,0,0,0.1)"};

    @media (min-width: 468px) {
      width: ${({ displaySidebar }) => !displaySidebar && "14rem"};

      ${SidebarLogoWrapper} {
        justify-content: ${({ displaySidebar }) =>
          !displaySidebar && "space-between"};
      }

      ${SidebarBrand} {
        display: ${({ displaySidebar }) => !displaySidebar && "block"};
      }

      ${SidebarToggler} {
        display: ${({ displaySidebar }) => !displaySidebar && "block"};
      }

      ${ItemWrapper} {
        justify-content: ${({ displaySidebar }) =>
          !displaySidebar && "flex-start"};
      }

      ${ItemName} {
        display: ${({ displaySidebar }) => !displaySidebar && "block"};
        margin-left: ${({ displaySidebar }) => !displaySidebar && "0.5rem"};
      }
    }
  }

  ::-webkit-scrollbar {
    width: 4px;
    height: 3px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #eaeced;

    &:hover {
      background: #171823;
    }
  }

  @media (max-width: 468px) {
    width: 5rem;
    display:none;
  }
`;