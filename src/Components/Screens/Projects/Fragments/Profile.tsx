import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import { Divider } from 'primereact/divider'
import axios from 'axios'
import getFullUrl from '../../../../configs/axios-custom'
import profileImage from '../../../../assets/images/profileImage.jpg'
import SectionHeader from '../../Fragments/SectionHeaders'
import ThemeContext from '../../../../configs/theme'
import { Chip } from 'primereact/chip'
import { Button } from 'primereact/button'
import GrowlContext from '../../../../configs/growlContext'
import { Academics, Experience, UserDto } from '../../../../types'
import styled from 'styled-components'
import { formatDateString } from '../../../../Services/Helpers'
import { useNavigate } from 'react-router-dom'

const Content4 = styled.div`
  align-self: stretch;
  border-left: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-13xl);
  z-index: 2;
  font-size: var(--button-size);
  color: var(--on-surface);
`;
const Content2 = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  padding: 0rem 0rem 0rem var(--padding-21xl);
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-9xs);
`;
const Heading4 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-base);
  font-size: var(--button-small-size);
`;
const FptUniversity = styled.b`
  position: relative;
  line-height: 1.5rem;
`;
const Year = styled.div`
  position: relative;
  font-size: var(--sub-heading-size);
  line-height: 1rem;
  font-weight: 500;
`;
const Tilte = styled.b`
  position: relative;
  font-size: var(--button-size);
  line-height: 1.63rem;
  text-transform: capitalize;
`;
const Text1 = styled.div`
  align-self: stretch;
  position: relative;
  line-height: 1.63rem;
  z-index: 1;
  text-transform:none;
  font-size:1rem;
  line-height:1.625rem
`;
interface UserProfileProps {
   user?:UserDto 
   userId?: string;
}
const  Profile : FunctionComponent<UserProfileProps> = ({user})=> {
    const theme = React.useContext(ThemeContext);
    const growl = React.useContext(GrowlContext)
    const userContext=window.localStorage.getItem("refreshToken")
    const {id} = userContext ? JSON.parse(userContext) : null
    const [profile,setProfile] = React.useState<UserDto>();
    const [dis,setDis] = React.useState([''])
    const [subdiscipline,setsubdiscipline] = React.useState([''])
    const [fields,setfields] = React.useState([''])
    const [orgBase64String,setorgBase64String] = React.useState("");
    const [sortedExperience,setSortedExperience] =  React.useState<Experience[]>();
    const [sortedAcademics,setSortedAcademics] =  React.useState<Academics[]>();

    const navigate =  useNavigate();

    React.useEffect(()=>{
        axios.get(getFullUrl(`/api/Auth/user/${user?.id}`)).then((res)=>{
            const d = res.data as UserDto
            const str  = d.profileImage
            console.log(d)
            setProfile(d)
            setDis(d.discipline.split('|'))
            setsubdiscipline(d.industry.split('|'))
            setfields(d.field.split('|'))
            let base64ToString = Buffer.from(str, "base64").toString()
            console.log(base64ToString)
            setorgBase64String(base64ToString)

            const sortedExperiences = d.experiences.sort((a, b) => {
                const dateA = a.end === "Present" ? new Date().getTime() : new Date(a.end).getTime();
                const dateB = b.end === "Present" ? new Date().getTime() : new Date(b.end).getTime();
                  return dateB - dateA;
              });
              const sortedAcademics = d.academics.sort((a, b) => {
                const dateA = a.end === "Present" ? new Date().getTime() : new Date(a.end).getTime();
                const dateB = b.end === "Present" ? new Date().getTime() : new Date(b.end).getTime();
                  return dateB - dateA;
              });
              console.log(sortedExperience)
              setSortedAcademics(sortedAcademics)
              setSortedExperience(sortedExperiences)
        }).catch(()=>{
            console.log('unable to load this user profile')
        })
    },[])

    React.useEffect(()=>{
        /* console.log(user)
        if(user){
            const str  = user.profileImage
            setDis(user.discipline.split('|'))
            setsubdiscipline(user.industry.split('|'))
            setfields(user.field.split('|'))
            let base64ToString = Buffer.from(str, "base64").toString()
            console.log(base64ToString)
            setorgBase64String(base64ToString)
            const sortedExperiences = user.experiences.sort((a, b) => {
                const dateA = a.end === "Present" ? new Date().getTime() : new Date(a.end).getTime();
                const dateB = b.end === "Present" ? new Date().getTime() : new Date(b.end).getTime();
                  return dateB - dateA;
              });
              const sortedAcademics =user.academics.sort((a, b) => {
                const dateA = a.end === "Present" ? new Date().getTime() : new Date(a.end).getTime();
                const dateB = b.end === "Present" ? new Date().getTime() : new Date(b.end).getTime();
                  return dateB - dateA;
              });
              console.log(sortedExperience)
              setSortedAcademics(sortedAcademics)
              setSortedExperience(sortedExperiences)
        } */
    },[user])

    const follow =()=>{
        if(!id && !user?.id){
            return
        }
        axios.post(getFullUrl(`/api/auth/${id}/follow/${user?.id}`)).then((x)=>{
            growl.current.show({
                summary:`your now  following ${profile?.firstName + " " + profile?.lastName}`,
                severity:"success"
            })   
        }).catch((error)=>{
            growl.current.show({
                summary:`you have already  followed  ${profile?.firstName + " " + profile?.lastName}`,
                severity:"error"
            })
        })
    }
  return (
    <div>
        <div className="header-container">
             <div className="profile-picture-container">
                {/* <img src={profileImage} className='img-clipped' alt=''></img> */}
                <img style={{borderRadius:"50%" ,display:"none"}}
                    className='img-centered-clipped' height={110} width={110}
                    src={"data:image/jpeg;base64," + orgBase64String}
                    alt="loading"  onLoad= {e => e.currentTarget.style.display = ''} />
             </div>
            <div className="name-group">
                <h5>{profile?.firstName} {" "} {profile?.lastName}</h5>
              <div className="">
                 <span className='subname-group'>
                    <i className='pi pi-map-marker'></i>
                    {profile?.country}   
                    <p>It is a long established fact that a reader  will be distracted by the readable content of a page when looking at its layout</p>
                </span>
              </div>
            </div>
        </div>
        <div className="profile-summary">
            <h5>Profile Summary</h5>
            <p className='subname-group'>{profile?.biodata}</p>
        </div>
        <div className="profile-containers">
            <div className="header-container">
                <span>
                <i className='pi pi-book'></i>
                </span>
                Branch of knowledge
            </div>
            <Divider />
            {dis.map((d)=><Chip label={d} icon="pi pi-star" className="mr-2 mb-2 user-profile-chips" />)}
        </div>
        {subdiscipline && (
            <div className="profile-containers">
            <div className="header-container">
                <span>
                <i className='pi pi-book'></i>
                </span>
                Business Sector/ Trade
            </div>
            <Divider />
            {subdiscipline.map((d)=><Chip label={d} icon="pi pi-star" className="mr-2 mb-2 user-profile-chips" />)}
        </div>
        )}
        
        <div className="profile-containers">
        <div className="header-container">
                <span>
                <i className='pi pi-book'></i>
                </span>
                Field of activity
            </div>
            <Divider />
            {fields.map((d)=><Chip label={d} icon="pi pi-star" className="mr-2 mb-2 user-profile-chips" />)}
        </div>
        <div className="profile-containers">
        <div className="header-container">
                <span>
                <i className='pi pi-briefcase'></i>
                </span>
                Work Experience
            </div>
            <Divider />
            {sortedExperience && sortedExperience.map((r,i)=>
                <Content4 key={i}>
                  <Content2>
                    <Heading4>
                      <FptUniversity>{r.org}</FptUniversity>
                      <Year>{formatDateString(r.start.toString())} - {formatDateString(r.end.toString())}</Year>
                      <Divider layout='vertical'/>
                      <Year>{r.location}</Year>
                      <Divider layout='vertical'/>
                      <Year>{r.nature}</Year>
                    </Heading4>
                    <Tilte>{r.title}</Tilte>
                    <Text1>
                      {r.roleDesc}
                    </Text1>
                  </Content2>
                </Content4>
            )}
        </div>
        <div className="profile-containers">
        <div className="header-container">
                <span>
                <i className='pi pi-book'></i>
                </span>
                Education background
            </div>
            <Divider />
            <div className="profile-image"></div>
            <div className="profile-details"></div>
        </div>
        <div className="profile-containers">
        <div className="header-container">
                <span>
                <i className='pi pi-book'></i>
                </span>
                Publications
            </div>
            <Divider />
            <div className="profile-image"></div>
            <div className="profile-details"></div>
        </div>

        <div className="user-profile-buttons">
            <Button className='reset-password-button' onClick={follow} label='follow'/>
            <Button onClick={()=> navigate('/workspace/messages', {state: profile})} className='reset-password-button' label='message' />
        </div>
    </div>
  )
}

Profile.propTypes = {}

export default Profile
