import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Skeleton } from 'primereact/skeleton';
import React, { FC } from 'react'
import getFullUrl from '../../configs/axios-custom';
import GrowlContext from '../../configs/growlContext';
import { Message, MessageResolver } from '../Navigation/Header';
import { UserProfile } from '../Screens/Experts/ExpertsScreen';
import useDebounced from '../../Hooks/useDebounced';
import ProfileIcon from '../../assets/images/Profile.svg'
import  Follow from '../../assets/images/Follow.svg'
import { Chip } from 'primereact/chip';
import '../Navigation/Navigation.css';
import styled from 'styled-components';
import { Divider } from 'primereact/divider';
import { UserDto } from '../../types';
import { Dialog } from 'primereact/dialog';
interface ChatProps {
    messages : Array<MessageResolver> | []
    currentUserContext: string;
    newUserMessage : UserDto;
}
type ContactsProps = {
    senderId:string,
    recipientId:string
}
interface MessagePair {
    senderId: string;
    recipientId: string;
    messages: Message[];
}
const MessageGroup = styled.div`
    display: flex;
    justify-content: center;
    @media (max-width: 768px) {
        textarea{
        width:20rem;
    } 
    }
    
`
const  ChatContainer = styled.div`
    display:flex;
    flex-direction:row;
    gap:5px;
    font-family:var(--title);
    background:white;
    margin:1rem;
    padding:5px;
    border-radius:10px;
    width:100%;
    @media (max-width: 768px) {
        margin-left:2rem;
        flex-direction:column;
    }

`
export const Chat:FC<ChatProps> = ({messages,currentUserContext,newUserMessage})=>{
    const growl = React.useContext(GrowlContext);
    const [messageText, setmessageText] =  React.useState("");
    const [keyword, setKeyword] =  React.useState<string>();
    const [searchText, setsearchText] =  React.useState<string>("");
    const [conversations,setconversations] = React.useState(Array<Message>());
    const [contacts,setContacts] = React.useState<ContactsProps>();
    const [rowsPerPage,setRowsPerPage] = React.useState(20) ;
    const [isLoading, setIsLoading] = React.useState(false);
    const [sortBy,setSortBy] = React.useState('firstName');
    const [data,setData] = React.useState(Array<UserProfile>());
    const [sortOrder,setSortOrder] = React.useState(-1);
    const [newMessage, setnewMessage] = React.useState(false);
    const [first, setFirst] = React.useState(0);
    const [rows,setRows]= React.useState(20);
    const [profileChips,setProfileChips] =  React.useState<string>()
    const [showMsgBox, setshowMsgBox] = React.useState(false);
    const [replay, setreplay] = React.useState(true)
    const [Filteredmessages,setFilteredMessages] = React.useState<Array<MessageResolver>>()
    const [recipient,setRecipient] =  React.useState<string | undefined>()
    const [messageDialogTitle,setmessageDialogTitle] =  React.useState("Start a new conversation")


    const messenger = (userId:string, recipientId:string)=>{
        setnewMessage(false)
        setData([])
        setsearchText("")
        setProfileChips("");
        setshowMsgBox(true)

        setContacts({
            senderId:userId, recipientId:recipientId
        })
        axios.get(getFullUrl(`/api/Messages/${userId}/conversation/${recipientId}`))
        .then((r)=>{
           const data =  r.data as Array<Message> 
           const x =  data.filter((d)=> d.senderId !== currentUserContext)
           if(x.length > 0){
                console.log(x[0].senderId)
                setRecipient(x[0].senderId)
           }
           setconversations(data)   
        }).catch((error)=>{
            console.log(error)
        })
    }



    React.useEffect(()=>{

        if (messages.length > 0) {
            setContacts({
                senderId:messages[0].data[0].senderId, recipientId: messages[0].data[0].recipientId
            })
            messenger(messages[0].data[0].senderId, messages[0].data[0].recipientId)
        }
    },[]);

    const send = ()=>{
        console.log(recipient)
        var sender = replay ? contacts?.recipientId : currentUserContext
        var recipient_user = recipient ? recipient   : newUserMessage.id
        console.log(recipient_user)
        if(!recipient_user){
            return
           }
        axios.post(getFullUrl(`/api/messages/create`),{
            senderId: currentUserContext,
            recipientId: recipient_user,
            content: messageText
        }).then((res)=>{
            setconversations([...conversations, res.data])
            growl.current.show({
                severity:"success",
                summary:"Message sent"
            })
            setmessageText("")
        }).catch((error)=>{
            
        })
    }
 

    function queryData(event:{
        rows:number,
        first:number,
        sortBy:string,
        sortOrder:number,
    }){
        if (!searchText) {
            return
        }
        
        setIsLoading(true);
        
        const queryParams = new URLSearchParams()
     

        if (searchText) {
            queryParams.set("firstname", searchText.toString());
        }

        const pageIndex = event.first / rowsPerPage;
        queryParams.set("pageIndex", pageIndex.toString());
        queryParams.set("pageSize",event.rows.toString());
        queryParams.set("sortBy",event.sortBy.toString() || sortBy);
        queryParams.set("sortOrder",event.sortOrder.toString() || sortOrder.toString());

        axios.get(getFullUrl(`/api/base/users/?${queryParams.toString()}`))
        .then((res)=>{
            const {data} = res.data
            const d = data as Array<UserProfile> 
            const filtered = d.filter((u)=> u.id !== currentUserContext)      
            setData(filtered)
        }).catch((error)=>{
            growl.current.show({
                severity:"error",
                summary:"error loading data"
            })
        })
    }

    const startConversation = ()=>{
        setnewMessage(true)
        setconversations([])  //  check there's an existing conversation 
        setshowMsgBox(false)
        setProfileChips("");
        setreplay(false)
        setOpen(true)
        setmessageDialogTitle("Start a new conversation")
        
    }

    React.useEffect(()=>{
        queryData({rows,first,sortBy,sortOrder})
    },[searchText])

    const onUserClick = (user:UserProfile)=>{
        console.log(user)
        setRecipient(user.id)
        setProfileChips(user.firstName + " " + user.lastName) 
        setData([])
        setshowMsgBox(true)
       
        setContacts({
            senderId:currentUserContext, recipientId:user.id
        })
    }

   React.useEffect(()=>{
        if(keyword){
            let  messages_data = messages.map((x)=> {
                return x.data.filter((f)=> f.senderKnownAs.includes(keyword) || f.recipientKnownAs.includes(keyword))
            })
            /* setFilteredMessages(messages_data as MessageResolver) */
            /* console.log(messages_data) */
        }
   },[keyword])
   
    const [openMsg,setOpen] = React.useState(false);

    const showConversation = (r:MessageResolver)=>{
        messenger(r.data[0].senderId,r.data[0].recipientId)
        setmessageDialogTitle(r.data[0].recipientKnownAs)
        setOpen(true)
    }

    return(
        <>
        <Dialog visible={openMsg} onHide={()=>setOpen(false)} header={messageDialogTitle}>
            {/* <hr />   */}
            <div className="chat-panel">
                {newMessage && (
                <>
                <div style={{display:"flex", textAlign:"center",justifyContent:"center", alignItems:"baseline"}}>
                    <span className='chat-panel-span'>
                        <InputText className='f-get-users' value={searchText} onChange={(e) => setsearchText(e.target.value)} placeholder="type first name or last name" />
                    </span>
                </div>
                {profileChips && (<Chip label={profileChips}  className='selected-user-chip' />)}
                </>
                )}
                <div>
                    { newMessage && data.length > 0 &&(
                        <>
                            {data.map((d:UserProfile)=> 
                                <div className="receiver">
                                    <Skeleton style={{marginLeft:"-33px", borderRadius:"50%"}} shape="circle" size="4.5rem" className="mr-2 user-profile-search">
                                        {/* <p style={{textAlign:"center"}}>Image</p> */}
                                        <img src={ProfileIcon} style={{width:"72px"}} alt='' />
                                    </Skeleton>
                                    <div style={{ flex: '1',margin:"auto"}} className = "r-message">
                                        <Skeleton height='70px' width="100%" className="mb-2 r-userprofile-skeleton" style={{background:"#8dcdff"}}>
                                            <div className='r-skeleton-container'>
                                            <div>
                                                <p><strong>{d.firstName + d.lastName}</strong></p>
                                                <p> {d.discipline}</p>
                                            </div>
                                            <div>
                                                <img  className='r-skeleton-container-inline-img' src={Follow} alt='' />
                                                <i onClick={()=> onUserClick(d)} className="pi pi-send r-skeleton-container-inline-i" style={{ fontSize: '1rem' }}></i>
                                            </div>
                                            </div>
                                        </Skeleton>
                                    </div> 
                                </div>)
                            }
                        </> 
                        
                    )}
                </div>
                <ConversationWindow 
                    conversations={conversations} 
                            send={send} currentUserContext={currentUserContext} />
                
                {showMsgBox && (
                <MessageGroup>
                        <span className="p-input-icon-right">
                            <i onClick={send} className="pi pi-send" style={{cursor:"pointer"}} />
                            <InputTextarea value={messageText}  style={{borderRadius:"10px", fontFamily:"Plus Jakarta Sans"}}
                            onChange={(e) => setmessageText(e.target.value)} rows={2} cols={60} autoResize />
                        </span>
                </MessageGroup>
                )}
                
            </div>

        </Dialog>
        <ChatContainer>
            <div className="chat-list">
                <div style={{display:"flex", textAlign:"center",justifyContent:"right", alignItems:"baseline"}}>
                    <InputText className='f-users' value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="filter users" />
                    <i onClick={startConversation} className="pi pi-pencil new-chat-icon" style={{ color: 'slateblue' }}></i>
                </div>
                {
                messages?.map((r:MessageResolver,i)=>
               <>
                <div className="m-list">
                    <div className="user-profile-message">
                    </div>
                    {
                       <p onClick={()=> showConversation(r)} key={i} className='message-grp'><strong>{r.Id === currentUserContext ? r.data[0].senderKnownAs : r.data[0].recipientKnownAs}</strong><br />{r.data[0].content}
                       </p>  
                    }
                   
                </div>
                <Divider />   
               </>)}
            </div>
            
        </ChatContainer>
        </>
    )
}

interface ConversationProps {
    conversations: Array<Message>
    currentUserContext : string;
    send: ()=> void 
}

const ConversationWindow :FC<ConversationProps>= ({conversations,currentUserContext,send})=>{
     /* console.log(conversations) */
    return (
        <div className="div">
        {
            conversations ? 
            <>

            {
                conversations.map((x,i)=>
                <>
                {currentUserContext !== x.senderId ?
                <div className="receiver">
                    <div style={{ flex: '1',margin:"auto"}} className = "r-message">
                        <Skeleton height='auto' width="80%" className="mb-2 r-message-input" style={{background:"#8dcdff"}}>
                            {x.content}
                        </Skeleton>
                    </div>
                </div>
                 : 
                 <div className="sender">
                  
                   <div style={{ flex: '1', margin:"auto" }}>
                       <Skeleton height='auto' width="75%" className="mb-2 message-input" style={{padding:"20px"}}>
                          {x.content}
                       </Skeleton>
                   </div>
                 </div>
                }
                
                </>)
            }
         
        </> : null
        }
    </div>
    )
}

export const getInitials = (name:string): string =>{
    let fname = name.split(" ")[0]
    let lname = name.split(" ")[2]
    return fname.charAt(0).toUpperCase() + lname.charAt(0).toUpperCase()
}
