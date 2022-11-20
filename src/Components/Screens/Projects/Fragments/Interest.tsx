import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import React, { FunctionComponent } from 'react'
import getFullUrl from '../../../../configs/axios-custom';
import './Interest.css';
import Profile from './Profile';
interface InterestProps {
  id:string
  getInterest : (i:number)=> void
}
type interests = {
  interestID:string
  userID:string
  projectID :string
  read:boolean
}
const Interest:FunctionComponent<InterestProps> = ({id,getInterest}) => {
  const [interest,setInterest] = React.useState<Array<interests>>();
  const [totalInterest,setTotalinterest] = React.useState(0);
  const [profileId,setProfiledId]= React.useState('');

  React.useEffect(() => {
    axios.get(getFullUrl(`/api/Projects/interests/nortifications/${id}`)).then((res)=>{
      setInterest(res.data);
      setTotalinterest(res.data)
      getInterest(totalInterest)
    }).catch((msg)=>{
      console.log('error could not load interest')
    })
  }, [id])
  const [showDialog,setShowDialog] = React.useState(false)
  const onHideDialog = ()=>{
    setShowDialog(false)
  }

  const onShow = (row:interests)=>{
    console.log(row)
    setShowDialog(true);
    setProfiledId(row.userID);
  }
  //<p className='view-user-profile' onClick={onShow}>View user profile</p>
  //<p className='view-user-profile' onClick={onShow}>View user profile</p>
  return (
    <div>
       <Dialog className='dialog-box' header="User Profile"    visible={showDialog}  modal style={{ width: '60vw' }}  onHide={onHideDialog}>
              <Profile UserID={profileId} />
       </Dialog>
      <p className='view-label'>Project Interests</p>
      {interest?.map((x:interests)=>
      <><div key={x.interestID} style={{ display: "flex" }}>
          {x.read ? <p  className='view-user-profile' onClick={()=>{
            onShow(x)
          }}>Read: {" "}View user profile</p> : <p className='view-user-profile' onClick={()=>{
           onShow(x)
          }}> Un Read: {" "} View user profile</p>}
        </div><Divider /></>
      )}
    </div>
  )
}

export default Interest