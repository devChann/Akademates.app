import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import React from 'react'

export default function Education() {
  return (
    <div className='grid'>
        <div className="col">
            <div className='modal-content'>
                <div className='reset-password-container'>
                    <div className="field">
                        <label className='input-lable-titles'  htmlFor="orgname" style={{ marginBottom: 8 }}>
                            Institution<span className='required'>*</span>
                        </label>
                        <InputText id="name" name="name" value={""} className="modal-inputs"  />
                    </div>
                    <div className="field">
                        <label className='input-lable-titles'  htmlFor="orgname" style={{ marginBottom: 8 }}>
                            Course Title<span className='required'>*</span>
                        </label>
                        <InputText id="name" name="name" value={""} className="modal-inputs"  />
                    </div>
                </div>
                <div className="reset-password-container">
                    <div className="field" style={{display:"grid"}}>
                        <label className='input-lable-titles'  htmlFor="orgname" style={{ marginBottom: 8 }}>
                            Start Date<span className='required'>*</span>
                        </label> 
                        <Calendar className='modal-inputs' id="date" name="date" value={new Date()}  dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                    </div>                                                  
                    <div className="field" style={{display:"grid"}}>
                        <label className='input-lable-titles'  htmlFor="orgname" style={{ marginBottom: 8 }}>
                            End date<span className='required'>*</span>
                        </label> 
                        <Calendar className='modal-inputs' id="date" name="date" value={new Date()}  dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />   
                    </div>                  
                </div>
                <div className='dialog-footer'><button className='reset-password-button'>Save</button></div>
            </div>
        </div>
    </div>
  )
}
