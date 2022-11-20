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

interface UserProfileProps {
   UserID:string 
}
const  Profile : FunctionComponent<UserProfileProps> = ({UserID})=> {
    const theme = React.useContext(ThemeContext);
    const [profile,setProfile] = React.useState<UserDto>();
    const [dis,setDis] = React.useState([''])
    const [subdiscipline,setsubdiscipline] = React.useState([''])
    const [fields,setfields] = React.useState([''])
    console.log(UserID)

    React.useEffect(()=>{
        axios.get(getFullUrl(`/api/Auth/user/${UserID}`)).then((res)=>{
            const d = res.data as UserDto
            setProfile(d)
            setDis(d.discipline.split('|'))
            setsubdiscipline(d.industry.split('|'))
            setfields(d.field.split('|'))

        }).catch(()=>{
            console.log('unable to load this user profile')
        })
    },[])
  return (
    <div>
        <div className="header-container">
             <div className="profile-picture-container">
                <img src={profileImage} className='img-clipped' alt=''></img>
                    {/* <Image src={profileImage} template="Preview Content" className='img-clipped' width='100' alt='' preview/> */}
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
                Disciplines
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
                Sub Disciplines
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
                Fields
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
    </div>
  )
}

Profile.propTypes = {}

export default Profile
