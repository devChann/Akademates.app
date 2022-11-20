import React from 'react'
import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { MultiSelect } from 'primereact/multiselect'
import axios from 'axios'
import getFullUrl from '../../../../configs/axios-custom'
import GrowlContext from '../../../../configs/growlContext'
import Select from 'react-select';
import { AllCountries } from '../../../../Services/countries'
import { Disciplines, Industries, Fields } from '../../../../Services/dropDowns'
import { Dialog } from 'primereact/dialog'
import Mapwraper from '../../UserScreen/Mapwraper'
import { Chips } from 'primereact/chips';

export interface ProjectDto{
    id:string
    name:string;
    industry:string;
    category:string;
    desc:string;
    country:string 
    lat:number;
    long:number;
    sponsors:string
    participants:string
    organization:string;
    createdOn: Date | Date[] | undefined,
    status:string;
    budget:number;
    acronym:string;
    fields:string;
    groupDesc:string;
    startDate: Date | Date[] | undefined,
    endDate:Date | Date[] | undefined ,
    partners:string,
    nature:string,
   
 }
export const defaultSettings:ProjectDto = {
    id:"",
    name: '',
    acronym: '',
    desc: '',
    industry: '',
    category: '',
    fields: '',
    groupDesc: '',
    startDate: new Date() ,
    endDate: new Date(),
    partners: '',
    sponsors: '',
    lat: 0.00,
    long: 0.00,
    budget: 0,
    country: '',
    nature: '',
    participants: '',
    organization: '',
    createdOn: new Date(),
    status: ''
}
type selectedTypes = {
    code:number,
    label:string,
    value:number
}
interface ProjectProps {
    ID: string
    rowData : ProjectDto
    toggleEditing: boolean
}

export default function Project({ID,rowData,toggleEditing}:ProjectProps) {
    const growl = React.useContext(GrowlContext)
    const [data,setData] = React.useState<ProjectDto>(defaultSettings);
    const[fieldValues,setProjectFields] = React.useState<ProjectDto>(defaultSettings);

    const [industry,setIndustry] =  React.useState(Array<selectedTypes>());
    const [indOptions,setIndOptions] = React.useState<Array<selectedTypes>>();
    const [FieldOptions,setFieldOptions] = React.useState<Array<selectedTypes>>();
    const [discipline,setDiscipline] =  React.useState(Array<selectedTypes>());
    const [country,setCountry] =  React.useState(Array<selectedTypes>());
    const [field,setFields]  = React.useState(Array<selectedTypes>());
    const [showDialog,setShowDialog] = React.useState(false);

    const [sponsors, setSponsors] = React.useState<any>([]);
    const [partners, setPartners] = React.useState<any>([]);
    const [interests,setInterest] = React.useState()
 
    React.useEffect(()=>{
        if(toggleEditing){
            setProjectFields(rowData)
           if(rowData.sponsors){
            setSponsors(rowData.sponsors.split('|'))
           }
           if(rowData.partners){
            setPartners(rowData.partners.split('|'))
           }
        }
    },[])
    console.log(rowData)

    const showDialogBox = ()=>{
        setShowDialog(true)
    }
    const hideDialogBox =()=>{
        setShowDialog(false)
    }
    const onvalueChange =<O extends keyof ProjectDto> (prop:O, value:ProjectDto[O])=>{
        setProjectFields({...fieldValues, [prop]:value})
    }    
    React.useEffect(()=>{
        const i = Industries.filter((sa)=>{
            return discipline.some((f)=>{
                return f.code == sa.code
            })
        })
        setIndOptions(i)
    },[discipline])

    React.useEffect(()=>{
        const i = Fields.filter((sa)=>{
            return industry.some((f)=>{
                return f.value ==  sa.code
            })
        })
        setFieldOptions(i)
    },[industry])
    const CreateProject = () => {
        
        const selectedindustry = industry.map((s)=>(s.label))
        const selectedCountries = country.map((s)=>(s.label))
        const selectedfield= field.map((s)=>(s.label))
        const selecteddiscipline= discipline.map((s)=>(s.label))

        axios.post(getFullUrl('/api/projects/create'), {
            Name: fieldValues.name,
            Acronym : fieldValues.acronym,
            Description:fieldValues.desc,
            StartDate:fieldValues.startDate,
            EndDate:fieldValues.endDate,
            Category:selecteddiscipline.join('|').toString(),
            Industry:selectedindustry.join('|').toString(),
            Country:selectedCountries.join('|').toString(),
            Fields:selectedfield.join('|').toString(),
            Budget:fieldValues.budget,
            Created:fieldValues.createdOn,
            Lat:0,
            Long:0,
            Sponsors:sponsors.join('|').toString(),
            Partners:partners.join('|').toString(),
            UserID:ID
          })
          .then(function (response) {
             growl.current.show({
                severity:"success",
                summary:"Project created successfully"
             })   
             // reset the form
             setData(defaultSettings)

          })
          .catch(function (error) {
            console.log(error);
          });
      
    }   
  return (
    <>
        <div className="input-group-inline">
            <label className='input-lable-titles'  htmlFor="title" style={{ marginBottom: 8 }}>
            Project Title<span className='required'>*</span>
            </label>
        
            <InputTextarea value={fieldValues.name} onChange={(e)=>{onvalueChange("name",e.currentTarget.value)}} rows={3} cols={35} 
            placeholder="Project title"   className='space-textarea input-textarea'  
            />
        </div>
        <div className="input-group-inline">
            <label className='input-lable-titles'  htmlFor="desc" style={{ marginBottom: 8 }}>
                Description
            </label>
            <InputTextarea defaultValue={fieldValues.desc} onChange={(e)=>onvalueChange("desc",e.currentTarget.value)} rows={3} cols={35} 
                placeholder="Project description"   className='input-textarea'  
            />
        </div>
        <div className="field">
            <label className='input-lable-titles'  htmlFor="budget" 
            style={{ marginBottom: 8 }}>
                Budget
            </label>
            <InputText  id="name" name="budget" value={fieldValues.budget} onChange={(e)=>onvalueChange("budget",Number(e.currentTarget.value))} className="reset-password"  />
        </div>
                
        <div className="field" style={{display:'grid'}}>
            <label className='input-lable-titles'  htmlFor="orgname" 
            style={{ marginBottom: 8 }}>
                Nature
            </label>   
                <MultiSelect panelClassName='reset-password'  name='nature'
                value={fieldValues.nature} 
                options={["Past","Wished","Current","Ongoing","Scheduled"]} 
                onChange={(e)=>{onvalueChange("nature",e.target.value)}}
                placeholder="Select nature" filter className="reset-password"/>       
        
        </div>
        <div className="field" style={{display:'grid'}}>
            <label className='input-lable-titles'  htmlFor="orgname" style={{ marginBottom: 8 }}>
                Start Date
            </label> 
            {/* <Calendar 
            className='reset-password' id="date" 
            name="date" value={fieldValues.startDate}  dateFormat="dd/mm/yy" 
            onChange={(e)=>onvalueChange("startDate",e.value)}
            mask="99/99/9999" showIcon /> */}
        </div>
        <div className="field" style={{display:'grid'}}>
            <label className='input-lable-titles'  htmlFor="orgname" style={{ marginBottom: 8 }}>
                End date
            </label> 
                {/* <Calendar className='reset-password'
                    id="date" name="date" value={fieldValues.endDate}  
                    onChange={(e)=>onvalueChange("endDate",e.value)}
                    dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />    */}
        </div>      
           
        <div className="field">
            <label className='input-lable-titles'  htmlFor="budget" style={{ marginBottom: 8 }}>
                Latitude
            </label>
            <InputText  id="name" name="latitude" value={fieldValues.lat} onChange={(e)=>onvalueChange("lat",Number(e.currentTarget.value))} className="reset-password"  />
        </div>
        <div className="field">
            <label className='input-lable-titles'  htmlFor="longitude" style={{ marginBottom: 8 }}>
                Longitude
            </label>
            <InputText  id="name" name="long" value={fieldValues.long} onChange={(e)=>onvalueChange("long",Number(e.currentTarget.value))} className="reset-password"  />
        </div>
        <div className="choose-from-map">
            <Dialog className='dialog-box' header="Select Project location"    visible={showDialog}  modal style={{ width: '70vw' }}  onHide={hideDialogBox}>
                <Mapwraper />                          
            </Dialog>
            <i  onClick={showDialogBox} className="pi pi-map-marker" style={{'fontSize': '1em'}}></i>
            <p>Choose from a map</p>
        </div>
        <div className="input-group-inline">
            <label className='input-lable-titles'  htmlFor="email" style={{ marginBottom: 8 }}>
                Country
            </label>
            <Select  
                classNamePrefix="Select"
                isMulti
                name='country'
                options={AllCountries}
                onChange = {(x:any)=> setCountry(x)}
                className='select-inputs'
                />
            {/* <Dropdown placeholder='select country' className='search-inputs' id="country" name="country" value={""} options={countries} optionLabel="name" /> */}
        </div>
                
        <div className="input-group-inline">
            <label className='input-lable-titles'  htmlFor="email" style={{ marginBottom: 8 }}>
                Discipline
            </label>
            <Select  
                classNamePrefix="Select"
                isMulti
                name='discipline'
                options={Disciplines}
                className='select-inputs'
                onChange = {(x:any)=> setDiscipline(x)}
                />
            {/* <Dropdown placeholder='select discipline' className='search-inputs' id="country" name="country" value={""} options={countries} optionLabel="name" /> */}
        </div>
        <div className="input-group-inline">
            <label className='input-lable-titles'  htmlFor="email" style={{ marginBottom: 8 }}>
                Industry
            </label>
            <Select  
                classNamePrefix="Select"
                isMulti
                name='industry'
                options={indOptions}
                className='select-inputs'
                onChange = {(x:any)=> setIndustry(x)}
                />
        </div>
        <div className="input-group-inline">
            <label className='input-lable-titles'  htmlFor="email" style={{ marginBottom: 8 }}>
                Fields
            </label>
            <Select  
                classNamePrefix="Select"
                isMulti
                name='fields'
                options={FieldOptions}
                className='select-inputs'
                onChange = {(x:any)=> setFields(x)}
            />
        </div>
        <div className="input-group-inline">
            <label className='input-lable-titles'  htmlFor="orgname" style={{ marginBottom: 8 }}>
                Sponsors
            </label>
            <Chips  style={{width:"18rem", marginRight:"15px"}} width={100} value={partners} onChange={(e) => setPartners(e.value)} />
        </div>
        <div className="input-group-inline" >
            <label className='input-lable-titles'  htmlFor="orgname" style={{ marginBottom: 8 }}>
                Invite participants
            </label>
            <Chips  style={{width:"18rem" ,maxWidth:"18rem"}} className='input-textarea' value={sponsors} onChange={(e) => setSponsors(e.value)} />
        </div>
        <button onClick={CreateProject} className='reset-password-button'>Save</button>
  
    </>
  )
}
