import React, { Component, useContext } from 'react'
import { Link, Navigate, NavLink, useLocation, useNavigate, useParams} from 'react-router-dom'
import './Navigation.css'
import { Calendar } from 'primereact/calendar';
import ThemeContext, { defaultTheme, Theme } from '../../configs/theme';
import { JsxAttribute } from 'typescript';
import axios from 'axios';
import getFullUrl from '../../configs/axios-custom';
import GrowlContext from '../../configs/growlContext';

type NavBarProps = {
  history:any;
  location:any;
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
const unselectedNavStyle: any = (theme: Theme) => ({
  ...navStyle,
  backgroundColor: theme && theme.colors ? theme.colors.offwhite : "white",
});

const navTextStyle:React.CSSProperties = {
  textAlign: "left",
  font: defaultTheme.v2Fonts.menu,
  color: defaultTheme.v2.black,
  marginBottom: "0px",
  marginTop: "0px",
  borderBottom: "2px solid transparent",
}

function useNavLink (
  path:string,
  name:string, 
  theme:Theme,
  nest:number): [React.Dispatch<boolean>, JSX.Element]
  {
  const [selected,setSelected] = React.useState(false);
  const selectedStyle = {
    ...navStyle,
    backgroundColor: theme.v2.lightBlue,
    borderRadius: "0 22px 22px 0",
  };

  const selectedTextStyle = {
    ...navTextStyle,
    font: theme.v2Fonts.menuSelected,
    color: theme.v2.darkBlue,
  };
  const actualNest = !nest ? 0 : nest;
  const textStyle = selected ? selectedTextStyle : navTextStyle;
  let s: any = { ...textStyle, paddingLeft: 15 + actualNest * 15 };
  
  let linkStyle: any = selected ? selectedStyle : unselectedNavStyle(theme);
  if (!nest) {
    s.font = theme.v2Fonts.menuRootNode;
  }
  const component = (
    <NavLink to={path} style={{...linkStyle}} className=''>
      <p style={s}>{name}</p>
    </NavLink>
  )
  return [setSelected, component]
}
const  Header =()=> {
  const theme = React.useContext(ThemeContext);
   let  navigate = useNavigate() 
   const growl = useContext(GrowlContext)
  const selectedStyle = {
    ...navStyle,
    backgroundColor: theme.v2.lightBlue,
    borderRadius: "0 22px 22px 0",
  };

  const selectedTextStyle = {
    ...navTextStyle,
    font: theme.v2Fonts.menuSelected,
    color: theme.v2.darkBlue,
  };
  

  const [setDashboard,DashboardManagement] = useNavLink(
    '/','Dashboard',theme,0
  )
  const [setProjects,ProjectScreen] = useNavLink(
    '/project','DashboardManagement',theme,0
  )
  const [setOrganization, Organization] = useNavLink(
    '/','Dashboard',theme,0
  )
  const [setProjectPlus,ProjectPlus] = useNavLink(
    '/','Dashboard',theme,0
  )

  function setSelectedPath (path:string){
    setDashboard(false)
    setProjects(false)
    setOrganization(false)
    setProjectPlus(false)

    switch (path) {
      case '/':
        setDashboard(true)
        break;
      case '/project':
        setProjects(true)
        break;
      default:
        break;
    }
  }
  // React.useEffect(()=>{
  //   setSelectedPath(location.pathname);
  //   return history.listen((l:any,a:any)=>{
  //     setSelectedPath(l.pathname)
  //   })
  // })

  const signOut = ()=>{
    axios.post(getFullUrl('/api/auth/logout')).then((res)=>{
      navigate('/home')
      window.localStorage.setItem("refreshToken", "")   
    }).catch((message)=>{

    })
  }
  return (
  <>
        <div className="main-dashboard">
        <div>
          <NavLink to='/' className={({ isActive }) =>
             (isActive ? "active-links" : "link")}>Dashboard</NavLink>
        </div>
        <div>
        <NavLink to='/project' className={({ isActive }) => 
          (isActive ? "active-links" : "link")}>Project +</NavLink>
        </div>
        <div>
         <NavLink to='/feeds' className={({ isActive }) =>
           (isActive ? "active-links" : "link")}>Feeds</NavLink>
        </div>
        <div>
         <NavLink to='/experts' className={({ isActive }) =>
           (isActive ? "active-links" : "link")}>Experts</NavLink>
        </div>
        <div>
          <NavLink to='/settings' className={({ isActive }) => 
          (isActive ? "active-links" : "link")}>Settings</NavLink>
        </div>
        <div onClick={signOut} className="sign-out-button">
            Sign Out 
        </div>
      </div>
  </>
  )
}
export function DashboardManagement (){
  const [date, setDate] = React.useState<Date | Date[] | undefined>(undefined);
  return(
    <>
  
        <div className='dashboard-content'>
          <div className="grid banner-container">
            <div className="col banners">
              <div style={{display:"inline-bloc"}}>
                <p className='banner-inlineTitle'>18</p>
                <p className='banner-text'>New Projects</p>
              </div>
              <div className="div">
                <span><i className="pi pi-clone" style={{fontSize:"3.5rem", color:"orange"}} /></span>
              </div>
              
            </div>
            <div className="col banners">
              <div style={{display:"inline-bloc"}}>
                <p className='banner-inlineTitle'>9</p>
                <p className='banner-text'>Updated projects</p>
              </div>
              <div className="div">
                <span><i className="pi pi-clone" style={{fontSize:"3.5rem", color:"orange"}} /></span>
              </div>
            </div>
            <div className="col banners">
              <div style={{display:"inline-bloc"}}>
                <p className='banner-inlineTitle'>20</p>
                <p className='banner-text'>Top Trending</p>
              </div>
              <div className="div">
                <span><i className="pi pi-clone" style={{fontSize:"3.5rem", color:"orange"}} /></span>
              </div>
            </div>
            <div className="col banners">
              <div style={{display:"inline-bloc"}}>
                <p className='banner-inlineTitle'>10</p>
                <p className='banner-text'>Total Interest</p>
              </div>
              <div className="div">
                <span><i className="pi pi-clone" style={{fontSize:"3.5rem", color:"orange"}} /></span>
              </div>
            </div>
          </div>
          <div className="grid">
            <div className="col-8 banners-content">
              <div className="div">
                <p className='project-headers'>
                  <span><i className="pi pi-clock" style={{fontSize:"1.5rem"}}></i></span>
                    <a style={{marginRight:"5px"}}>New Projects</a> 
                </p>
                <hr />
                <p className='date-title'>24 February 2022</p>
                <p className='project-title'>Update to the USAID Implementing Partner Community Regarding Ukraine</p>
                <p className='project-content'>Local Governance Activity will support the Government of Georgia to implement its new Decentralization Strategy (2020-2025) 
                  and achieve meaningful local self-governance... </p>
                <p className='more'>
                 <a style={{marginRight:"5px"}}>View more details</a> 
                  <span><i className="pi pi-arrow-right"></i></span> </p>
              </div>
              
            </div>
            <div className="col-4 banners-content" style={{maxWidth:"21.5rem"}}>
            <div className="div">
                <p className='project-headers'>
                  <span><i className="pi pi-comments" style={{fontSize:"1.5rem"}}></i></span>
                    <a style={{marginRight:"5px"}}>Trending Discussions</a> 
                </p>
                <hr />
                <p className='date-title'>24 February 2022</p>
                <p className='project-title'>Update to the USAID Implementing Partner Community Regarding Ukraine</p>
                <p className='project-content'>Local Governance Activity will support the Government of Georgia to implement its new Decentralization Strategy (2020-2025) 
                  and achieve meaningful local self-governance... </p>
                <p className='more'>
                 <a style={{marginRight:"5px"}}>Follow</a> 
                  <span><i className="pi pi-arrow-right"></i></span> </p>
              </div>
            </div>
          </div>
          <div className="grid">
            <div className="col-8 banners-content">
               <p className='project-headers'>
                  <span><i className="pi pi-calendar" style={{fontSize:"1.5rem"}}></i></span>
                    <a style={{marginRight:"5px"}}>Events</a> 
                </p>
                <hr />
              <div className="events-container">
                <div className="calender-container">
                   <Calendar className='calender' inline value={date} onChange={(e) => setDate(e.value)}></Calendar>
                </div>
                <div className="div">
                  <p className='events-title'>2 Events available on March 8th</p>
                  <p className='event-name'>Veterans Small Business Conference</p>
                  <div className='events-footer'>
                    <p className='event-org'>USAID</p>
                    <span className='rcvp-inline'>
                      <i className='pi pi-external-link' style={{fontSize:"0.7rem"}}></i>
                        RSVP
                      </span>
                  </div>
                  	<hr />
                    <p className='events-title'>2 Events available on March 8th</p>
                  <p className='event-name'>How-to Guide Launch: How Can We Develop Effective Numeracy Programs?	</p>
                  <div className='events-footer'>
                    <p className='event-org'>RTI International</p>
                    <span className='rcvp-inline'>
                      <i className='pi pi-external-link' style={{fontSize:"0.7rem"}}></i>
                        RSVP
                      </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4 banners-content" style={{maxWidth:"21.5rem"}}>
               <div className="user-feedback">
               <p className='project-headers'>
                  <span><i className="pi pi-envelope" style={{fontSize:"1.5rem"}}></i></span>
                    <a style={{marginRight:"5px"}}>User Feedback</a> 
                </p>
                <hr />
               <p className='events-title'>We want Akademates to be the one shop for all your industry needs.</p>
               <p>Are we missing something?</p> 
                <button className='feedback'>Submit Feedback</button>
               </div>
            </div>
          </div>
        </div>
    </>
  )
}
export function NavHeader(){
    const userToken=window.localStorage.getItem("refreshToken")
    return(
        <>
         <div className="col logo">
         <Link className='nav-links' to="/home"><strong>Akademates</strong> </Link>
         </div>
         {!userToken &&(
           <div className="col nav-container">
            <Link className='nav-links' to="/register"><p>Join Now</p></Link>
            <Link className='nav-links' to="/auth"><p>Sign In</p></Link>
          </div>
         )}
       
        </>
    )
}
export default Header;


function withRouter(Component: ({ history, location }: NavBarProps) => JSX.Element) {
  function ComponentWithRouterProps (props:any){
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component 
      {...props}
      router = {{location,navigate,params}} />
    )
  }
  return ComponentWithRouterProps
}
