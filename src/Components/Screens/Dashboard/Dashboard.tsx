import React, { useCallback, useState } from 'react'
// import Header, { NavHeader } from '../../Navigation/Header'
import { FunctionComponent } from "react";
import styled from "styled-components";
import Posts from './Posts';
import Events from './Events';
import axios from 'axios';
import getFullUrl from '../../../configs/axios-custom';
import { EventsDto, Message, MessagePair, MessageResolver, PostRecords } from '../../../types';
import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const Iconrate = styled.img`
  position: relative;
  width: 50px;
  height: 50px;;
  overflow: hidden;
  flex-shrink: 0;
  padding:5px;
`;
const Heading = styled.div`
  border-radius: var(--br-5xs);
  background-color: var(--color-steelblue);
  width: 70px;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
      display:none;
  }
`;
const Div1 = styled.div`
  position: relative;
  line-height: 42px;
  text-transform: capitalize;
  font-weight: 600;
`;
const Audience = styled.div`
  position: relative;
  font-size: 13px;
  line-height: 28px;
  text-transform: capitalize;
  font-weight: 500;
`;
const Heading1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  @media (max-width: 768px) {
    align-items:center;
    text-align:center;
  }
`;
const Div = styled.div`
  flex: 1;
  border-radius: var(--br-5xs);
  background-color: var(--default-white);
  display: flex;
  flex-direction: row;
  padding: var(--padding-xl);
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-xl);
`;
const List = styled.div`
  width:100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 55px;
  font-size: var(--font-size-11xl);

  @media (max-width: 768px) {
      flex-wrap:wrap;
      justify-content:center;
      padding:0 2rem 0 0;
      /* align-items:center */
  }
  /* margin-left:12px; */
`;

const DashboardCockpitRoot = styled.div`
  position: relative;
  background-color: var(--surface);
  width: 100%;
  height: 90vh;
  overflow: hidden;
  text-align: left;
  font-size: var(--body-03-default-size);
  color: var(--on-surface);
  font-family: var(--font-poppins);
  display:flex;
  flex-direction:row;
  .side-panel{
    padding : 1rem;
    width:91vw;
  }
  .inner-panel-wrapper{
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    gap:25px;
    width:91vw;
  }
    @media (max-width: 768px) {
   
      .inner-panel-wrapper{
        /* flex-direction:column; */
        width:82vw;
      }
  }
`;
const TagsWrapper = styled.div`
    width: 91vw;
    margin-top: 3rem;
    height: 70vh;
    overflow-y: auto;
`
const DashboardComponent: FunctionComponent = () => {
  const userToken = window.localStorage.getItem("refreshToken" || "{}")
  const {id} = JSON.parse(userToken!)
  const [allProjects, setAllProjects] = useState(0);
  const [following,setFollowing] = React.useState(0)
  const [followers,setFollowers] = React.useState(0)
  const [events,setEvents] = React.useState(Array<EventsDto>())
  const [userPosts,setUserPosts] = React.useState(Array<PostRecords>())
  const [messages,setMessages] = React.useState<Array<MessageResolver>>()
  const [currentFilter, setcurrentFilter] = useState(1);
  const [userPostsserverrecord,setPostsServerrecord] = React.useState(Array<PostRecords>())
  const [connection,setConnection] = React.useState<null | HubConnection>(null)

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

  React.useEffect(()=>{
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

  React.useEffect(()=>{
  
    axios.post(getFullUrl("/api/Messages/message"),{
      userId:id,
      messageContainer:"" // default unread
    }).then((r)=>{
      const  x = r.data.data as Array<Message>;
    
      
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
  
  return (
    <DashboardCockpitRoot>

      <div className='side-panel'>
      <List>
        <Div>
          <Heading>
            <Iconrate alt="" src="/assets/icon3.svg" />
          </Heading>
          <Heading1>
            <Div1>{followers}</Div1>
            <Audience>Audience</Audience>
          </Heading1>
        </Div>
        <Div>
          <Heading>
            <Iconrate alt="" src="/assets/icon4.svg" />
          </Heading>
          <Heading1>
            <Div1>{following}</Div1>
            <Audience>Tracking</Audience>
          </Heading1>
        </Div>
        <Div>
          <Heading>
            <Iconrate alt="" src="/assets/iconrate.svg" />
          </Heading>
          <Heading1>
            <Div1>{allProjects}</Div1>
            <Audience>Ventures</Audience>
          </Heading1>
        </Div>
        <Div>
          <Heading>
            <Iconrate alt="" src="/assets/icon5.svg" />
          </Heading>
          <Heading1>
            <Div1>{events.length}</Div1>
            <Audience>Events</Audience>
          </Heading1>
        </Div>
      </List>
      <div className="inner-panel-wrapper">
          <TagsWrapper className='post-wrapper'>
              <Posts  post={userPosts} id={id} />
          </TagsWrapper>
      </div>
      </div>
      
    </DashboardCockpitRoot>
  );
};

export default DashboardComponent;