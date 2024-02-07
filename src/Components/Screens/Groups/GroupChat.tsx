import { Divider } from 'primereact/divider'
import React from 'react'
import styled from 'styled-components'
const MainContainer = styled.div`
    margin-left:2rem;
    width:70vw;
    align-self:center;
    border:1px solid 

`
const GroupChatHeader =  styled.div`
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
    gap:10px;
`
const GroupChat = () => {
  return (
    <MainContainer>
        <GroupChatHeader>
            <span>
                Group Members
                <i className="pi pi-check"></i>
            </span>
        </GroupChatHeader>
        <Divider />

    </MainContainer>
  )
}

export default GroupChat