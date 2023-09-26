import React, { FC, FunctionComponent } from 'react';
import './Home.css';
import {MapContainer,TileLayer,Marker,Popup} from 'react-leaflet'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CounterComponent from './Fragment/Counter';
import ProjectCategories from './Fragment/ProjectCategories';
import HowItsWorks from './Fragment/HowItsWorks';
import Footer from './Fragment/Footer';
import { HomeTotals, Notification, UserDto } from '../../../types';
import { Sidebar } from 'primereact/sidebar';
import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import getFullUrl from '../../../configs/axios-custom';
import axios from 'axios';
import { Divider } from 'primereact/divider';
import Burger from '../../Navigation/Burger';
// styles
const NairobiKenya = styled.div`
  position: relative;
  line-height: 22px;
`;
const HelpCircleIcon = styled.img`
  overflow: hidden;
  flex-shrink: 0;
  width:24px;
  cursor:pointer;
  @media(max-width: 768px) {
      /* display : none; */
    }
`;
const Login = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-5xs);
  cursor: pointer;
`;
const Header = styled.div`
    font-family:var(--title);
    display: flex;
    width: 100vw;
    justify-content: space-between;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    border-bottom: 1px solid #8080801f;
    top: 0;
    position: fixed;
    z-index: 1000;
    background:white;
    .innerHeader{
      display:flex;
      gap:8px;
      p{
        margin:auto;
      }
    }
    .icons-header{
      display:flex;
      flex-direction:row;
      gap:var( --gap-5xs);
      line-height: 42px;
      height:69px;
      width:auto;
      justify-content:space-between;
    }
    .logo{
        font-style: normal;
        font-weight: 700;
        font-size: 30px;
        line-height: 42px;
        color: #227699;
        font-family:var(--title);
        padding-top:10px;
        cursor:pointer;
    }
    .user-name{
      margin:auto;
      cursor:pointer;
    }
    @media (max-width: 768px) {
      padding-left:20px;
      padding-right:20px;
      background: #cfcfcf1a;
      .icons-header{
        width:inherit;
      }
      .logo{
        display:none;
      }
    .innerHeader{
      display: none;
    }
    }
`;
const Slide = styled.div`
  background: linear-gradient(-77.98deg, #fff);
  width: 100%;
  height: 547px;
  overflow: hidden;
  font-size: var(--label-large-label-size);
  display:flex;
  margin-top:68px;

  .image-background{
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        width: 100%;
    
    img{
      height: 600px;
      width: 604px;
      padding: 3rem;
      opacity: 0.4;
    }
  }
  @media (max-width: 768px) {
    .image-background{
      display:none
    }
    height:fit-content;
  }
`;
const TitleWrapper = styled.div`
    /* width: 612px; */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    -webkit-box-pack: start;
    justify-content: flex-start;
    font-size: var(--heading-02-size);
    color: var(--color-steelblue);
    padding: 5rem;
    .logo{
        font-style: normal;
        font-weight: 700;
        font-size: 30px;
        line-height: 42px;
        color: #227699;
        font-family:var(--title);
        padding-top:10px;
        cursor:pointer;
        display:none;
    }
    @media (max-width: 768px) {
      padding:5px;
      align-items:center;
      .logo{
        display:flex;
      }
    }
`;

const TitleWrapperInner = styled.div`
  /* width: 612px; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
    @media (max-width: 768px) {
        justify-content:center
    }
    @media (max-width: 400px) {
        justify-content:center
    }
   
`;
const ForgingLinksBetween = styled.b`
  position: relative;
  line-height: 68px;
  text-transform: capitalize;
  display: inline-block;
  /* width: 562px; */
  margin:5px;
  @media (max-width: 768px) {
    font-size: 21px;
    width: 100%;
    text-align: center;
    line-height: 44px;
  }
`;

const CreatingNewConnections = styled.div`
  font-size: var(--body-02-size);
  line-height: 28px;
  font-family: var(--font-lato);
  color: var(--secondary);
  display: inline-block;
  /* width: 612px; */
  margin:5px;
  @media (max-width: 768px) {
    text-align:center;
    font-size:14px;
  }
`;
const Button= styled.div`
  border-radius: var(--br-9xs);
  background-color: var(--color-steelblue);
  display: flex;
  flex-direction: row;
  padding: var(--padding-xs) var(--padding-13xl);
  align-items: flex-start;
  justify-content: flex-start;
  text-align: center;
  margin:15px;
  cursor: pointer;
`;
const AllCategories = styled.b`
  position: relative;
  line-height: 26px;
  text-transform: capitalize;
  color:white;
  font-size:13px;
`;
const Heading8 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-base);
  font-size: var(--heading-04-size);
  color: var(--on-surface2);
  margin-top:5rem;
  margin-bottom:10px;
`;
const SmallToMedium = styled.b`
  position: relative;
  line-height: 44px;
`;
const Subtitle = styled.div`
  position: relative;
  font-size: var(--body-02-size);
  line-height: 28px;
  color: var(--secondary);
  text-align: center;
  display: inline-block;
  width: 708px;
`;

const NortificationContainer = styled.div`
    cursor: pointer;
    .unread{
    background: aliceblue;
    color: black;
    padding: 1rem;
    font-family: var(--title);
    border-radius: 10px;
    }
    .read{
      color: black;
      padding: 1rem;
      font-family: var(--title);
      border-radius: 10px;
    }
`
const  NortificationHeader = styled.div`
  font-family:var(--title);
  font-size:15px;
  font-weight:500;
`
const UserDetailsContainer = styled.div`
    display:flex;
    gap:15px;s
`
type CoordsProps ={
    lng:number,
    lat:number,
}
export interface MapProps {
    coordinates : Array<CoordsProps>;
}

interface UserData {
  user: UserDto | null
}

export  const  NavBar:FC<UserData> = ({user})=>{
  const MobileView = window.innerWidth < 768 ? true : false
  const [showSideBar,setShowSidebar] =  React.useState(false)
  const navigate = useNavigate();
  const [connection, setConnection] = React.useState<HubConnection |null>(null);
  const [notification, setNotification] = React.useState<Array<Notification>>([]);
  const userObject =JSON.parse( window.localStorage.getItem("refreshToken") || "{}")
  const {id} = userObject
  React.useEffect(()=>{
    const connect = new HubConnectionBuilder()
        .withUrl(getFullUrl(`/notificationHub`), {
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets
          })
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();
    setConnection(connect);
  },[])

  React.useEffect(() => {
    if (connection) {
        connection
            .start()
            .then(() => {
                console.log("SignalR Connected");
            })
            .catch(err => console.log("SignalR Connection Error: ", err));

        connection.on("ReceiveNotification", message => {
          // console.log(message)
            // setNotification(message);
            
        });
    }
    
  }, [connection]);

  React.useEffect(()=>{
    try {
      axios.get(getFullUrl(`/api/Auth/notifications/${id}`)).then((res)=>{
          const n = res.data as Array<Notification>
          setNotification(n)
      })
    } catch (error) {
      console.log(error)
    }
  },[])
    return(

     <Header>
       <Sidebar  visible={showSideBar} onHide={() => setShowSidebar(false)} position="right" style={{width:"25rem"}}>
        <NortificationHeader>Notification</NortificationHeader>
        
        <Divider />
        <NortificationContainer>
              {notification.map((r,i)=> 
                <> <p className={r.status !== 'true' ? "unread" : "read"} key={i}>{r.message}</p>
                <Divider /></>
              )}
        </NortificationContainer>
        
      </Sidebar>
      
        <p className='logo' onClick={()=> navigate('/')}>Akademates</p>
        <div className="innerHeader">
          <p>For Industry</p>
          <p>For Academia</p>
        </div>
        <div className="icons-header">
          { user ? <>
          <UserDetailsContainer>
          <HelpCircleIcon alt="" src="/assets/message.svg" onClick={()=> navigate('/workspace/messages')} />
          <HelpCircleIcon alt="" src="/assets/bell1.svg" onClick={()=> setShowSidebar(true)}/>
         
          <p onClick={()=> navigate('workspace/cockpit')} className='user-name'>{user.firstName + " " + user.lastName}</p>
          </UserDetailsContainer>
          <Burger />
          </>
          :  
            <Login>
              {MobileView && (<p className='logo' onClick={()=> navigate('/')}>Akademates</p>)}
              <NairobiKenya onClick={()=> navigate('/auth')}>Login</NairobiKenya>
            </Login>}
        </div>
     </Header>
    )
}
export const  MapServices : FunctionComponent<MapProps> = ({coordinates}) => {
    
    return (
        <MapContainer style={{width:"100%", height:"40vh"}} center={[coordinates[0].lat,  coordinates[0].lng]} zoom={6} scrollWheelZoom={true} className='maps'>
            <TileLayer 
                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {coordinates && coordinates.map((p)=> 
                 <Marker position={[p.lat	, p.lng]}>
                 <Popup>
 
                 </Popup>
             </Marker>
            )}
           
        </MapContainer>
    )
}

const Home = ()=>{
    const navigate = useNavigate();
    const [totals, setTotals] = React.useState<HomeTotals>();
    const [projectcoords, setprojectcoords] = React.useState<Array<CoordsProps>>()
    
    React.useEffect(() => {
     axios.post(getFullUrl('/api/Auth/totals')).then((res)=>{
      const data =  res.data as HomeTotals
      console.log(data)
      setTotals(data)
     })

     axios.get(getFullUrl('/api/Projects/coordinates')).then((res)=>{
           const d =  res.data
           setprojectcoords(d as Array<CoordsProps>)
     })

    }, []);

  return (
      <>
      <Slide>
        <TitleWrapper>
            <p className='logo'>Akademates</p>
            <TitleWrapperInner>
              <ForgingLinksBetween>
                Forging links between academia and industry
              </ForgingLinksBetween>
            </TitleWrapperInner>
            <CreatingNewConnections>
                Creating new connections, innovations, and opportunities with our
                transformative online hub.
            </CreatingNewConnections>
            <Button>
              <AllCategories onClick={()=> navigate('/register')}>Join Us Now</AllCategories>
           </Button>
          </TitleWrapper>
        <div className='image-background'>
          <img src='/assets/image_tagline.png' alt=''/>
        </div>
      </Slide>
      <CounterComponent total={totals as HomeTotals} />
      {/* <ProjectCategories /> */}
      <Heading8>
        <SmallToMedium>Featured Ventures</SmallToMedium>
        <Subtitle>Find the right opportunity for you</Subtitle>
      </Heading8>
         {projectcoords &&(<MapServices coordinates={projectcoords as CoordsProps[]} />)} 
      <HowItsWorks />
      <Footer />
      </>
  )
}

export default Home;

