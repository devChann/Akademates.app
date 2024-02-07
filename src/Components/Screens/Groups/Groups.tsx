import React from 'react'
import styled from 'styled-components'
import { GroupsProps } from '../../../types'
import axios from 'axios'
import getFullUrl from '../../../configs/axios-custom'
import { Divider } from 'primereact/divider'
import { Card } from 'primereact/card'
import { useNavigate } from 'react-router-dom'
const MainContainer =  styled.div`
  	display:flex;
    flex-direction:column;
    font-family:var(--title);
    margin-left:2rem;
    width:80vw;
`
const Rows = styled.div`
  	display:flex;
    flex-direction:row;
    justify-content:space-between;
    width:100%;
    font-family:var(--title);
    margin-top:1rem;
    margin-bottom:1rem;
`
const HeaderRow = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
    width:100%;
    font-family:var(--title)
`
const AddGroupButton= styled.div`
    border-radius: var(--br-5xl);
    background-color: var(--color-steelblue);
    height: 32px;
    display: flex;
    flex-direction: row;
    padding: var(--padding-9xs) var(--padding-xs);
    box-sizing: border-box;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    cursor: pointer;
    color:white;
    text-transform:none;
    font-size:13px;
`
const GroupProfile = styled.i`
    font-size: 2.5rem;
    border-radius: 50%;
    border: 1px solid var(--color-steelblue);
    padding: 10px;
    color:var(--color-steelblue);
`

const CardGroup = styled.div`
  display:flex;
  flex-wrap:wrap;
  gap:15px;
  .cards {
    border-left:5px solid #227699;
    width:15rem;
    display:flex;
    gap:10px;
    cursor: pointer;
  }
  .p-card .p-card-title{
    font-size:1rem;
    font-family:'Plus Jakarta Sans';
    font-weight:600;
  }
`
const DeleteContainer = styled.i`
  color:blue;
  align-self:right;

`

const Groups = () => {
  const [groupData, setgroupData] = React.useState<GroupsProps[]>();
  const userToken = window.localStorage.getItem("refreshToken")
  const {id} = JSON.parse(userToken!)
  const navigate = useNavigate();
  React.useEffect(() => {
    axios.post(getFullUrl('/api/Group/byAdmin'),`${id}`,{
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((res)=>{
      const d =  res.data as GroupsProps []
      console.log(d)
      setgroupData(d)
    })
  }, [])
  const onGroupSelect = (event:GroupsProps) => {
        navigate(`/workspace/groups/${event.groupId}`, { state: { data: {} } });
  };
  return (
    <MainContainer>
    
     <HeaderRow>
      <AddGroupButton>Create new group</AddGroupButton>
    </HeaderRow>
    <Divider />
    <CardGroup>
      Comming soon
    </CardGroup>
    </MainContainer>
  )
}

export default Groups

/* <Rows key={i}>
                <GroupProfile className="pi pi-users" style={{ fontSize: '3rem' }}></GroupProfile>
                <p>{x.group[0].name}</p>
                <p>{x.group[0].description}</p>
                <p>{2}{" "} Members</p>
                <p>Group Settings</p>
            </Rows>)} */

/* 
            {groupData && groupData.map((g)=> 
        <Card className='cards' title={"Nairobi working grp"} onClick={()=> onGroupSelect(g)}>
        <Divider />
            <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            </p>
        </Card>
      )} */