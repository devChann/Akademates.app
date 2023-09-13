import axios from 'axios';
import React, { useState } from 'react'
import styled from 'styled-components';
import getFullUrl from '../../../configs/axios-custom';
import { EventsDto } from '../../../types';
import { formatDateString } from '../../../Services/Helpers';
import { Dialog } from 'primereact/dialog';
import GrowlContext from '../../../configs/growlContext';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { formartDateToIsoString } from '../../../configs/constants';
const Icon3 = styled.img`
  position: relative;
  width: 20px;
  height: 20px;
`;
const ListingPerformance = styled.div`
  font-size: var(--heading-07-size);
  line-height: 28px;
  text-transform: capitalize;
  font-weight: 600;
`;
const Heading8 = styled.div`
  border-radius: var(--br-981xl);
  background-color: var(--color-steelblue-100);
  width: 28px;
  height: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
      display:none;
  }
`;
const MlSummit9th = styled.div`
  position: relative;
  line-height: 28px;
  text-transform: capitalize;
  display: inline-block;
  width: 20vw;
  flex-shrink: 0;
  text-align: left;
`;
const MlSummit9thDecember2022Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  font-size:13px;
`;
const GroupIcon = styled.img`
  position: relative;
  width: 14.67px;
  height: 14.67px;
  cursor: pointer;
`;
const Am = styled.div`
    position: relative;
    line-height: 28px;
    text-transform: capitalize;
    display: inline-block;
    width: 100px;
    flex-shrink: 0;
    font-size: 12px;
`;
const Div8 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-5xs);
  margin-bottom: 10px;
  cursor: pointer;
`;
const Div9 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-5xs);
`;
const Div10 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-5xs);
`;
const Div11 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-5xs);
`;
const Div12 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-5xs);
`;
const Div13 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-5xs);
`;
const CreateNewEvent = styled.div`
  position: relative;
  line-height: 16px;
  font-weight: 500;
  cursor: pointer;
`;
const Tag = styled.div`
  border-radius: var(--br-5xl);
  background-color: var(--color-steelblue);
  height: 32px;
  display: flex;
  flex-direction: row;
  padding: 8px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`;
const Tags = styled.div`
  width: 137px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: var(--font-size-xs);
  color: var(--default-white);
`;
const ListingPerformanceParent = styled.div`
    position: relative;
    width: 91vw;
    height: auto;
    margin-top: 3rem;
    background: white;
    border-radius: 8px;
    padding: 10px;
    max-height: 335px;
    overflow-y: auto;
  .header{
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    margin-bottom:15px;
    
  }
  @media (max-width: 768px) {
    width:80vw;
  }
`;
const  EventViewContainer =  styled.div`
 font-family: Plus Jakarta Sans;
  p{
    color: var(--secondary, #64666C);
  /* body 03 (default) */
  font-family: Plus Jakarta Sans !important;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.625rem; /* 162.5% */
  }
  .content{
    display: flex;
    height: 11.375rem;
    padding: 1rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 3.5rem;
    align-self: stretch;
    border-radius: 0.25rem;
    border: 1px solid var(--line, #E5E5E5);
    background: var(--surface, #F5F5F5);
    overflow-y:auto;
  }
`
function Events() {
  const [events,setEvents] = React.useState(Array<EventsDto>())
  const [eventDialogTitle, seteventDialogTitle] = useState("Add new event");
  const[showEvent,setShowEvent] = React.useState(false)
  const [view, setview] = React.useState(true)
  const[event,setEvent] = React.useState<EventsDto>()
  React.useEffect(()=>{
    axios.get(getFullUrl('/api/Events/events')).then((res)=>{
      const data = res.data as Array<EventsDto>
      setEvents(data)
    }).catch((error)=>{
      console.log(error)
    })
  },[])
  const handleNewEvent = ()=>{
    setShowEvent(true)
      setview(false) 
      
  }
  const showMore =(r:EventsDto)=>{
    setEvent(r as EventsDto)
    setShowEvent(true)
    setview(true)
    seteventDialogTitle("Event Listing")
  }
  return (
    <ListingPerformanceParent className='events'>
        <Dialog header={eventDialogTitle} visible={showEvent} 
           style={{ width: '33vw' }} onHide={()=>setShowEvent(false)}>
         { view ? <> 
          {
            event && (
              <EventViewContainer>
                <p>Event  title : <strong style={{marginLeft:"10px"}}>{event.title}</strong></p>
                <Divider />
                <p>Host: <strong  style={{marginLeft:"10px"}}>{event.organization}</strong></p>
                <Divider />
                <p>Date: <strong  style={{marginLeft:"10px"}}>{formartDateToIsoString(event.eventDate)}</strong></p>
                <Divider />
                <div className='content' dangerouslySetInnerHTML={{__html:event.content}}></div>
                <Divider />
                <p>From: <strong  style={{marginLeft:"10px"}}>{formartDateToIsoString(event.from)}</strong></p>
                <Divider />
                <p>To :<strong  style={{marginLeft:"10px"}}>{formartDateToIsoString(event.to)}</strong></p>
                <Divider />
                <p>Link :<strong  style={{marginLeft:"10px"}}>{event.rsvp}</strong></p>
              </EventViewContainer>
            )
          }
         </> :
           <CreateNewEventComponent setShowEvent = {setShowEvent}/>
         }   

        </Dialog>
          <div className='header'>
            <ListingPerformance>Events</ListingPerformance>
            <Tags>
              <Tag>
                <CreateNewEvent onClick={handleNewEvent}>+ Create New Event</CreateNewEvent>
              </Tag>
            </Tags>
          </div>
            {
              events && events.map((r,i)=> 
                  <>
                    <Div8 key={i} onClick={()=> showMore(r)}>
                    <Heading8>
                      <Icon3 alt="" src="/assets/icon6.svg" />
                    </Heading8>
                    <MlSummit9thDecember2022Wrapper>
                      <MlSummit9th>{r.title}</MlSummit9th>
                    </MlSummit9thDecember2022Wrapper>
                    <GroupIcon alt="" src="/assets/group.svg" />
                    <Am>{formatDateString(r.eventDate)}</Am>
                   
                </Div8>
                <Divider />
                  </>
              )
            }
         
        </ListingPerformanceParent>
  )
}

export default Events


const EventContainer = styled.div`
  color: var(--on-surface, #121212);
  text-align: center;
  font-family: Plus Jakarta Sans;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.625rem; 
  display: flex;
  flex-direction: column;
  gap: 10px;

  .content{
    width:100%;
  }

  .button{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    align-self: stretch;
    
    button{
      border-radius: 0.25rem;
      background: #227699;
      width:100%;
      font-family:var(--title)
      
    }
  }
  .description{
    color: var(--on-surface, #121212);
    font-family: var( --title);
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.75rem; /* 140% */
    text-transform: capitalize;
    margin-bottom:8px;
  }
  .labels{
    font-size:13px;
    text-align:left;
  }
  .field-container{
    display:flex;
    flex-direction:column;
    gap:10px;
    input{
      height:2.5rem;
      border-radius: 0.25rem;
      border: 1px solid #227699;
      background: var(--surface, #F5F5F5);
      display: flex;
      padding: 0.9375rem 1rem;
      align-items: center;
      gap: 0.25rem;
      align-self: stretch;
      font-family:var(--title)
    }
  }

  .rows{
    display:flex;
    flex-direction:row;
    justify-content:space-between;
  }
  .p-editor-container .p-editor-content .ql-editor {
    background: var(--surface, #F5F5F5);
  }
  @media (max-width: 768px) {
      .rows{
        flex-direction:column;
      }
  }
`
export const CreateNewEventComponent = (props:any) => {
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
  return (
    <EventContainer>
      <div className="rows">
        <div className='field-container'>
           <label className='labels'>Title</label>
           <InputText placeholder="Title"  className='inputs' onChange={(e)=>settitle(e.target.value)} />
        </div>
        <div className="field-container">
            <label className='labels'>Date</label>
            <Calendar value={eventDate} onChange={(e) => seteventDate(e.value)} className='inputs'/>
        </div>
      </div>

      <div className="rows">
        <div className='field-container'>
          <label className='labels'>RSVP</label>
          <InputText placeholder="RSVP" className='inputs' onChange={(e)=>setRSVP(e.target.value)} />
        </div>
        <div className="field-container">
        <label className='labels'>Who/Where</label>
        <InputText placeholder="Organization" className='inputs' onChange={(e)=>setorganization(e.target.value)} />
        </div>
      </div>
      <div className="rows">
        <div className='field-container'>
        <label className='labels'>From</label>
        <Calendar value={From} onChange={(e) => setFrom(e.value)} className='inputs'/>
        </div>
        <div className="field-container">
        <label className='labels'>To</label>
        <Calendar value={to} onChange={(e) => setto(e.value)} className='inputs'/>
        </div>
      </div>
      <div className="content">
        <label className='description'>Event Description</label>
        <Editor headerTemplate={header} 
                  placeholder="Add events details"
                  style={{ height: '250px',background:"#64666C" }} value={content}
                  onTextChange={(e) => setContent(e.htmlValue as string)} />
        </div>
      <div className='button'>
        <Button label='Create event' onClick={createEVent} />
      </div>
    </EventContainer>
  )
}
