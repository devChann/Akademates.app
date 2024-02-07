import axios from 'axios';
import React, { useCallback } from 'react'
import styled from 'styled-components';
import { PostRecords } from '../../../types';
import getFullUrl from '../../../configs/axios-custom';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Editor, EditorTextChangeParams } from 'primereact/editor';
import { PostOptions } from '../../../configs/constants';
import { Button } from 'primereact/button';
import GrowlContext from '../../../configs/growlContext';
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
const DashboardIcon = styled.img`
  position: relative;
  width: 20px;
  height: 20px;
  margin:5px;
`;
const Cockpit = styled.b`
  position: relative;
  line-height: 28px;
  text-transform: capitalize;
  color: var(--on-surface, #121212);
/* Heading 07 */
  font-family: 'Plus Jakarta Sans';
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 1.75rem; /* 140% */
  text-transform: capitalize;
`;
const Icon = styled.img`
  position: relative;
  width: 20px;
  height: 20px;
  margin:5px;
`;
const Project = styled.div`
  position: relative;
  line-height: 22px;
  display: inline-block;
  width: 51px;
  height: 20px;
  flex-shrink: 0;
`;
const Helpful = styled.div`
  border-radius: 24px;
  background-color: var(--color-steelblue);
  border: 1px solid var(--line);
  box-sizing: border-box;
  width: 117px;
  display: flex;
  flex-direction: row;
  padding: var(--padding-5xs) var(--padding-3xs) var(--padding-5xs)
    var(--padding-16xl);
  align-items: flex-start;
  justify-content: flex-start;
  text-align: center;
  font-size: var(--button-small-size);
  color: var(--default-white);
  font-family: var(--font-poppins);
`;
const Text2 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const LoremIpsumDolor = styled.div`
  position: relative;
  font-size: var(--body-03-default-size);
  line-height: 26px;
  display: inline-block;
  /* width: 826px; */
`;
const TextParent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--gap-5xs);
  z-index: 0;
  font-size: var(--heading-07-size);
  color: var(--on-surface);
`;
const Message = styled.b`
  position: relative;
  line-height: 24px;
  cursor:pointer;
`;
const VectorParent = styled.div`
  width: 94px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-4xs);
  z-index: 1;
`;
const UserFollowSvgrepoCom1Parent = styled.div`
  margin: 0 !important;
  width: 94px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-4xs);
  z-index: 2;
  span{
    display: flex;
    gap:5px;
    cursor:pointer;
  }
`;
const Text11 = styled.div`
    width: 100%;
    max-height: 170px;
    display: flex;
    flex-direction: column;
    padding: 0px var(--padding-xs) 0px 0px;
    box-sizing: border-box;
    align-items: flex-start;
    -webkit-box-pack: start;
    justify-content: flex-start;
    position: relative;
    overflow-y: scroll;
    gap: var(--gap-5xs);
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--padding-xl) 0px var(--padding-xl) var(--padding-3xs);
  align-items: flex-start;
  justify-content: flex-start;
`;
const AvatarParent = styled.div`
  border-radius: var(--br-2xs);
  background-color: var(--default-white);
  width:100%;
  display: flex;
  flex-direction: row;
  padding: 0px var(--padding-3xs);
  box-sizing: border-box;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-3xs);
  margin-top: 25px;
`;
const FrameParent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-21xl);
  font-size: var(--button-small-size);
  color: var(--color-steelblue);
  font-family: var(--title);
  /* max-height:500px; */
  overflow:auto;
  width:100%;
  height:-webkit-fill-available
  /* margin-left:12px; */
  .engage-buttons{
    display:flex;
    gap:25px;
    justify-content:space-around;
  } 
  .footer{
    height:2rem;
  }
`;

const  DialogContentWrapper =  styled.div`
  font-family:var(  --title);
  display:flex;
  flex-direction:column;
  gap:20px;
  .drop-downs{
    width: 100%;
    background-color: var(--surface);
    border-radius: var(--br-9xs);
    text-align: start;
    font-size: var(--body-03-default-size);
    font-family: 'Plus Jakarta Sans';
    span{
      /* font-family: 'Plus Jakarta Sans'; */
    }
  }
 
  .p-editor-container .p-editor-content .ql-editor {
      background: var(--surface, #F5F5F5);
    }
  .p-dropdown-panel .p-dropdown-items .p-dropdown-item {
    margin: 0;
    padding: 0.75rem 0.75rem;
    border: 0 none;
    color: rgba(0, 0, 0, 0.87);
    background: transparent;
    transition: none;
    border-radius: 0;
    font-family: 'Plus Jakarta Sans';
  }
  .p-dropdown-label {
    font-family: 'Plus Jakarta Sans';
  } 

  button{
    width:100%;
    border-radius: 0.25rem;
    background: #227699;
    width:100%;
    font-family:var(--title)
  }
`
const All = styled.div`
  position: relative;
  line-height: 16px;
  font-weight: 500;
  color:white;
  cursor: pointer;
`;
const Tag5 = styled.div`
  border-radius: var(--br-5xl);
  background-color: var(--color-steelblue);
  display: flex;
  flex-direction: row;
  padding: 14px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;
  gap: var(--gap-9xl);
  font-size: var(--font-size-xs);
  height:2.5rem;
  margin-right:1rem;
`;
const TagsParent = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  width:100%;
  padding:1.2rem;
`

const Tags = styled.div`
  width: 135px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: var(--font-size-xs);
  color: var(--white);
  gap:12px;
  .p-menubar .p-submenu-list {
    z-index: 100 !important;
    font-family: 'Plus Jakarta Sans' !important;
  }
  .p-menubar{
    padding:0px;
  }
  @media (max-width: 768px) {
    .p-menubar.p-menubar-mobile-active .p-menubar-root-list{
      width:14rem;
    }
  }
`;
type PostProps = {
  post:PostRecords[];
  id:string;
}

type PostCategories = {
  name:string; value:string
}
const Posts:React.FC<PostProps> = ({id}) => {
  const [postCategory,setPostCategory] = React.useState<PostCategories>();
  const [postString, setPost] = React.useState<string>('');
  const growl = React.useContext(GrowlContext)
  const [showDialog,setShowDialog] =  React.useState(false);
  const [userPosts,setUserPosts] = React.useState(Array<PostRecords>())
  const [currentFilter, setcurrentFilter] = React.useState("All");
  const [userPostsserverrecord,setPostsServerrecord] = React.useState(Array<PostRecords>())
  const navigate = useNavigate()
  const [wordCount, setWordCount] = React.useState(0);

  const loadPosts = useCallback(() => {
    axios.get(getFullUrl(`/api/Auth/postdata/${id}`))
    .then((res)=>{
      const p = res.data as Array<PostRecords>
      setUserPosts(p);
      setPostsServerrecord(p)
    }).catch(()=>{

    })
  }, []);

  React.useEffect(() => {
      loadPosts()
  }, [])
  

  const  createPost = ()=>{
  
    if (wordCount < 10 ) {
      growl.current.show({
        severity:"info", summary:"Post should be more than 10 words"
      })
      return
    }
    
    const data = {
      postData: postString, 
      category: postCategory,
      userID: id
    };
    axios.post(getFullUrl('/api/Auth/post'), data, {
    headers: {
      'accept': '*/*',
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
        const data = response.data as PostRecords
        setUserPosts((prev)=> [...prev, response.data])
      growl.current.show({
        severity:"success",
        summary:"Post created"
      })
      setShowDialog(false);
      setPost("")
      
  })
  .catch(error => {
    console.error('Error:', error);
  });
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
  const follow =(authorID:string, firstname:string,lastname:string)=>{
    if(!id && !authorID){
        return
    }
    axios.post(getFullUrl(`/api/auth/${id}/follow/${authorID}`)).then(()=>{
        growl.current.show({
            summary:`your now  following ${firstname + " " + lastname}`,
            severity:"success"
        })   
    }).catch(()=>{
        growl.current.show({
            summary:`you have already  followed  ${firstname + " " + lastname}`,
            severity:"error"
        })
    })
}

  const items: MenuItem[] = [
    {
        label: currentFilter,
        icon: 'pi pi-filter',
        items: [
            {
                label: 'All',
                icon: '',
                command: () => {
                  setUserPosts(userPostsserverrecord);
                  setcurrentFilter("All")
                }
            },
            {
              separator: true
            },
            {
                label: 'Grant',
                icon: '',
                command: () => {
                  let grants = userPosts.filter((f)=> f.category === "Grant")
                  setUserPosts(grants);
                  setcurrentFilter("Grants")
                }
            },
            {
              separator: true
            },
            {
              label: 'Solicitation',
              icon: '',
              command: () => {
                const solicitation = userPosts.filter((f)=> f.category === "solicitation")
                setUserPosts(solicitation);
                setcurrentFilter("Solicitation")
              },
          },
          {
            separator: true
          },
          {
            label: 'Funding',
            icon: '',
            command: () => {
              const funding = userPosts.filter((f)=> f.category === "Funding")
              setUserPosts(funding);
              setcurrentFilter("Funding")
            },
          },
        {
          separator: true
        },
        {
          label: 'Consultancy',
          icon: '',
          command: () => {
            const funding = userPosts.filter((f)=> f.category === "Funding")
            setUserPosts(funding);
            setcurrentFilter("Funding")
          },
        },
      {
        separator: true
      },
      {
        label: 'Hot task',
        icon: '',
        command: () => {
          const funding = userPosts.filter((f)=> f.category === "Funding")
          setUserPosts(funding);
          setcurrentFilter("Funding")
        },
      },
    {
      separator: true
    },
        {
          label: 'Projects',
          icon: '',
          command: () => {
            const projects = userPosts.filter((f)=> f.category === "projects")
            setUserPosts(projects);
            setcurrentFilter("Ventures")
          },
         },
        ]
    }
  ]

  const handleTextChange = (event: EditorTextChangeParams) => {
    const text = event.htmlValue as string;
    console.log(text)
    const words = text.split(/\s+/).filter((word) => word.length > 0);
    setWordCount(words.length);
    setPost(event.htmlValue as string)
  };


  const  canSave = postString !== "" && postCategory !== undefined

  const editPost = (post:PostRecords)=>{
      let sele = PostOptions.find((f)=> f.name === post.category)
      console.log(post)
     if (sele) {
      setPostCategory(sele)
     }
      setPost(post.postData)
      setShowDialog(true)
    }
    
  return (
    <FrameParent>
       <Dialog header="Create new post" visible={showDialog} onHide={() => {
        setShowDialog(false)
       }} style={{ width: '45vw',padding:"3px" }}>
        <DialogContentWrapper>
          <Dropdown value={postCategory} options={PostOptions} 
              onChange={(e)=> setPostCategory(e.target.value)}  className="drop-downs"
              optionLabel="name" placeholder="Select post category" />

            <Editor headerTemplate={header} 
                  // placeholder="What's on your mind..."
                  style={{ height: '250px' }} value={postString}
                  onTextChange={(e) => handleTextChange(e)} />
            <div className='button'>
                <Button disabled = {!canSave} onClick={createPost} label='Create' />
            </div>     
        </DialogContentWrapper>    
      </Dialog>
      <TagsParent>
        <Tags>
          <Menubar  model={items}  className='menu-bar'/>
          {/* {filters && filters.map((r,i)=><Tag  onClick={()=> filterPost(r.name, r.id)} key={i}  className={currentFilter === r.id ? 'active' : 'normal'}><All>{r.name}</All></Tag>)} */}
        </Tags>
        <Tag5>
            <All onClick={()=> setShowDialog(true)}>{`+ Create new post `}</All>
          </Tag5>
      </TagsParent>

      {userPosts && userPosts.map((r,i)=>
        <AvatarParent className='posts-container' key={i}>
        <TextWrapper>
          <Text11>
            <TextParent>
              <Text2 className='post-titles'>
                  {r.user?.firstname || r.user?.lastname && (<Cockpit>{r.user?.firstname + " " + r.user?.lastname}</Cockpit>)}
                <Helpful>
                  <Project>{r.category}</Project>
                </Helpful>
              </Text2>
              <LoremIpsumDolor dangerouslySetInnerHTML={{__html:r.postData}} />
            </TextParent>
          <div className="engage-buttons">
                  {
                    r.userID !== id && (<>
                       <VectorParent>
                      <DashboardIcon alt="" src="/assets/vector.svg" />
                      <Message onClick={()=> navigate('/workspace/messages')}>Message</Message>
                  </VectorParent>
                  <UserFollowSvgrepoCom1Parent>
                      <Icon alt="" src="/assets/userfollowsvgrepocom-1.svg" />
                      <Message onClick={()=> follow(r.userID,r.user.firstname, r.user.lastname)}>Track</Message>
                  </UserFollowSvgrepoCom1Parent>
                    </>)
                  }

                  {r.userID === id ? 
                  <UserFollowSvgrepoCom1Parent>
                      {/* <Icon alt="" src="/assets/editicon.svg "/> */}
                      <span onClick={()=> editPost(r)}>
                      <i className="pi pi-pencil"></i>
                      <p>Edit</p>
                      </span>
                      <span style={{marginLeft:"10px"}}>
                      <i className="pi pi-trash"></i>
                      <p>Delete</p>
                      </span>
                     
                  </UserFollowSvgrepoCom1Parent> : null}
                  
          </div>
          </Text11>
        </TextWrapper>
      </AvatarParent>
      )}
    
     <div className='footer'>
      </div>               
  </FrameParent>
  )
}

export default Posts