import axios from 'axios'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { MultiSelect } from 'primereact/multiselect'
import { Timeline } from 'primereact/timeline'
import React, { FunctionComponent, useState } from 'react'
import getFullUrl from '../../../configs/axios-custom'
import GrowlContext from '../../../configs/growlContext'
import ThemeContext from '../../../configs/theme'
import { Disciplines, Industries,SPECIALIZATION,ANZSIC_Subdivision,
    ANZSIC_Group,ANZSIC_Class, FIELDS } from '../../../Services/dropDowns'
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
import { Dropdown } from 'primereact/dropdown'
import { groupBy } from 'lodash'
import {Buffer} from 'buffer';
import { UserDto } from '../../../types'
import { Divider } from 'primereact/divider'


const TagButtons = styled.div`
  border-radius: var(--br-5xl);
  background-color: var(--color-steelblue);
  height: 32px;
  display: flex;
  flex-direction: row;
  padding: var(--padding-9xs) var(--padding-xs);
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  /* width:100px; */
  font-family:var(--title);
  margin-top:15px;
`;

const Main =  styled.div`
    display:flex;
    flex-direction:column;
    flex-wrap:wrap;
    gap:50px;
`
const CustomRows = styled.div`
    display:flex;
    flex-direction:row;
    gap:20px;
    width:100%;
    justify-content:space-between;
    .inputs{
        align-self: stretch;
        border-radius: var(--br-9xs);
        background-color: var(--surface);
        border: 1px solid var(--line);
        display: flex;
        flex-direction: row;
        padding: var(--padding-xs) var(--padding-base);
        -webkit-box-align: start;
        align-items: start;
        -webkit-box-pack: start;
        justify-content: flex-start;
        text-align: start;
        font-size: var(--body-03-default-size);
        width: 25rem;
        height: 33px;
        font-family: "Plus Jakarta Sans";
    }

    .drop-downs{
    width: 25rem;
    background-color: var(--surface);
    border-radius: var(--br-9xs);
    text-align: start;
    font-size: var(--body-03-default-size);
    font-family: 'Plus Jakarta Sans';
    span{
      
    }
  }
  .text-area{
    border-radius: var(--br-9xs);
    background-color: var(--surface);
    border: 1px solid var(--line);
    font-family: "Plus Jakarta Sans";
    font-size: var(--body-03-default-size);
    line-height:25px;
  }
`

const ProfileImageContainer = styled.div`
    display:flex;
    flex-direction:row;
    gap:20px;
    width:100%;
    justify-content:center;
    margin-top:15px;
    background-color:#80808014;
    padding:15px;
    border-radius:14px;
`
const All = styled.div`
  position: relative;
  line-height: 16px;
  font-weight: 500;
  color:white;
  font-size:0.75rem;
  margin:auto;
`


interface ExperienceDto  {
    title:string,
    desc:string,
    org:string,
    start: string
    end :string
    nature:string,
    location:string
}
interface IGroupByTypes {
    root: Array<ExperienceDto>
}
type selectedTypes = {
    code:number,
    label:string,
    value:number
}
type selectedSpecialization = {
    value:string | number,
    label:string,
}

const defaultUserSettings:UserDto={
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    profileImage: "",
    backgroundImage: [],
    organization: "",
    biodata: "",
    industry: '',
    discipline: '',
    field: "",
    country: "", address: "",
    dateOfBirth: new Date(),
    phone: '',
    experiences: [],
    academics: []
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

interface City {
    name: string;
    code: string;
}
const Chip: FunctionComponent<ChipProps> = ({label, onIconClick}) => {

    const style = useStyle();

    return (
        <div style={style.chip}>
            <span>{label}</span> &nbsp; <i style={style.icon} className="pi pi-times" onClick={onIconClick} />
        </div>
    );
};
type specializationDtos = {
    code:string,label:string
}
const defaultSpecialization:specializationDtos = {
    code:"ACADEMICS", label:"ACADEMICS"
}
export const UserInformation = (props:any) => {
    const theme = React.useContext(ThemeContext);
    const styles = useGridStyles()
    const [data,setData] = React.useState<UserDto>(defaultUserSettings)
    const growl = React.useContext(GrowlContext)
    const [showDialog,setShowDialog] = React.useState(false)

    const [discipline,setDiscipline] =  React.useState(Array<selectedTypes>());
    const [industry,setIndustry] =  React.useState(Array<selectedTypes>());
    const [field,setFields]  = React.useState(Array<selectedTypes>());
    const [indOptions,setIndOptions] =  React.useState(Array<selectedTypes>());
    const [FilteredOptions,setFilteredOptions] =  React.useState(Array<selectedTypes>());

    const[fieldValues,setUserFields] = React.useState<UserDto>(defaultUserSettings);
    // profile image
    const [img, setImg] = React.useState({ preview: "", raw: "" });
    const [isLoading,setIsLoading] = React.useState(false)
    const [ButtonText,setButtonText] = React.useState("Upload")
    const [orgBase64String,setorgBase64String] = React.useState("");
    const [spe,setSpe] = React.useState('');
    const [userSpecialization,setuserSpecialization] =  React.useState<specializationDtos>(defaultSpecialization);

    // industries 
    const [anzsicsubdivision,setAnzsicsubdivision] =  React.useState(Array<selectedSpecialization>());
    const [anzsicgroup,setAnzsicgroup] =  React.useState(Array<selectedSpecialization>());
    const [anzsicclass,setAnzsicclass] =  React.useState(Array<selectedSpecialization>());

    const [anzsicgroupOptions,setAnzsicgroupOptions] = React.useState<Array<selectedSpecialization>>();

    const [anzsicclassOptions,setAnzsicclassOptions] = React.useState<Array<selectedSpecialization>>();

    // interests
    const [userInterests,setuserInterests] =  React.useState(Array<selectedSpecialization>());
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
            
            setData(data)
            setUserFields(data);
        }).catch(()=>{
            growl.current.show({
                severity:"error",
                summary:"error loading"
            })
        })
    }

    //  load user information
    React.useEffect(()=>{
      loadUserData()
      axios
        .get(
          getFullUrl(`/api/auth/logo/${props.id}`))
        .then((r) => {
            let base64ToString = ''
        //   let base64ToString =new Buffer() Buffer.from(r.data, "base64").toString()
          if (typeof Buffer.from === "function") {
            // Node 5.10+
           base64ToString = Buffer.from(r.data, 'base64').toString(); // Ta-da
            } else {
            // older Node versions, now deprecated
            base64ToString = new Buffer(r.data, 'base64').toString(); // Ta-da
            }
          setorgBase64String(base64ToString)

        })
        .catch((e) => {
          console.error(e);
          if (growl.current) {
            growl.current.show({
              severity: "error",
              summary: "Unable to load data",
            });
          }
        });
    },[])


    React.useEffect(()=>{
        const i = Industries.filter((sa)=>{
            return discipline.some((f)=>{
                return f.code == sa.code
            })
        })
        setIndOptions(i)
    },[discipline])


    React.useEffect(()=>{
        const f = FIELDS.filter((sa)=>{
            return industry.some((f:any)=>{
                return f== sa.code
            })
        }) as Array<selectedTypes>
        setFilteredOptions(f)
      },[industry])


    //   industry filteres
    React.useEffect(()=>{
        const group = ANZSIC_Group.filter((sa)=>{
            return anzsicsubdivision.some((f:any)=>{
                return f === sa.value.toString().slice(0,2)
            })
        })
        setAnzsicgroupOptions(group)
    },[anzsicsubdivision])

    React.useEffect(()=>{

        console.log(anzsicgroup)
        const classGroup = ANZSIC_Class.filter((sa)=>{
            return anzsicgroup.some((f:any)=>{
                return f === sa.value.toString().slice(0,3)
            })
        })
        console.log(classGroup)
        setAnzsicclassOptions(classGroup)

    },[anzsicgroup])

    const events = [
        { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
        { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
    ];

    const UpdateUserInformation =()=>{
        const selectedindustry = industry.map((s)=>(s.label))
        const selecteddiscipline= discipline.map((s)=>(s.label))
        const selectedFields = field.map((s)=>(s.label))

        axios.put(getFullUrl(`/api/Auth/edituser/${props.id}`),{
            FirstName: fieldValues.firstName,
            LastName:fieldValues.lastName,
            Organization: fieldValues.organization,
            Biodata:fieldValues.biodata,
            Address: fieldValues.address,
            Discipline: selecteddiscipline.join('|').toString(),
            Industry:selectedindustry.join('|').toString(),
            Country: fieldValues.country,
            field:selectedFields.join('|').toString()

        }).then((res)=>{
            growl.current.show({
                severity:"success",
                summary:"Profile has been edited"
            })
            props.setshowEditwindow(false)
            window.location.reload()
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
    const unSelectedUserSpe = React.useCallback((disciplineToRemove: selectedTypes, selectedCountries: selectedTypes[])=>{
        const x = discipline.filter(
            (d) => d.label !== disciplineToRemove.label
          );
        setDiscipline(x)
    },[])
    const unAnzsicsubdivision = React.useCallback((valueToRemove: selectedSpecialization, selectedValue: selectedSpecialization[])=>{
        const x = anzsicsubdivision.filter(
            (d) => d.value.toString() !== valueToRemove.value
          );
        setAnzsicsubdivision(x)
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
                getFullUrl(`/api/auth/logo/${props.id}`, {
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

    //  user experience 

  

    React.useEffect(()=>{
        axios.get(getFullUrl(`/api/Auth/userexperience/${props.id}`)).then((res)=>{
            
            const d = res.data as Array<ExperienceDto>
            const a = groupBy(d, function(n) {
                return n.org;
              });
            
        }).catch(()=>{
            growl.current.show({
                severity:"error",
                summary:"error loading"
            })
        })
    },[])


    const Academia=()=>{
       return(
       <>
            <div className="input-group-user">
                <label className='input-lable-titles'  htmlFor="orgname" style={{ marginBottom: 8 }}>
                Branch of knowledge<span className='required'>*</span>
                </label>  
            <MultiSelect value={discipline} options={Disciplines} 
                        onChange={(e) => setDiscipline(e.value)} optionLabel="label" maxSelectedLabels={3}
                        placeholder="Select a branch of knowledge" display="chip" filter className='select-inputs' />
             {/* <Select  
                classNamePrefix="Select your discipline"
                isMulti
                name='discipline'
                options={Disciplines}
                className='select-inputs'
                onChange = {(x:any)=> setDiscipline(x)}
                /> */}
           </div>
            <div className="input-group-user">
                <label className='input-lable-titles'  htmlFor="orgname" 
                style={{ marginBottom: 8 }}>
                    Sub  knowledge<span className='required'>*</span>
                </label> 
                <MultiSelect value={industry} onChange={(e) => setIndustry(e.value)} options={indOptions} display="chip" optionLabel="label" 
                placeholder="Select Cities" maxSelectedLabels={3} className='select-inputs' /> 
                {/* <Select  
                    classNamePrefix="Select your industry"
                    isMulti
                    name='industry'
                    options={indOptions}
                    className='select-inputs'
                    onChange = {(x:any)=> setIndustry(x)}
                    />  */}
            </div>
            <div className="input-group-user">
                <label className='input-lable-titles'  htmlFor="orgname" 
                style={{ marginBottom: 8 }}>
                    Field of activity<span className='required'>*</span>
                </label>  

                <MultiSelect value={field}
                 onChange={(e) => setFields(e.value)} options={FilteredOptions} display="chip" optionLabel="label" 
                placeholder="Select Cities" maxSelectedLabels={3} className='select-inputs' /> 

                    {/* <Select  
                    classNamePrefix="Select your industry"
                    isMulti
                    name='industry'
                    options={indOptions}
                    className='select-inputs'
                    onChange = {(x:any)=> setIndustry(x)}
                    /> */}
            </div>

        </>
    )
    }

    const IndustruGroup =()=>{
        return (
            <>
            <div className="input-group-user">
            <label className='input-lable-titles'  htmlFor="orgname" 
            style={{ marginBottom: 8 }}>
                Subdivision<span className='required'>*</span>
            </label>  

                <MultiSelect value={anzsicsubdivision}
                 onChange={(e) => setAnzsicsubdivision(e.value)} options={ANZSIC_Subdivision} display="chip" optionLabel="label" 
                placeholder="Select  Subdivision" maxSelectedLabels={3} className='select-inputs' /> 
               
        </div>
        <div className="input-group-user">
            <label className='input-lable-titles'  htmlFor="orgname" 
            style={{ marginBottom: 8 }}>
                Group<span className='required'>*</span>
            </label>  

            <MultiSelect value={anzsicgroup}
                 onChange={(e) => setAnzsicgroup(e.value)} options={anzsicgroupOptions} display="chip" optionLabel="label" 
                placeholder="Select sub class" maxSelectedLabels={3} className='select-inputs' /> 

                {/* <Select  
                classNamePrefix="Select your  ANZSIC group"
                isMulti
                name='ANZSIC Group'
                options={anzsicgroupOptions}
                className='select-inputs'
                onChange = {(x:any)=> setAnzsicgroupOptions(x)}
            /> */}
        </div>
        <div className="input-group-user">
            <label className='input-lable-titles'  htmlFor="orgname" 
            style={{ marginBottom: 8 }}>
                Class<span className='required'>*</span>
            </label>  
            <MultiSelect value={anzsicclass}
                 onChange={(e) => setAnzsicclass(e.value)} options={anzsicclassOptions} display="chip" optionLabel="label" 
                placeholder="Select sub class" maxSelectedLabels={3} className='select-inputs' />  
              
        </div>
        </>
        )
    }
  return (
     <Main>
        <div>
            <ProfileImageContainer>
                    <div className="profile-image-container">
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
            </ProfileImageContainer>
            <Divider />
                <CustomRows>
                        <div className="input-group">
                            <div style={{marginRight:"5px"}}>
                                <label className='input-lable-titles'  htmlFor="firstname" style={{ marginBottom: 8 }}>
                                    First name<span className='required'>*</span>
                                </label>
                                <InputText value={fieldValues.firstName} className="inputs"
                                placeholder="first name"  onChange={(e)=>{onvalueChange("firstName",e.currentTarget.value)}}  
                                />
                            </div>
                            <div className="input-group-user">
                                <label className='input-lable-titles'  htmlFor="lastname" style={{ marginBottom: 8 }}>
                                Other Names<span className='required'>*</span>
                                </label>
                                <InputText value={fieldValues.lastName} className="inputs"
                                placeholder="last name"    onChange={(e)=> onvalueChange('lastName', e.currentTarget.value)}
                                />
                            </div>
                        </div>
               </CustomRows>
                <CustomRows>
                    <div className="input-group-user">
                        <label className='input-lable-titles'  htmlFor="email" style={{ marginBottom: 8 }}>
                            Email<span className='required'>*</span>
                        </label>
                        <InputText  value={fieldValues.email} className="inputs"
                        placeholder="email"
                        />
                    </div>
                    <div className="input-group-user">
                        <label className='input-lable-titles'  htmlFor="phone" style={{ marginBottom: 8 }}>
                            Phone<span className='required'>*</span>
                        </label>
                        <InputText  value={fieldValues.phone} className="inputs"
                        placeholder="Phone number" onChange={(e)=> onvalueChange('phone', e.currentTarget.value)}
                        />
                    </div>
                
                </CustomRows>  
                <CustomRows>
                    <div className="input-group-user">
                        <label className='input-lable-titles'  htmlFor="orgname" style={{ marginBottom: 8 }}>
                            Domain<span className='required'>*</span>
                        </label>
                        <Dropdown value={userSpecialization} options={SPECIALIZATION}  optionLabel = "label" className='drop-downs'
                            onChange={(e) => setuserSpecialization(e.value)} placeholder="Select your specialization"/>
                    </div>
               
        
                    <div className="input-group-user">
                        <label className='input-lable-titles'  htmlFor="dob" style={{ marginBottom: 8 }}>
                            Date of Birth<span className='required'>*</span>
                        </label>
                        <Calendar className='drop-downs'
                        id="date" name="date" value={fieldValues.dateOfBirth}  
                        onChange={(e)=>onvalueChange("dateOfBirth",e.value)}
                        dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />         
                    </div>
                </CustomRows>   
                <CustomRows>
                    <div className="input-group-user">
                        <label className='input-lable-titles'  htmlFor="bio" style={{ marginBottom: 8 }}>
                            Bio<span className='required'>*</span>
                        </label>
                        <InputTextarea value={fieldValues.biodata} rows={3} cols={45}
                        placeholder="bio"   className='text-area'  
                        onChange={(e)=> onvalueChange('biodata', e.currentTarget.value)}
                        />
                    </div>
                    <div className="input-group-user">
                        <label className='input-lable-titles'  htmlFor="address" style={{ marginBottom: 8 }}>
                            Address<span className='required'>*</span>
                        </label>
                        <InputTextarea value={fieldValues.address} rows={3} cols={45}
                        placeholder="address"   className='text-area'  onChange={(e)=> onvalueChange('address', e.currentTarget.value)}
                        />
                    </div>
                    
                </CustomRows>   
                          
                 <div>
                  {userSpecialization?.label === "CROSS CUTTING" &&(
                    <>
                     <Divider align="center">
                        <span className="p-tag">Academia</span>
                    </Divider> 
                     <Academia /> 
                     <Divider align="center">
                        <span className="p-tag">industry fields</span>
                    </Divider>
                     <IndustruGroup />
                    </>
                  )}
                   {userSpecialization?.label === "INDUSTRY" ? 
                   <IndustruGroup />: null}
                    {userSpecialization?.label === "ACADEMIA"  &&(
                        <Academia /> 
                    )
                    }
                     <Divider align="center">
                        <span className="p-tag">Your interest</span>
                    </Divider>  
                    <div className="input-group-user">
                        <label className='input-lable-titles'  htmlFor="orgname" style={{ marginBottom: 8 }}>
                            Interest<span className='required'>*</span>
                        </label>
                        <MultiSelect value={userInterests}
                            onChange={(e) => setuserInterests(e.value)} options={SPECIALIZATION} display="chip" optionLabel="label" 
                            placeholder="Select your insterest" maxSelectedLabels={1} multiple className='select-inputs' /> 
                    </div>
                     <TagButtons onClick={UpdateUserInformation}>
                        <All>Save changes</All>
                     </TagButtons>               
                  
            </div>
         </div> 
         
        <div>
            <CustomRows>
               
            <div className="field">
                <span className="p-float-label">
                    <InputText id="name" name="name" value={""} className="inputs"  />
                    <label htmlFor="name" >Old password*</label>
                </span>
            </div>
            <div className="field">
                <span className="p-float-label">
                    <InputText id="name" name="name" value={""} className="inputs" />
                    <label htmlFor="name" >New Password*</label>
                </span>
            </div>
                
            </CustomRows>
            <CustomRows>
                <div className="field" style={{marginTop:"20px"}}>
                    <span className="p-float-label">
                        <InputText id="name" name="name" value={""} className="inputs"  />
                        <label htmlFor="name" >Repeat Password*</label>
                    </span>
                </div>
                    <TagButtons onClick={UpdateUserInformation}>
                        <All>Reset password</All>
                     </TagButtons> 
            </CustomRows>
        </div>
     </Main>
  )
}
