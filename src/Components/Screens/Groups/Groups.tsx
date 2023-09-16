import React from 'react'
import styled from 'styled-components'
import { GroupsProps } from '../../../types'
import axios from 'axios'
import getFullUrl from '../../../configs/axios-custom'
import { Divider } from 'primereact/divider'

const MainContainer =  styled.div`
  	display:flex;
    flex-direction:column;
    font-family:var(--title);
    margin-left:2rem;
    width:91vw;
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
`
const GroupProfile = styled.i`
    font-size: 2.5rem;
    border-radius: 50%;
    border: 1px solid var(--color-steelblue);
    padding: 10px;
    color:var(--color-steelblue);
`
const Groups = () => {
  const [groupData, setgroupData] = React.useState<GroupsProps[]>();
  const userToken = window.localStorage.getItem("refreshToken")
  const {id} = JSON.parse(userToken!)

  React.useEffect(() => {
    axios.post(getFullUrl('/api/Group/byAdmin'),`${id}`,{
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((res)=>{
      const d =  res.data as GroupsProps []
      setgroupData(d)
    })
  }, [])
  
  return (
    <MainContainer>
      <p>Comming soon</p>
    {/* <HeaderRow>
      <AddGroupButton>Create new group</AddGroupButton>
    </HeaderRow>
    <Divider />
      {groupData && (<>
          { groupData.map((x,i)=> 
            <Rows key={i}>
                <GroupProfile className="pi pi-users" style={{ fontSize: '3rem' }}></GroupProfile>
                <p>{x.group[0].name}</p>
                <p>{x.group[0].description}</p>
                <p>{2}{" "} Members</p>
                <p>Group Settings</p>
            </Rows>)}
            <Divider />
        </>)} */}
    </MainContainer>
  )
}

export default Groups