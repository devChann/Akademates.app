import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import { UserDto } from '../../UserScreen/UserInformation'
import { Divider } from 'primereact/divider'
import axios from 'axios'
import getFullUrl from '../../../../configs/axios-custom'
import profileImage from '../../../../assets/images/profileImage.jpg'
import SectionHeader from '../../Fragments/SectionHeaders'
import ThemeContext from '../../../../configs/theme'
import { Chip } from 'primereact/chip'
import { Button } from 'primereact/button'
import GrowlContext from '../../../../configs/growlContext'

interface UserProfileProps {
   UserID:string 
}
const  Profile : FunctionComponent<UserProfileProps> = ({UserID})=> {
    const theme = React.useContext(ThemeContext);
    const growl = React.useContext(GrowlContext)
    const userContext=window.localStorage.getItem("refreshToken")
    const {id} = userContext ? JSON.parse(userContext) : null
    const [profile,setProfile] = React.useState<UserDto>();
    const [dis,setDis] = React.useState([''])
    const [subdiscipline,setsubdiscipline] = React.useState([''])
    const [fields,setfields] = React.useState([''])
    const [orgBase64String,setorgBase64String] = React.useState("");

    React.useEffect(()=>{
        axios.get(getFullUrl(`/api/Auth/user/${UserID}`)).then((res)=>{
            const d = res.data as UserDto
            const str  = d.profileImage
            setProfile(d)
            setDis(d.discipline.split('|'))
            setsubdiscipline(d.industry.split('|'))
            setfields(d.field.split('|'))
            let base64ToString = Buffer.from(str, "base64").toString()
            console.log(base64ToString)
            setorgBase64String(base64ToString)

        }).catch(()=>{
            console.log('unable to load this user profile')
        })
    },[])

    const follow =()=>{
        if(!id && !UserID){
            return
        }
        axios.post(getFullUrl(`/api/auth/${id}/follow/${UserID}`)).then((x)=>{
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
            <h3>Profile Summary</h3>
            <p>{profile?.biodata}</p>
        </div>
        <div className="profile-containers">
            <div className="header-container">
                <span>
                <i className='pi pi-book'></i>
                </span>
                Branch of knowledge
            </div>
            <Divider />
            {dis.map((d)=><Chip label={d} icon="pi pi-star" className="mr-2 mb-2" />)}
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
            {subdiscipline.map((d)=><Chip label={d} icon="pi pi-star" className="mr-2 mb-2" />)}
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
            {fields.map((d)=><Chip label={d} icon="pi pi-star" className="mr-2 mb-2" />)}
        </div>
        <div className="profile-containers">
        <div className="header-container">
                <span>
                <i className='pi pi-briefcase'></i>
                </span>
                Work Experience
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
            <Button onClick={follow} label='follow'/>
            <Button label='message' />
        </div>
    </div>
  )
}

Profile.propTypes = {}

export default Profile
