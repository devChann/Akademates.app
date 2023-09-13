import React from 'react'
import { Message, MessagePair, MessageResolver } from '../../../types'
import axios from 'axios';
import getFullUrl from '../../../configs/axios-custom';
import { Chat } from '../../Nortifcations/Chats';
import { useLocation } from 'react-router-dom';

const MessageComponent = () => {
    const [messages,setMessages] = React.useState<Array<MessageResolver>>()
    const location = useLocation()
    const userObject =JSON.parse( window.localStorage.getItem("refreshToken") || "{}")
    const {id} = userObject
    
    React.useEffect(()=>{
        if (!id) {
            return
        }
        axios.post(getFullUrl("/api/Messages/message"),{
          userId:id,
          messageContainer:"" // default unread
        }).then((r)=>{
          const  x = r.data.data as Array<Message>;
          console.log(x)
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
          
          const grouped = x.reduce((acc, curr) => {
            (acc[curr.recipientId] = acc[curr.recipientId] || []).push(curr);
            return acc;
          }, {} as { [key: string]: Message[] });
      
          const result = Object.entries(grouped).map(([key, value]) => ({Id: key, data: value}));
          setMessages(result)
      
      
        }).catch((error)=>{
          console.log(error)
        })
      },[id])
  return (
    <React.Fragment>
      {
        messages && (<Chat newUserMessage={location.state} currentUserContext={id} messages={messages as Array<MessageResolver>} />)
      }
    </React.Fragment>
  )
}

export default MessageComponent