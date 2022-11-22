import React, { useCallback } from 'react'
import SectionHeader from '../Fragments/SectionHeaders'
import { Badge } from 'primereact/badge';
import './feeds.css'
import { Dialog } from 'primereact/dialog';
import { Editor } from 'primereact/editor';
import profileImage from '../../../assets/images/profileImage.jpg'
import backgroundImage from '../../../assets/images/backgroundImage.jpg'
import { Image } from 'primereact/image';
import { Skeleton } from 'primereact/skeleton';
import { json, text } from 'stream/consumers';
import axios from 'axios';
import getFullUrl from '../../../configs/axios-custom';
import reactSelect from 'react-select';
import GrowlContext from '../../../configs/growlContext';
import { Tooltip } from 'primereact/tooltip';
import { Toast } from 'primereact/toast';
import { SpeedDial } from 'primereact/speeddial';
type PostRecords ={
  id: string,
  ownerID: string,
  postData:string
}
type User={
  id:string,
  token:string
}
export default function FeedsScreen() {
  const [showDialog,setShowDialog] = React.useState(false)
  const [post, setPost] = React.useState<string>('');
  const [authorID,setAuthorID] = React.useState("");
  const growl = React.useContext(GrowlContext)
  const [userPosts,setUserPosts] = React.useState(Array<PostRecords>())

  React.useEffect(()=>{
   
    
  },[])

  const showDialogBox = ()=>{
      setShowDialog(true)
  }
  const hideDialogBox =()=>{
      setShowDialog(false)
  }
  const loadData = useCallback(() => {
    axios.get(getFullUrl("/api/Auth/postdata"))
    .then((res)=>{
      const p = res.data as Array<PostRecords>
      setUserPosts(p);
    }).catch((msg)=>{

    })
  }, []);

  React.useEffect(()=>{
    loadData();
  },[])
  const  createPost = ()=>{
    const a = window.localStorage.getItem("refreshToken");
   
    if(a){
      const author : User = JSON.parse(a);
      setAuthorID(author.id)
    }
    axios.post(getFullUrl("/api/auth/post"),{
      ownerID:authorID,
      postData:post,
      createdOn:new Date()
    })
    .then((res)=>{
      growl.current.show({
        severity:"success",
        summary:"Post created"
      })
      setShowDialog(false);
    }).catch((msg)=>{
      growl.current.show({
        severity:"error",
        summary:"Error adding post"
      })
    })
  }
  const header = (
    <span className="ql-formats">
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
    </span>
  );
   
  return (
    <div className='container'>
      {/* <div className="grid">
        <div className="col">
          <div className="user-feeds-header">
              <i className="pi pi-bell mr-4 p-text-secondary p-overlay-badge" style={{ fontSize: '1rem' }}><Badge value="2" ></Badge></i>
              <i className="pi pi-calendar mr-4 p-text-secondary p-overlay-badge" style={{ fontSize: '1rem' }}><Badge value="10+" severity="danger" ></Badge></i>
              <i className="pi pi-envelope p-text-secondary p-overlay-badge" style={{ fontSize: '1rem' }}><Badge severity="danger"></Badge></i>
          </div>
        </div>
      </div> */}
      <div className="grid">
        <div className="col-8 feeds-container">
           <div className="item-group">
               <Dialog className='dialog-box' header="Write a new post"  visible={showDialog}  modal style={{ width: '45vw',padding:"3px" }}  onHide={hideDialogBox}>
               <Editor headerTemplate={header} 
                  placeholder="What's on your mind..."
                  style={{ height: '250px' }} value={post}
                  onTextChange={(e) => setPost(e.htmlValue as string)} />
                  <div className='post-button'>
                    <button onClick={createPost} className='button-inline'>Post</button>
                  </div>
               </Dialog>
              <div className="post-input" onClick={showDialogBox}>
                What's on your mind...
              </div>
           </div>
          
              {userPosts.map((sa)=>(
              <div key={sa.id} className="item-group"> 
                 <div  className="card">
                    <div className="grid formgrid">
                        <div className="field col-12 md:col-12">
                            <div dangerouslySetInnerHTML={{__html:sa.postData}}></div>
                        </div>
                    </div>
                    <hr />
                    <div className="post-actions">
                      <div className="speeddial-delay-demo" style={{height:"2rem"}}>
                        <SpeedDial model={Items} direction="left" transitionDelay={80} showIcon="pi pi-bars" hideIcon="pi pi-times" buttonClassName="p-button-outlined" />
                      </div>
                    </div>
               </div>
               
               </div>
              ))}
          
           <div className="item-group">.....</div>
        </div>
        <div className="col-3 banners">
           <div className="custom-skeleton p-2">
            <ul className="m-0 p-0">
            <li className="mb-3">
                <div className="flex">
                    <Skeleton shape="circle" size="2rem" className="mr-2"></Skeleton>
                    <div style={{ flex: '1' }}>
                        <Skeleton width="100%" className="mb-2"></Skeleton>
                        <Skeleton width="75%"></Skeleton>
                    </div>
                </div>
            </li>
            <li className="mb-3">
                <div className="flex">
                    <Skeleton shape="circle" size="2rem" className="mr-2"></Skeleton>
                    <div style={{ flex: '1' }}>
                        <Skeleton width="100%" className="mb-2"></Skeleton>
                        <Skeleton width="75%"></Skeleton>
                    </div>
                </div>
            </li>
            <li className="mb-3">
                <div className="flex">
                    <Skeleton shape="circle" size="2rem" className="mr-2"></Skeleton>
                    <div style={{ flex: '1' }}>
                        <Skeleton width="100%" className="mb-2"></Skeleton>
                        <Skeleton width="75%"></Skeleton>
                    </div>
                </div>
            </li>
            <li className="mb-3">
                <div className="flex">
                    <Skeleton shape="circle" size="2rem" className="mr-2"></Skeleton>
                    <div style={{ flex: '1' }}>
                        <Skeleton width="100%" className="mb-2"></Skeleton>
                        <Skeleton width="75%"></Skeleton>
                    </div>
                </div>
            </li>
            </ul>
           </div>
        </div>
      </div>
    </div>
  )
}

export const  Items = [
  {
      label: 'Add',
      icon: 'pi pi-pencil',
      // command: () => {
      //     toast.current.show({ severity: 'info', summary: 'Add', detail: 'Data Added' });
      // }
  },
  {
      label: 'Update',
      icon: 'pi pi-refresh',
      // command: () => {
      //     toast.current.show({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
      // }
  },
  {
      label: 'Delete',
      icon: 'pi pi-trash',
      // command: () => {
      //     toast.current.show({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
      // }
  },
  {
    label:"like",
    icon:"pi pi-thumbs-up"
  },
  {
    label:"love",
    icon:"pi pi-heart-fill"
  },

  {
      label: 'Upload',
      icon: 'pi pi-upload',
      command: () => {
          window.location.hash = "/fileupload"
      }
  },
  {
      label: 'React Website',
      icon: 'pi pi-external-link',
      command: () => {
          window.location.href = 'https://facebook.github.io/react/'
      }
  }
];