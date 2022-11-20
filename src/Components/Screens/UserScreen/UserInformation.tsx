
import axios from 'axios'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { MultiSelect } from 'primereact/multiselect'
import { Timeline } from 'primereact/timeline'
import React, { FunctionComponent } from 'react'
import getFullUrl from '../../../configs/axios-custom'
import GrowlContext from '../../../configs/growlContext'
import ThemeContext from '../../../configs/theme'
import { Disciplines, Industries } from '../../../Services/dropDowns'
import SectionHeader from '../Fragments/SectionHeaders'
import Education from './Education'
import Experience from './Experience'
import Select from 'react-select';
import { useGridStyles } from '../../../Hooks/GridStyles'
import { Calendar } from 'primereact/calendar'
import  addphoto from '../../../assets/images/addphoto.svg';
import styled from '@emotion/styled';
import toBase64 from '../../../configs/convertToBase64'
import {ProgressBar} from 'primereact/progressbar'
type selectedTypes = {
    code:number,
    label:string,
    value:number
}
export interface UserDto {
    id:string,
    firstName:string,
    lastName:string,
    email:string,
    profileImage:[],
    backgroundImage:[],
    organization:string,
    biodata:string,
    industry:string,
    discipline:string,
    field:string,
    country:string 
    address:string;
    dateOfBirth : Date | Date[] | undefined
    phone: string
}
const defaultUserSettings:UserDto={
    id:"",
    firstName:"",
    lastName:"",
    email:"",
    profileImage:[],
    backgroundImage:[],
    organization:"",
    biodata:"",
    industry:'',
    discipline:'',
    field:"",
    country:"" , address:"",
    dateOfBirth : new Date(),
    phone:''

}
interface ChipProps {
    label: string,
    onIconClick: React.Dispatch<any>
}
const customStyles = {
    chipsContainer: {
      marginTop: "5px",
      display: "flex",
      flexWrap: "wrap" as "wrap",
    },
    multiSelect: {
      width: "100%",
      borderRadius: 10,
    },
    multiSelectContainer: {
      margin: "5px 0px",
    },
};
const Img =  styled.img({
    // margin: "5px",
    height: "140px",
    width:"140px",
    borderRadius:"50%",
    position: "relative"
})
const useStyle = () => {
    const theme = React.useContext(ThemeContext);

    return {
        chip: {
            display: "flex",
            alignItems: "center",
            margin: "2px",
            marginRight: "5px",
            padding: "7px",
            paddingLeft: "12px",
            fontSize: "14px",
            fontWeight: 600,
            textAlign: "left" as "left",
            backgroundColor: theme.v2.lightBlue,
            borderRadius: "1em"
        },
        icon: {
            fontSize: ".9em",
            cursor: "pointer"
        }
    };
};
const Chip: FunctionComponent<ChipProps> = ({label, onIconClick}) => {

    const style = useStyle();

    return (
        <div style={style.chip}>
            <span>{label}</span> &nbsp; <i style={style.icon} className="pi pi-times" onClick={onIconClick} />
        </div>
    );
};
export const UserInformation = (props:any) => {
    const theme = React.useContext(ThemeContext);
    const styles = useGridStyles()
    const [data,setData] = React.useState<UserDto>(defaultUserSettings)
    const growl = React.useContext(GrowlContext)
    const [showDialog,setShowDialog] = React.useState(false)
    const [discipline,setDiscipline] =  React.useState(Array<selectedTypes>());
    const [industry,setIndustry] =  React.useState(Array<selectedTypes>());
    const [indOptions,setIndOptions] = React.useState<Array<selectedTypes>>();
    const[fieldValues,setUserFields] = React.useState<UserDto>(defaultUserSettings);
    // profile image
    const [img, setImg] = React.useState({ preview: "", raw: "" });
    const [isLoading,setIsLoading] = React.useState(false)
    const [ButtonText,setButtonText] = React.useState("Upload")
    const [orgBase64String,setorgBase64String] = React.useState("");
    const onvalueChange =<O extends keyof UserDto> (prop:O, value:UserDto[O])=>{
        setUserFields({...fieldValues, [prop]:value})
    } 

    const showDialogBox = ()=>{
        setShowDialog(true)
    }
    const hideDialogBox =()=>{
        setShowDialog(false)
    }
    const loadUserData =()=>{
        axios.get(getFullUrl(`/api/Auth/user/${props.id}`)).then((res)=>{
            const a = res.data
            const data = a as UserDto
            //  console.log()
            //  const dis = data.discipline.map((c)=>{
            //     return c.label.split('|')
            //  })
             console.log(data)
            setData(data)
            setUserFields(data);
        }).catch(()=>{
            growl.current.show({
                severity:"error",
                summary:"error loading"
            })
        })
    }

    React.useEffect(()=>{
      loadUserData()
    },[])

    React.useEffect(()=>{
        const i = Industries.filter((sa)=>{
            return discipline.some((f)=>{
                return f.code == sa.code
            })
        })
        setIndOptions(i)
    },[discipline])

    const events = [
        { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
        { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
    ];

    const UpdateUserInformation =()=>{
        const selectedindustry = industry.map((s)=>(s.label))
        const selecteddiscipline= discipline.map((s)=>(s.label))

        axios.put(getFullUrl(`/api/Auth/edituser/${props.id}`),{
            FirstName: fieldValues.firstName,
            LastName:fieldValues.lastName,
            Organization: fieldValues.organization,
            Biodata:fieldValues.biodata,
            Address: fieldValues.address,
            Discipline: selecteddiscipline.join('|').toString(),
            Industry:selectedindustry.join('|').toString(),
            Country: fieldValues.country,

        }).then((res)=>{
            growl.current.show({
                severity:"success",
                summary:"Profile has been edited"
            })
            
        }).catch(()=>{
            growl.current.show({
                severity:"error",
                summary:"error saving data"
            })
        })
    }
    const unSelectedDiscipline = React.useCallback((disciplineToRemove: selectedTypes, selectedCountries: selectedTypes[])=>{
        const x = discipline.filter(
            (d) => d.label !== disciplineToRemove.label
          );
        setDiscipline(x)
    },[])

    // upload image 
    const saveProfilePhoto = async (base64string: string)=>{
        setIsLoading(true)
        setButtonText("Uploading")
        const header = {
            headers: {
              "Content-Type": " image/jpeg"
            }
        }
        let basestring = base64string.split("base64,")[1];
        axios
            .post(
                getFullUrl("/api/organization/logo", {
                useDedicatedEnvironment: true,
                }),
            basestring,
                header
            )
            .then(() => {
            
                growl.current.show({
                severity: "success",
                summary: "Profile logo has been uploaded successfully",
                });

                setIsLoading(false)
                setButtonText("Upload")
            })
            .catch((error)=>{
                console.log(error)
                if (growl.current) {
                growl.current.show({
                    severity: "error",
                    summary: "Unable to upload the logo",
                });
                }
            });
    }
    const imgHandler = ()=>{
        if (img.raw) {
          return(
            <Img className='img-centered-clipped'
            src={img.preview} alt="" style={{display:"none",margin:"4px"}} onLoad = {(e:any) => e.currentTarget.style.display=''} />
          )
        }else if(orgBase64String){
          return(
            <img style={{borderRadius:"50%" ,display:"none"}}
            className='img-centered-clipped' height={145} width={145}
            src={"data:image/jpeg;base64," + orgBase64String}
              alt="loading"  onLoad= {e => e.currentTarget.style.display = ''} />
          )
        }else{
          return(<div style={{marginTop: "50px"}}><img style={{paddingTop:"0px"}} src={addphoto}  alt=''></img></div>
            
          )
        }
    }
    const handleImgChange =( e:any) => {
        if (e.target.files.length) {
          setImg({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
          });
        }
    };

    const onImageUpload = async (e:any) => {
        e.preventDefault();
        if(img.raw){
          saveProfilePhoto(await toBase64(img.raw))
        }
       };
  return (
    <div style={{display:"inline-bloc", width:"100%"}}>
    <Accordion activeIndex={0} collapseIcon="pi pi-chevron-up" expandIcon="pi pi-chevron-down">
        <AccordionTab header={<SectionHeader title='Account Information' 
        icontext='pi pi-stop-circle' titleStyle={theme.customStyle.subHeaderTitle}
        sectionStyle={theme.customStyle.subHeader}/>}>
         <div className="grid">
            <div className="col-4 profile-image-container">
                <div className="profile-picture-title">
                <h3> Upload logo here</h3>
                   
                </div>
                <div className='profile-logo'>
                    <label htmlFor="upload-button">
                    {imgHandler()}
                    </label>
                    <input accept="image/*" type="file" id="upload-button" style={{ display: 'none !important' }} onChange={handleImgChange} />
                </div>
                <div className="image-upload-button">
                    <button className='upload-button' onClick={onImageUpload}>{ButtonText}</button>
                    {isLoading &&(
                        <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>
                    )} 
                </div>
            </div>
            <div className="col-8">
                <h3>Personal Details</h3>
            <form className="p-fluid">
                    <div className="input-group">
                        <div style={{marginRight:"5px"}}>
                            <label className='input-lable-titles'  htmlFor="firstname" style={{ marginBottom: 8 }}>
                                Surname<span className='required'>*</span>
                            </label>
                            <InputText value={fieldValues.firstName} className="name-inputs first-last-name"
                            placeholder="first name"  onChange={(e)=>{onvalueChange("firstName",e.currentTarget.value)}}  
                            />
                        </div>
                        <div className="input-group-user">
                            <label className='input-lable-titles'  htmlFor="lastname" style={{ marginBottom: 8 }}>
                            Other Names<span className='required'>*</span>
                            </label>
                            <InputText value={fieldValues.lastName} className="name-inputs first-last-name"
                            placeholder="last name"    onChange={(e)=> onvalueChange('lastName', e.currentTarget.value)}
                            />
                        </div>
                    </div>
                
                    <div className="input-group-user">
                        <label className='input-lable-titles'  htmlFor="email" style={{ marginBottom: 8 }}>
                            Email<span className='required'>*</span>
                        </label>
                        <InputText  value={fieldValues.email} className="name-inputs"
                        placeholder="email"
                        />
                    </div>
                    <div className="input-group-user">
                        <label className='input-lable-titles'  htmlFor="phone" style={{ marginBottom: 8 }}>
                            Phone<span className='required'>*</span>
                        </label>
                        <InputText  value={fieldValues.phone} className="name-inputs"
                        placeholder="Phone number" onChange={(e)=> onvalueChange('phone', e.currentTarget.value)}
                        />
                    </div>
                    <div className="input-group-user">
                        <label className='input-lable-titles'  htmlFor="bio" style={{ marginBottom: 8 }}>
                            Bio<span className='required'>*</span>
                        </label>
                        <InputTextarea value={fieldValues.biodata} rows={3} cols={45}
                        placeholder="bio"   className='input-textarea'  
                        onChange={(e)=> onvalueChange('biodata', e.currentTarget.value)}
                        />
                    </div>
        
                    <div className="input-group-user">
                        <label className='input-lable-titles'  htmlFor="dob" style={{ marginBottom: 8 }}>
                            Date of Birth<span className='required'>*</span>
                        </label>
                        <Calendar className='reset-password'
                        id="date" name="date" value={fieldValues.dateOfBirth}  
                        onChange={(e)=>onvalueChange("dateOfBirth",e.value)}
                        dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />         
                    </div>
                    <div className="input-group-user">
                        <label className='input-lable-titles'  htmlFor="address" style={{ marginBottom: 8 }}>
                            Address<span className='required'>*</span>
                        </label>
                        <InputTextarea value={fieldValues.address} rows={3} cols={30}
                        placeholder="address"   className='input-textarea'  onChange={(e)=> onvalueChange('address', e.currentTarget.value)}
                        />
                    </div>
                    
                    <div className="input-group-user">
                        <label className='input-lable-titles'  htmlFor="orgname" style={{ marginBottom: 8 }}>
                            Discipline<span className='required'>*</span>
                        </label>   
                        {/* <Select  
                            classNamePrefix="Select your discipline"
                            isMulti
                            name='discipline'
                            options={Disciplines}
                            className='select-inputs'
                            onChange = {(x:any)=> setDiscipline(x)}
                            /> */}

                            <MultiSelect
                                optionLabel="label"
                                filter={true}
                                // style={styles.multiSelect}
                                placeholder="select your discipline"
                                fixedPlaceholder
                                value={discipline}
                                options={Disciplines}
                                onChange={(e) => setDiscipline(e.value)}
                                />
                                <div style={customStyles.chipsContainer}>
                                    {discipline
                                        .sort((c1, c2) => c1.label.localeCompare(c2.label))
                                        .map((d) => (
                                        <Chip
                                            key={d.code}
                                            label={d.label}
                                            onIconClick={() => unSelectedDiscipline(d, discipline)}
                                        />
                                        ))}
                                    </div>
                    </div>
                    <div className="input-group-user">
                        <label className='input-lable-titles'  htmlFor="orgname" 
                        style={{ marginBottom: 8 }}>
                            Industry<span className='required'>*</span>
                        </label>   
                            <Select  
                            classNamePrefix="Select your industry"
                            isMulti
                            name='industry'
                            options={indOptions}
                            className='select-inputs'
                            onChange = {(x:any)=> setIndustry(x)}
                            />
                        </div>
                   <div className="center-buttons ">
                        <Button onClick={UpdateUserInformation}  style={styles.saveButtons}>Save</Button>
                   </div>   
                 </form>
            </div>
         </div>       
        </AccordionTab>
        <AccordionTab header={<SectionHeader title='Experience' icontext='pi pi-briefcase'
        titleStyle={theme.customStyle.subHeaderTitle} sectionStyle={theme.customStyle.subHeader}/>}>
            <div className="grid">
                <div className="col">
                    <div>
                        <div className='section-group'>
                            <div className='add-item-group'>
                                <Dialog className='dialog-box' header="Edit Experience"    visible={showDialog}  modal style={{ width: '50vw' }}  onHide={hideDialogBox}>
                                    <Experience />
                                </Dialog>
                                <h4>AidKonneck</h4>
                                <div className='add-item'>
                                 <i className="pi pi-pencil" onClick={showDialogBox}></i>      
                                 <i className="pi pi-plus" onClick={showDialogBox}></i>
                                </div>
                            </div>
                           
                            <h4>Software Engineer</h4>
                            <h4>Nature</h4>
                            <div>
                                <p>From: 2021</p>
                                <p>Present</p>
                                <p>Nairobi  Kenya</p>
                            </div>
                            <p>It is a long established fact that a reader will be 
                                distracted by the readable content of a page when 
                                looking at its layout. The point of using Lorem
                                Ipsum is that it has a more-or-less normal distribution 
                                of letters, as opposed to using 'Content here, content here', 
                                making it look like readable English. Many desktop publishing
                                packages and web page editors now use Lorem Ipsum as their 
                                default model text, and a search for 'lorem ipsum' will 
                                uncover many web sites still in their infancy</p>
                        </div>
                        <div className='section-group'>
                        <Timeline value={events}  align="left"
                            content={()=>(
                            <div className='time-lines'>
                                <h4>OSL | Head of product development</h4>
                                <h6>Full Time</h6>
                            <div>
                                <p>From: 2021</p>
                                <p>Present</p>
                                <p>Nairobi  Kenya</p>
                            </div>
                            <p>It is a long established fact that a reader will be 
                            distracted by the readable content of a page when 
                            looking at its layout. The point of using Lorem
                            Ipsum is that it has a more-or-less normal distribution 
                            of letters, as opposed to using 'Content here, content here', 
                            making it look like readable English. Many desktop publishing
                            packages and web page editors now use Lorem Ipsum as their 
                            default model text, and a search for 'lorem ipsum' will 
                            uncover many web sites still in their infancy</p>
                                </div>
                            )}
                        >
                        </Timeline>
                        </div>
                    </div>
                </div>
            </div>
        </AccordionTab>
        <AccordionTab header={<SectionHeader title='Education' 
        icontext='pi pi-book' titleStyle={theme.customStyle.subHeaderTitle}
        sectionStyle={theme.customStyle.subHeader}/>}>
        <div className="grid">
            <div className="col">
                <Dialog className='dialog-box' header="Edit Education"    visible={showDialog}  modal style={{ width: '50vw' }}  onHide={hideDialogBox}>
                    <Education />
                </Dialog>
                <div className='section-group'>
                     <div className='add-item-group'>
                        <h4>Strathmore University</h4>
                        <div className='add-item'>
                            <i className="pi pi-pencil" onClick={showDialogBox}></i>      
                            <i className="pi pi-plus" onClick={showDialogBox}></i>
                        </div>
                    </div>
                    <h4>GeoInformatics</h4>
                    <h4>Full Time</h4>
                    <div>
                        <p>From: 2021</p>
                        <p>Present</p>
                        <p>Country</p>
                    </div>
                </div>
            </div>
        </div>
        </AccordionTab>
        <AccordionTab header={<SectionHeader title='Change Password' 
        icontext='pi pi-lock' titleStyle={theme.customStyle.subHeaderTitle}
        sectionStyle={theme.customStyle.subHeader}/>}>
            <div className="grid">
                <div className="col-6">
                    <form className='section-group'>
                        <div className="reset-password-container">
                            <div className="field">
                                <span className="p-float-label">
                                    <InputText id="name" name="name" value={""} className="reset-password"  />
                                    <label htmlFor="name" >Old password*</label>
                                </span>
                            </div>
                            <div className="field">
                                <span className="p-float-label">
                                    <InputText id="name" name="name" value={""} className="reset-password" />
                                    <label htmlFor="name" >New Password*</label>
                                </span>
                            </div>
                        </div>
                       
                        <div className="field">
                            <span className="p-float-label">
                                <InputText id="name" name="name" value={""} className="reset-password"  />
                                <label htmlFor="name" >Repeat Password*</label>
                            </span>
                        </div>
                        
                        <button className='reset-password-button'>Save</button>
                    </form>
                </div>
                <div className="col-6"></div>
            </div>
        </AccordionTab>
    </Accordion> 
</div>
  )
}
