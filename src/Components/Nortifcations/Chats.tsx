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

interface ChatProps {
    messages : Array<MessageResolver> | []
    currentUserContext: string
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
export const Chat:FC<ChatProps> = ({messages,currentUserContext})=>{
    const growl = React.useContext(GrowlContext);
    const [messageText, setmessageText] =  React.useState("");
    const [keyword, setKeyword] =  React.useState<string>();
    const [searchText, setsearchText] =  React.useState<string>("");
    const [conversations,setconversations] = React.useState(Array<Message>());
    const [contacts,setContacts] = React.useState<ContactsProps>();
    const [rowsPerPage,setRowsPerPage] = React.useState(20) ;
    const [isLoading, setIsLoading] = React.useState(false);
    const [sortBy,setSortBy] = React.useState('firstName');
    const[data,setData] = React.useState(Array<UserProfile>());
    const [sortOrder,setSortOrder] = React.useState(-1);
    const [newMessage, setnewMessage] = React.useState(false);
    const [first, setFirst] = React.useState(0);
    const[rows,setRows]= React.useState(20);
    const [profileChips,setProfileChips] =  React.useState<string>()
    const [showMsgBox, setshowMsgBox] = React.useState(false);
    const [replay, setreplay] = React.useState(true)
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
           setconversations(data)   
        }).catch((error)=>{
            console.log(error)
        })
    }

    React.useEffect(()=>{
        console.log(messages)
        if (messages.length > 0) {
            setContacts({
                senderId:messages[0].data[0].senderId, recipientId: messages[0].data[0].recipientId
            })
            messenger(messages[0].data[0].senderId, messages[0].data[0].recipientId)
        }
    },[]);

    const send = ()=>{
        // console.log(contacts)
     
        var sender = replay ? contacts?.recipientId : currentUserContext
        var recipient = replay ? contacts?.senderId : contacts?.recipientId

        axios.post(getFullUrl(`/api/messages/create`),{
            senderId: sender,
            recipientId: recipient,
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
        setconversations([])
        setshowMsgBox(false)
        setProfileChips("");
        setreplay(false)
    }

    const debouncedSearchText = useDebounced(searchText as string, 500)

    React.useEffect(()=>{
        queryData({rows,first,sortBy,sortOrder})
    },[searchText])

    const onUserClick = (user:UserProfile)=>{
        setProfileChips(user.firstName + " " + user.lastName) 
        setData([])
        setshowMsgBox(true)
       
        setContacts({
            senderId:currentUserContext, recipientId:user.id
        })
    }

   
    return(
        <>
        <div className="grid">
            <div className="col-4 chat-list">
                <div style={{display:"flex", textAlign:"center",justifyContent:"center", alignItems:"baseline"}}>
                    <span className="p-input-icon-left">
                        <InputText className='f-users' value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="filter users" />
                    </span>
                    <i onClick={startConversation} className="pi pi-pencil new-chat-icon" style={{ color: 'slateblue' }}></i>
                </div>
                {
                messages?.map((r:MessageResolver,i)=>
               <>
                <div className="m-list">
                    <div className="user-profile-message">
                    </div>
                    {
                       <p onClick={()=> messenger(r.data[0].senderId,r.data[0].recipientId)} key={i} className='message-grp'><strong>{r.Id === currentUserContext ? r.data[0].senderKnownAs : r.data[0].recipientKnownAs}</strong><br />{r.data[0].content}
                       </p>  
                    }
                   
                </div>
                <hr className='f-divder'/>    
               </>)}
            </div>
            <div className="col chat-panel">
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
                <div className="m-input-box">
                     <span className="p-input-icon-right">
                         <i onClick={send} className="pi pi-send" style={{cursor:"pointer"}} />
                         <InputTextarea value={messageText}  style={{borderRadius:"10px"}}
                         onChange={(e) => setmessageText(e.target.value)} rows={2} cols={60} autoResize />
                     </span>
                </div>
                )}
                
            </div>
        </div>
        </>
    )
}

interface ConversationProps {
    conversations: Array<Message>
    currentUserContext : string;
    send: ()=> void 
}

const ConversationWindow :FC<ConversationProps>= ({conversations,currentUserContext,send})=>{
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
                  <Skeleton style={{marginLeft:"-33px"}} shape="circle" size="2.5rem" className="mr-2 title-image">
                    <p style={{textAlign:"center"}}>{getInitials(x.senderKnownAs)}</p>
                  </Skeleton>
                </div>
                   
                 : 
                 <div className="sender">
                   <Skeleton shape="circle" size="2.5rem" className="mr-2">
                    <p style={{textAlign:"center"}}>{getInitials(x.senderKnownAs)}</p>
                   </Skeleton>
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