import React, { Component, useCallback, useContext, useState } from 'react'
import { Link, Navigate, NavLink, useLocation, useNavigate, useParams} from 'react-router-dom'
import './Navigation.css'
import { Calendar } from 'primereact/calendar';
import ThemeContext, { defaultTheme, Theme } from '../../configs/theme';
import { JsxAttribute } from 'typescript';
import axios from 'axios';
import getFullUrl from '../../configs/axios-custom';
import GrowlContext from '../../configs/growlContext';
import { Badge } from 'primereact/badge';
import profileImage from '../../assets/images/profileImage.jpg'
import { Skeleton } from 'primereact/skeleton';
import { Button } from 'primereact/button';
import { Chat } from '../Nortifcations/Chats';
import { Dialog } from 'primereact/dialog';
import { Editor } from 'primereact/editor';
import { Dropdown } from 'primereact/dropdown';
import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { UserDto } from '../Screens/UserScreen/UserInformation';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import styled from '@emotion/styled';
import { googleLogout } from '@react-oauth/google';
import { PostOptions } from '../../configs/constants';


type NavBarProps = {
  history:any;
  location:any;
}

type PostRecords ={
  id: string,
  userID: string,
  postData:string,
  createdOn: string,
  category:string,
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


type EventsDto = {
  id:string
  title: string
  content: string
  eventDate: string
  rsvp: string
  organization:string
  from: string,
  to: string
}

export interface Message {
    id: string;
    senderId: string;
    senderKnownAs: string;
    senderPhotoUrl: string;
    recipientId: string;
    recipientKnownAs: string;
    recipientPhotoUrl: string;
    content: string;
    isRead: boolean;
    dateRead: Date;
    dateSent: Date;
}
export interface MessageResolver {
  Id:string,
  data : Array<Message>
}
export interface GroupsMessageProps{
  messages : Array<MessageResolver>
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
  const userToken=window.localStorage.getItem("refreshToken")

  const theme = React.useContext(ThemeContext);
   let  navigate = useNavigate() 

  

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


  React.useEffect(()=>{
    //  if not authenticated - redirect login page 
    if(!userToken){
      navigate('/auth')
    }
  },[userToken])

  const signOut = ()=>{
    axios.post(getFullUrl('/api/auth/logout')).then(()=>{
      navigate('/')
      window.localStorage.removeItem("refreshToken"); 
      googleLogout()
    }).catch(()=>{

    })
  }

  return (
  <>
        <div className="main-dashboard">
        <div className='navigation-links '>
          <NavLink to='/dashboard' className={({ isActive }) =>
             (isActive ? "active-links" : "link")}>
              <span>
                <span className='menu-icon'><i className="pi pi-book"></i></span>
                Cockpit
              </span>
              </NavLink>
        </div>
        <div className='navigation-links'>
        <NavLink to='/project' className={({ isActive }) => 
          (isActive ? "active-links" : "link")}>
             <span>
                <span className='menu-icon'><i className="pi pi-folder-open"></i></span>
                Ventures 
              </span>
           </NavLink>
        </div>
        {/* <div>
         <NavLink to='/feeds' className={({ isActive }) =>
           (isActive ? "active-links" : "link")}>Feeds</NavLink>
        </div> */}
        <div className='navigation-links'>
         <NavLink to='/experts' className={({ isActive }) =>
           (isActive ? "active-links" : "link")}>
             <span>
              <span className='menu-icon'><i className="pi pi-users"></i></span>
                Specialists
              </span>
            </NavLink>
        </div>
        <div className='navigation-links'>
          <NavLink to='/settings' className={({ isActive }) => 
          (isActive ? "active-links" : "link")}>
            <span>
                <span className='menu-icon'><i className="pi pi-cog"></i></span>
                Personalized
              </span>
            </NavLink>
        </div>
        <div onClick={signOut} className="button-sign-out">
            <i  className="pi pi-power-off" style={{'fontSize': '1.5em'}}></i>
        </div>
      </div>
  </>
  )
}


const header = (
  <span className="ql-formats">
      <button className="ql-bold" aria-label="Bold"></button>
      <button className="ql-italic" aria-label="Italic"></button>
      <button className="ql-underline" aria-label="Underline"></button>
      <button className="ql-link" aria-label="Link"></button>
      <button className="ql-code-block" aria-label="code-block"></button>
      <button className="ql-color" aria-label="Color"></button>
      <button className="ql-background" aria-label="Background"></button>
      <hr />
  </span>
 
);

type Conversation = {
  id: string;
  messages: Message[];
};
interface MessagePair {
  senderId: string;
  recipientId: string;
  messages: Message[];
}
export function DashboardManagement (){
  const [date, setDate] = React.useState<Date | Date[] | undefined>(undefined);
  const growl = React.useContext(GrowlContext);
  const userToken = window.localStorage.getItem("refreshToken")
  const {id} = JSON.parse(userToken!)
  const [userInfo,setUserInfo] = React.useState<UserDto>();
  const [showDialog,setShowDialog] =  React.useState(false);
  const [showChat,setShowChat] =  React.useState(false);
  const [post, setPost] = React.useState<string>('');
  const [postCategory,setPostCategory] = React.useState();
  const [userPosts,setUserPosts] = React.useState(Array<PostRecords>())
  const [userPostsserverrecord,setPostsserverrecord] = React.useState(Array<PostRecords>())
  const [seleOptions,setSeleOptions] = React.useState();
  const [connection,setConnection] = React.useState<null | HubConnection>(null)
  const [events,setEvents] = React.useState(Array<EventsDto>())
  const dateItem =  new Date();
  const [todaysDate] = React.useState(dateItem.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) )
  const [following,setFollowing] = React.useState(0)
  const [followers,setFollowers] = React.useState(0)
  const [totals,setTotals] = React.useState(0);
  const [allProjects, setAllProjects] = useState(0)

  // messages 

  const [messages,setMessages] = React.useState<Array<MessageResolver>>()

  React.useEffect(()=>{
    const connect = new HubConnectionBuilder()
        .withUrl(getFullUrl(`/Chats`), {
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets
          })
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();
    setConnection(connect);
},[])

const loadUserData =()=>{
  axios.get(getFullUrl(`/api/Auth/user/${id}`)).then((res)=>{
      const a = res.data
      const data = a as UserDto
      setUserInfo(data)
  }).catch(()=>{
      growl.current.show({
          severity:"error",
          summary:"error loading"
      })
  })
}

//  Get messages

React.useEffect(()=>{
  // load profile info
  loadUserData();
  // load messages
  axios.post(getFullUrl("/api/Messages/message"),{
    userId:id,
    messageContainer:"" // default unread
  }).then((r)=>{
    const  x = r.data.data as Array<Message>;
  
    const messagePairs  = x.reduce((acc: { [key: string]: MessagePair }, curr: Message) => {
      const { senderId, recipientId } = curr;
    
      const key = `${senderId}-${recipientId}`;
    
      if (!acc[key]) {
        acc[key] = {
          senderId,
          recipientId,
          messages: []
        };
      }
    
      acc[key].messages.push(curr);
    
      return acc;
    }, {});
    

    console.log(Object.values(messagePairs));
    
    
    const grouped = x.reduce((acc, curr) => {
      (acc[curr.recipientId] = acc[curr.recipientId] || []).push(curr);
      return acc;
    }, {} as { [key: string]: Message[] });

    const result = Object.entries(grouped).map(([key, value]) => ({Id: key, data: value}));
    

    
    setMessages(result)


  }).catch((error)=>{
    console.log(error)
  })
},[])

React.useEffect(()=>{
  if(connection){
      connection.start().then(()=>{
        console.log("connection started !")
          connection.on("RecieveMessage",(msg)=>{
              growl.current.show({
                  severity: 'success',
                  summary: msg,
                  className:''
              })
          })
          
      }).catch((error)=>{
          console.log(error)
      })
  }
},[connection]);


  const  createPost = ()=>{
    axios.post(getFullUrl("/api/auth/post"),{
      userID:id,
      postData:post,
      createdOn:new Date(),
      category: postCategory
    })
    .then(()=>{
      growl.current.show({
        severity:"success",
        summary:"Post created"
      })
      setShowDialog(false);
    }).catch(()=>{
      growl.current.show({
        severity:"error",
        summary:"Error adding post"
      })
    })
  }

  React.useEffect(()=>{
    axios.get(getFullUrl(`/api/auth/postdata/${id}`))
    .then((res)=>{
      const p = res.data as Array<PostRecords>
      setUserPosts(p);
      setPostsserverrecord(p)
    }).catch((msg)=>{
      console.log(msg)
    })

    axios.get(getFullUrl('/api/Events/events')).then((res)=>{
        const data = res.data as Array<EventsDto>
        setEvents(data)
    }).catch((error)=>{
      console.log(error)
    })

    axios.get(getFullUrl(`/api/Auth/following/${id}`)).then((rs)=>{
      setFollowing(rs.data.length)
    }).then(()=>{
      // console.log(error)
    })

    axios.get(getFullUrl(`/api/Auth/followers/${id}`)).then((rs)=>{
      setFollowers(rs.data.length)
    }).then(()=>{
      // console.log(error)
    })

    axios.get(getFullUrl(`/api/Projects/allprojects`)).then((rs)=>{
      setAllProjects(rs.data)
    }).then(()=>{
      // console.log(error)
    })
    
  },[])


  const filterPost = (type:"all"| "grant" | "solicitation" | "projects" | "funding") =>{
    switch (type) {
      case "grant":
        let grants = userPosts.filter((f)=> f.category === "Grant")
        setTotals(grants.length)
        setUserPosts(grants);
        break;
      case "solicitation":
        const solicitation = userPosts.filter((f)=> f.category === "solicitation")
        setTotals(solicitation.length)
        setUserPosts(solicitation);
        break;
      case "projects":
        const projects = userPosts.filter((f)=> f.category === "projects")
        setTotals(projects.length)
        setUserPosts(projects);
        break;
      case "funding":
        const funding = userPosts.filter((f)=> f.category === "Funding")
        setTotals(funding.length)
        setUserPosts(funding);
        break;
      case "all":
        setUserPosts(userPostsserverrecord);
        setTotals(userPostsserverrecord.length)
        break;
      default:
        break;
    }
  }

  //  Events 
  const[event,setEvent] = React.useState<EventsDto>()
  const[showEvent,setShowEvent] = React.useState(false)
  const [view, setview] = React.useState(true)
  const [eventDialogTitle, seteventDialogTitle] = useState("Event Tracker");

  const showMore =(r:EventsDto)=>{
    setEvent(r as EventsDto)
    setShowEvent(true)
    setview(true)
    seteventDialogTitle("Event Listing")
  }

  const toggleEvents = ()=>{
    setview(false)
    setShowEvent(true)
    seteventDialogTitle("New Event")
  }
  return(
    <>
      <div className="grid">
          <Dialog header={eventDialogTitle} visible={showEvent} 
           style={{ width: '50vw' }} onHide={()=>setShowEvent(false)}>
           {
            view ? 
            <>
            {
            event && (
              <div className='event-viewer'>
                <p>Event  title : <strong style={{marginLeft:"10px"}}>{event.title}</strong></p>
                <p>Host: <strong  style={{marginLeft:"10px"}}>{event.organization}</strong></p>
                <p>Date: <strong  style={{marginLeft:"10px"}}>{event.eventDate}</strong></p>
                <p dangerouslySetInnerHTML={{__html:event.content}}></p>
                <p>From: <strong  style={{marginLeft:"10px"}}>{event.from}</strong></p>
                <p>To :<strong  style={{marginLeft:"10px"}}>{event.to}</strong></p>
                <p>Link :<strong  style={{marginLeft:"10px"}}>{event.rsvp}</strong></p>
              </div>
            )
           }
            </> : 
            <>
              <CreateNewEvent setShowEvent = {setShowEvent}/>
            </>
           }

          <div>
            
          </div>  

         </Dialog>
          <Dialog visible={showChat} onHide={() => setShowChat(false)} style={{ width: '68vw' }}>
             {messages && (
                  <Chat currentUserContext={id} messages={messages} />     
             )}   
          </Dialog>
          <Dialog visible={showDialog} onHide={() => setShowDialog(false)} style={{ width: '45vw',padding:"3px" }}>
            <div className="post-options">
              <Dropdown value={postCategory} options={PostOptions} 
              onChange={(e)=> setPostCategory(e.target.value)}  className="p-dropdown"
              optionLabel="name" placeholder="Select post category" />
            </div>
          <Editor headerTemplate={header} 
                  // placeholder="What's on your mind..."
                  style={{ height: '250px' }} value={post}
                  onTextChange={(e) => setPost(e.htmlValue as string)} />
              <div className='post-button'>
                    <Button onClick={createPost} className='button-inline'>Post</Button>
              </div>       
          </Dialog>
          
        <div className="top-bar-container">
                <div onClick={()=> setShowChat(true)} className="nortifications">
                    <i className="pi pi-comments mr-2 p-text-secondary p-overlay-badge" 
                        style={{ fontSize: '1.7rem' }}><Badge  severity="info" className="mr-2" value={messages?.length} >
                      </Badge></i>
                </div>

                <div className="nortifications">
                    <i className="pi pi-bell mr-2 p-text-secondary p-overlay-badge" 
                        style={{ fontSize: '1.5rem' }}><Badge  className="mr-2" value="2" >
                      </Badge></i>
                </div>
                <div className="user-profile-container ">
                   
                    <div className="profile">
                      <strong>{userInfo?.firstName}{" "} {userInfo?.lastName}</strong>
                      <p>View profile</p>
                    </div>
                    <img className='img-centered-clipped' src={profileImage} alt=''/>
                </div>
        </div>
      </div>
      <div className="grid">
        <div className="stats-summary-group">
        <div>
          <div className="stats-container">
            <div className='left-icon-container '>
               <i className="pi pi-shield" style={{fontSize:"1rem", color:"orange",margin:"auto"}} />
            </div>
            <div className="div2">
                <p className='stats-title'>{following}</p>
                <p className='stats-value'>Audience</p>
            </div>
          </div>
        </div>
        <div>
          <div className="stats-container">
            <div className='left-icon-container '>
               <i className="pi pi-folder-open" style={{fontSize:"1rem", color:"orange",margin:"auto"}} />
            </div>
            <div className="div2">
                <p className='stats-title'>{followers}</p>
                <p className='stats-value'>Tracking</p>
            </div>
          </div>
        </div>
        <div>
          <div className="stats-container">
            <div className='left-icon-container '>
               <i className="pi pi-thumbs-up" style={{fontSize:"1rem", color:"orange",margin:"auto"}} />
            </div>
            <div className="div2">
                <p className='stats-title'>{allProjects}</p>
                <p className='stats-value'>Projects</p>
            </div>
          </div>
        </div>
        <div>
          <div className="stats-container">
            <div className='left-icon-container '>
               <i className="pi pi-calendar-times" style={{fontSize:"1rem", color:"orange",margin:"auto"}} />
            </div>  
            <div className="div2">
                <p className='stats-title'>{events.length}</p>
                <p className='stats-value'>Scheduled events</p>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div className="grid">
        <div className="col-12">
          <div className="posts">
            <div className="post-header-group">
              <div className="post-filter-buttons-container">
                <Button onClick={()=>filterPost("all")} label={'All'} className='post-filter-buttons-all'/>
                <Button onClick={()=>filterPost("grant")}  label={'Grants'} className='post-filter-buttons-Grants'/>
                <Button onClick={()=>filterPost("solicitation")} label='Solistation' className='post-filter-buttons-Solistation'/>
                <Button onClick={()=>filterPost("projects")} label='Projects'  className='post-filter-buttons-Projects'/>
                <Button onClick={()=>filterPost("funding")} label= {'Funding'}  className='post-filter-buttons-Projects'/>
              </div>
              <span>
                Posts <i onClick={()=>setShowDialog(true)} className="pi pi-plus-circle"></i>
              </span>
            </div>
            <hr />
            <div className="content">
              {
                userPosts.map((r,i)=>
                  <>
                  <div key={i} className="sub-content-group">
                    {/* <Skeleton shape="circle" width='3rem' height='3rem' className="mr-2" style={{display:"flex"}}>
                      <i className="pi pi-user" style={{'fontSize': '2em',margin:"auto"}}></i>
                    </Skeleton> */}
                    <div className='post-items' dangerouslySetInnerHTML={{__html:r.postData}}></div>
                    
                    <p className='post-items'>
                      <a href=''><i className="pi pi-user" style={{'fontSize': '1em',margin:"5px"}}></i>Un Follow</a> {" "}
                        <a href=''><i className="pi pi-envelope" style={{'fontSize': '1em',margin:"5px"}}></i>Message</a>
                      </p>
              </div>
              <hr />
                  </>
              )
              }
            </div>
          </div>
        </div>
        
        {/* <div className="col-4">
          <Chats Id={id} sendMsg={sendMessage} /> 
        </div> */}
      </div>
      <div className="grid">
        <div className="events">
            <div className="post-header-group">
              <span>
                Events <i className="pi pi-calendar-plus" onClick={toggleEvents}></i>
              </span>
            </div>
            <hr />
            <div className="">
              
              <div className="events-container">
                <div className="calender-container">
                   <Calendar className='calender' inline value={date} onChange={(e) => setDate(e.value)}></Calendar>
                </div>
                <div className="events-contents">
                  <p className='events-title'>{ events.length + " Events available on " + todaysDate}</p>
                 {
                  events.map((x,i)=>
                  <div key={i}>
                     <p  className='event-name'>{x.title}</p>
                      <div className='events-footer'>
                        <p className='event-org'>{x.organization}</p>
                        <span className='rcvp-inline'>
                          <i onClick={()=> showMore(x)} className='pi pi-external-link' style={{fontSize:"0.7rem"}}><strong style={{marginLeft:"5px"}}>Read More</strong></i>
                          </span>
                      </div>
                  	<hr />
                  </div>)
                 }
                </div>
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
          <Link className='nav-links' to="/"><strong>Akademates</strong> </Link>
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




const EventContainer = styled.div`
	padding:15px;
  .p-inputgroup{
    display:flex;
    justify-content:space-between;
    margin:2px;
    margin-bottom:20px;
    .titles{
      margin-left:15px;
    }
  }
  .content{
    width:100%;
  }

  .inputs{
    border-radius:20px;
    height:2rem !important;
    margin-left:5px;
    .p-inputtext{
      border-radius:20px;
      height:2rem !important;
    }
  }

  .button{
    display:flex;
    justify-content:center;
    
    button{
      border-radius:24px;
      background-color:#227699;
    }
  }

`
export const CreateNewEvent = (props:any) => {
  const [eventDate, seteventDate] = React.useState<Date | Date[] | undefined>();
  const [From, setFrom] = React.useState<Date | Date[] | undefined>();
  const [to, setto] = React.useState<Date | Date[] | undefined>();
  const [content, setContent] = React.useState<string>('');
  const [title, settitle] = useState("");
  const [RSVP, setRSVP] = useState("")
  const [organization, setorganization] = useState("")
  const growl = React.useContext(GrowlContext)
  const createEVent = ()=>{
    axios.post(getFullUrl('/api/Events/event'),{
      title: title,
      content:content,
      eventDate: eventDate,
      rsvp: RSVP,
      organization: organization,
      from: From,
      to: to

    }).then(()=>{
      growl.current.show({
        summary:"Event created successfully",
        severity:"success"
      })
      props.setShowEvent(false)
    }).catch(()=>{
      growl.current.show({
        summary:"Event could not be created",
        severity:"error"
      })
    })
  }

  return (
    <EventContainer>
      <div className="p-inputgroup">
        <label>Title</label>
       <InputText placeholder="Title"  className='inputs' onChange={(e)=>settitle(e.target.value)} />

       <label className='titles'>Date</label>
        <Calendar value={eventDate} onChange={(e) => seteventDate(e.value)} className='inputs'/>
      </div>

      <div className="p-inputgroup">
        <label>RSVP</label>
       <InputText placeholder="RSVP" className='inputs' onChange={(e)=>setRSVP(e.target.value)} />
       <label className='titles'>Who/Where</label>
       <InputText placeholder="Organization" className='inputs' onChange={(e)=>setorganization(e.target.value)} />
      </div>
      <div className="p-inputgroup">
        <label>From</label>
        <Calendar value={From} onChange={(e) => setFrom(e.value)} className='inputs'/>
        <label className='titles'>To</label>
        <Calendar value={to} onChange={(e) => setto(e.value)} className='inputs'/>
      </div>
      <div className="content">
        <label>Description</label>
        <Editor headerTemplate={header} 
                  placeholder="Event  details"
                  style={{ height: '250px' }} value={content}
                  onTextChange={(e) => setContent(e.htmlValue as string)} />
      </div>
      <div className='button'>
        <Button label='Create event' onClick={createEVent} />
      </div>
    </EventContainer>
  )
}



