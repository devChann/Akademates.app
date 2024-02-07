import axios from 'axios'
import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import React from 'react'
import getFullUrl from '../../../configs/axios-custom'
import GrowlContext from '../../../configs/growlContext'
import { Academics } from '../../../types'
import { Button } from 'primereact/button'

  interface educationProps {
    setshowEditwindow: React.Dispatch<React.SetStateAction<boolean>>
    editMode : boolean;
    data ?: Academics | undefined,
    userId : string
  }  
 const  Education: React.FunctionComponent<educationProps> = ({userId,data,setshowEditwindow,editMode}) =>{
    const growl =  React.useContext(GrowlContext);
  const [institution, setinstitution] = React.useState<string>()  
  const [course, setcourse] = React.useState<string>()
  const [city, setcity] = React.useState<string>()
  const [startdate, setStartdate] = React.useState<Date | string>(new Date())  
  const [enddate, setEndDate] = React.useState<Date | string>(new Date())
  
  const  canSave = institution !== undefined && course !== undefined && startdate !== undefined && enddate !== undefined

  const addEduction =  ()=>{
    axios.post(getFullUrl('/api/auth/academics'),{
        institution: institution,
        course: course,
        start: startdate,
        end: enddate,
        city: "string",
        userId: userId
      }).then((res)=>{
        growl.current.show({
            severity:"success",
            summary:"Success"
        })
        setshowEditwindow(false)
      }).catch((error)=>{
        growl.current.show({
            severity:"error", summary: "an error occurred"
        })
        setshowEditwindow(false)
      })
  }

  React.useEffect(()=>{
    if (editMode && data) {
        setinstitution(data.institution)
        setcourse(data.course)
        setStartdate(new Date(data.start))
        setEndDate(new Date(data.end))
        
    }else{
        // do nothing
    }
  },[editMode])

  return (
    <div className='grid'>
        <div className="col">
            <div className='modal-content'>
                <div className='reset-password-container'>
                    <div className="field">
                        <label className='input-lable-titles'  htmlFor="orgname" style={{ marginBottom: 8 }}>
                            Institution<span className='required'>*</span>
                        </label>
                        <InputText id="name" name="name" value={institution} className="modal-inputs" onChange={(e)=>setinstitution(e.target.value)} />
                    </div>
                    <div className="field">
                        <label className='input-lable-titles'  htmlFor="orgname" style={{ marginBottom: 8 }}>
                            Course Title<span className='required'>*</span>
                        </label>
                        <InputText id="name" name="name" value={course} className="modal-inputs" onChange={(e)=>setcourse(e.target.value)}  />
                    </div>
                </div>
                <div className="reset-password-container">
                    <div className="field" style={{display:"grid"}}>
                        <label className='input-lable-titles'  htmlFor="orgname" style={{ marginBottom: 8 }}>
                            Start Date<span className='required'>*</span>
                        </label> 
                        <Calendar className='modal-inputs' id="date" name="date" value={startdate as Date} onChange={(e)=>setStartdate(e.target.value as Date)} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                    </div>                                                  
                    <div className="field" style={{display:"grid"}}>
                        <label className='input-lable-titles'  htmlFor="orgname" style={{ marginBottom: 8 }}>
                            End date<span className='required'>*</span>
                        </label> 
                        <Calendar className='modal-inputs' id="date" name="date" value={enddate as Date}  onChange={(e)=>setEndDate(e.target.value as Date)} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />   
                    </div>                  
                </div>
                <div className='dialog-footer'><Button disabled={!canSave} onClick={addEduction} className='reset-password-button'>Save</Button></div>
            </div>
        </div>
    </div>
  )
}

export default Education;