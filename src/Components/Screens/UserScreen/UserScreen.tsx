import React from 'react'
import { Button } from 'primereact/button'
import ThemeContext from '../../../configs/theme'
import { InputText } from 'primereact/inputtext'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog';
import './userscreen.css'
import { useFormik } from 'formik'
import axios from 'axios'
import getFullUrl from '../../../configs/axios-custom'
import { useGridStyles } from '../../../Hooks/GridStyles'
import { rowsPerPageOptionsStandard } from '../../../configs/constants'
import { OverlayPanel } from 'primereact/overlaypanel';
import { TabPanel, TabView } from "primereact/tabview";
import { UserInformation } from './UserInformation'
import Project, { defaultSettings, ProjectDto } from '../Projects/Fragments/Project'
import { Badge } from 'primereact/badge'
import Interest from '../Projects/Fragments/Interest'
import styled from 'styled-components'
import { Academics, Experience, UserDto } from '../../../types'
import { formatDateString } from '../../../Services/Helpers'
import { Divider } from 'primereact/divider'
import ExperienceComponent, { ExperienceDto } from './Experience'
import Education from './Education'


const DashboardPersonalizedRoot = styled.div`
  position: relative;
  background-color: #ffffff;
  width: 100%;
  height: auto;
  overflow: hidden;
  text-align: left;
  font-size: var(--button-size);
  color: var(--color-steelblue);
  font-family: var( --title);
  display:flex;
  flex-direction:row;
  border-radius: var(--br-5xs);
  margin: 1rem;
`;

const Content = styled.div`
  border-radius: var(--br-5xs);
  background-color: var(--white);
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: var(--heading-07-size);
  @media (max-width: 768px){
      flex-direction:column;
      margin:1rem;
      width:20rem;
  }
`;
const Form = styled.div`
  align-self: stretch;
  border-radius: 0px 0px var(--br-5xs) var(--br-5xs);
  /* border-top: 1px solid var(--line); */
  box-sizing: border-box;
  height:auto;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2rem;
  background: white;
  @media (max-width: 768px) {
      padding:0.5rem;
  }
`;
const Infomation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-xs);
  color: var(--on-surface);
  font-family: var(--title);

`;
const Personalized = styled.div`
  position: relative;
  line-height: 1.75rem;
  text-transform: capitalize;
  font-weight: 500;
  @media (max-width: 768px) {
      text-align:center;
  }
`;
const Name11 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
const InformationAndComputing = styled.div`
  position: relative;
  line-height: 1rem;
  font-weight: 500;
  font-size:0.75rem
`;
const Tag = styled.div`
  border-radius: var(--br-5xl);
  background-color: var(--surface);
  height: 2rem;
  display: flex;
  flex-direction: row;
  padding: var(--padding-9xs) var(--padding-xs);
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`;
const Tags = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-5xs);

  @media (max-width: 768px) {
    flex-wrap:wrap;
  }
`;
const TagLocationsalary = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: var(--sub-heading-size);
`;
const Ventures1 = styled.b`
  position: relative;
  line-height: 1.63rem;
  text-transform: capitalize;
  font-family: Plus Jakarta Sans;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.25rem; /* 166.667% */
    letter-spacing: 0.075rem;
    text-transform: uppercase;
    color:white;
`;
const Tag2 = styled.div`
  border-bottom: 2px solid var(--color-steelblue);
  display: flex;
  flex-direction: row;
  padding: var(--padding-5xs) 0rem;
  align-items: center;
  justify-content: center;
`;
const Category = styled.div`
    border-bottom: 1px solid var(--line);
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    -webkit-box-pack: start;
    justify-content: flex-start;
    font-size: 1rem;
    font-family: 'Plus Jakarta Sans';
    font-style: normal;
    font-weight: 700;
    line-height: 1.625rem;
    text-transform: capitalize;
`;
const AboutMe1 = styled.b`
  align-self: stretch;
  position: relative;
  font-size: var(--heading-07-size);
  line-height: 1.75rem;
  /* text-transform: capitalize; */
  color: var(--color-steelblue);
  z-index: 0;
  @media (max-width: 768px) {
      font-size:0.85rem;
  }
`;
const Text1 = styled.div`
  align-self: stretch;
  position: relative;
  line-height: 1.63rem;
  z-index: 1;
  text-transform:none;
  font-size:1rem;
  line-height:1.625rem;
  @media (max-width: 768px) {
    font-size:0.8rem;
  }
`;
const AboutMe = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  gap: var(--gap-base);
  font-size: var(--heading-07-size);
  color: var(--secondary);
`;
const Title = styled.b`
  align-self: stretch;
  position: relative;
  line-height: 1.75rem;
  text-transform: capitalize;
  z-index: 0;
   font-size: var(--heading-07-size);
   @media (max-width: 768px) {
      font-size:0.85rem;
      i{
        font-size:0.6rem
      }
  }
`;
const FptUniversity = styled.b`
  position: relative;
  line-height: 1.5rem;
  @media (max-width: 768px) {
      font-size:0.7rem;
  }
`;
const Year = styled.div`
  position: relative;
  font-size: var(--sub-heading-size);
  line-height: 1rem;
  font-weight: 500;
  @media (max-width: 768px) {
      font-size:0.7rem;
  }
`;
const Heading1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-base);
  
`;
const Titles = styled.div`
  position: relative;
  font-size: var(--button-size);
  line-height: 1.63rem;
  text-transform: capitalize;
  color:var(--secondary);
`;
const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-9xs);
  i{
    cursor: pointer;
    padding:5px;
    background:var(--color-steelblue);
    border-radius:50%;
    color:white;
    margin:auto;
  }
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
const Content1 = styled.div`
  align-self: stretch;
  border-left: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-13xl);
  z-index: 2;
  font-size: var(--button-small-size);
  color: var(--on-surface);
`;
const EducationContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  gap: var(--gap-base);
  font-size:13px;
`;
const Heading4 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-base);
  font-size: var(--button-small-size);
  i{
    cursor: pointer;
    padding:5px;
    background:var(--color-steelblue);
    border-radius:50%;
    color:white;
  }
  @media (max-width: 768px) {
      flex-wrap:wrap;
  }
`;
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


const Location1 = styled.div`
  position: relative;
  line-height: 1.63rem;
`;
const HanoiCityVietnam = styled.div`
  flex: 1;
  position: relative;
  line-height: 1.75rem;
  text-transform: capitalize;
  font-weight: 400;
  color: var(--on-surface);
  text-align: right;
`;
const CouponApply = styled.div`
  border-bottom: 1px solid var(--line);
  box-sizing: border-box;
  width: 25.06rem;
  display: flex;
  flex-direction: row;
  padding: 0rem 0rem var(--padding-base);
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-11xl);
  @media (max-width: 768px) {
    width: 20rem;
    gap: 2px;
    font-size:0.75rem;
  }
`;
const EnglishVietnamese = styled.div`
  position: relative;
  line-height: 1.75rem;
  text-transform: capitalize;
  font-weight: 500;
  color: var(--on-surface);
  text-align: right;
`;
const Language = styled.div`
  border-bottom: 1px solid var(--line);
  box-sizing: border-box;
  width: 25.06rem;
  display: flex;
  flex-direction: row;
  padding: 0rem 0rem var(--padding-base);
  align-items: flex-start;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: 20rem;
    font-size:0.75rem;
  }
`;
const Hiavitexgmailcom = styled.div`
  flex: 1;
  position: relative;
  line-height: 1.75rem;
  font-weight: 500;
  color: var(--on-surface);
  text-align: right;
  text-transform:none;
`;
const CouponApplyParent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-base);
  font-size:1rem;
`;
const Infomation1 = styled.div`
  border-radius: var(--br-5xs);
  background-color: var(--surface);
  box-shadow: var(--drop-small);
  width: 28.06rem;
  display: flex;
  flex-direction: column;
  padding: var(--padding-5xl);
  box-sizing: border-box;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-13xl);
  color: var(--secondary);
  margin-top: 1rem;
  margin-right: 1rem;
  @media (max-width: 768px) {
    width: 21.06rem;
  }
`;
const TagsWrapper = styled.div`
    width: 100%;
    margin-top: 1rem;
    margin-bottom:1rem;
    margin-left:1rem;
`
const TagsParent = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  /* margin-left:12px; */
`
const All = styled.div`
  position: relative;
  line-height: 16px;
  font-weight: 500;
  color:white;
  font-size:0.75rem
`;
const Main = styled.div`
  display:flex;
  flex-direction:column;
`
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
`;
const TableHeaderContainer = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  font-family:var('--title');
  button{
    background-color: rgb(245 245 245);
    color: rgb(34, 118, 153);
    border-radius: 26.5px;
    box-shadow: none;
    margin: 10px;
    height: 40px;
    padding: 10px;
    border: none;
    left: 0px;
    font-family: var(--title);
    font-size:14px;
    font-weight:500;

  }

  input{
    background-color: rgb(245 245 245);
    border-radius: 24px;
    font-family: var(--title);
    color: rgb(0, 0, 0);
    max-width: 200px;
    height: 2.2rem;
  }

`
const EditInnerContainer =  styled.div`
  display:flex;
  flex-direction:row;
  gap:20px;
  .action-button{
    display: flex;
    justify-content: center;
    
  }
    i{
    cursor: pointer;
    padding:4px;
    background:var(--color-steelblue);
    border-radius:50%;
    color:white;
    margin:auto;
    @media (max-width: 768px) {
      .action-button >i{
         font-size:0.6rem;
           padding:4px;
      }
      i{
          font-size:0.6rem;
           padding:4px;
      }
    }
  }
`

interface UserScreenProps {
  user:UserDto
}
const  UserScreen: React.FunctionComponent<UserScreenProps> = ({user})=> {
    const styles = useGridStyles();
    const [myProjectsData,setMyProjectsData] = React.useState<Array<ProjectDto>>();
    const [keyword,setKeyword] = React.useState('');
    const [totalRecords,setTotalrecords] =  React.useState(0);
    const [rowsPerpage ,setRowsPerpage] = React.useState(20);
    const [first,setFirst] = React.useState(0);
    const [sortedExperience,setSortedExperience] =  React.useState<Experience[]>();
    const [sortedAcademics,setSortedAcademics] =  React.useState<Academics[]>();
    const [showEditwindow,setshowEditwindow] =  React.useState(false)
    const [experience,setexperience] =  React.useState(false)
    const [education,setEducation] =  React.useState(false)
    const  [userinfo,setUserInfo] =  React.useState(false);
    const [headerText,setHeadertext] = React.useState("")

    const userToken = window.localStorage.getItem("refreshToken")
    const {id} = JSON.parse(userToken!)
    // side bar 
    const pl = React.useRef<OverlayPanel>(null);

    // row data 

    const [rowData, setRowData] = React.useState<ProjectDto>(defaultSettings)
    const [editMode,setEditMode] = React.useState(false);


    const [total,setTotals] = React.useState(0);

    const formik = useFormik({
        initialValues: {
            Name:'',
            Acronym:'',
            Desc:'',
            Industry:'',
            Category:'',
            Fields:'' ,
            GroupDesc:'',
            StartDate:'',
            EndDate:'',
            Partners:'',
            Sponsors:'',
            Lat:'',
            Longitude:0,
            Budget:0,
            Country: ''
        },
       
        onSubmit: () => {
            // setFormData(data);
            // setShowMessage(true);
            formik.resetForm();
        }
    });


    const queryProjectData = ()=>{
        axios.get(getFullUrl(`/api/projects/orgprojects/${id}`)).then((res)=>{
            setTotalrecords(res.data.length)
            setMyProjectsData(res.data)
        }).catch(()=>{
            console.log("error")
        })
    }
    React.useEffect(()=>{
        queryProjectData();
    },[])

  const  [isUserProfile,setIsuserProfile]   = React.useState(true);

  const switchProfile = (type:"profile"| "ventures") =>{
    switch (type) {
      case "profile":
        setIsuserProfile(true)
        break;
      case "ventures":
        setIsuserProfile(!isUserProfile)
        break;

      default:
        break;
    }
  }

  const RendereEdits = (type:"userinfo"| "education" | "experience") =>{
    switch (type) {
      case "userinfo":
        setHeadertext("User profile")
        setshowEditwindow(true)
        setUserInfo(true)
        setexperience(false)
        setEducation(false)
        break;
      case "education":
        setHeadertext("Academic background")
        setshowEditwindow(true)
        setUserInfo(false)
        setEducation(true)
        setexperience(false)
        seteditEducation(false)
        break;
      case "experience":
        setHeadertext("Industry experience")
        setshowEditwindow(true)
        setUserInfo(false)
        setEducation(false)
        setexperience(true)
        seeditUserExp(false)
        break;
      default:
        break;
    }
  }

  const tableHeader = (
    <TableHeaderContainer >
          <div className="search-bar">
            <InputText
              type="search"
              /* style={{ ...styles.keywordSearch }} */
              value={keyword}
              onInput={(e: any) => setKeyword(e.target.value)}
              placeholder="Search"
            />
          </div>
        <div>
            <Button className='button-class' onClick={(e:React.SyntheticEvent<Element,Event>)=> pl.current?.toggle(e)}>+ Add New Project</Button>
        </div>
    </TableHeaderContainer>
   )
   const headerTemplate = (
    <i className="pi pi-bell mr-4 p-text-secondary p-overlay-badge" style={{ fontSize: '1.2rem' }}><Badge value={total} ></Badge></i>
   ) 
   const tableFooter = "Showing {first} to {last} of {totalRecords} entries";
   const paginatorTemplate ="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown";

   const getInterest = ()=>{
        // setTotals(i);
  }

  const onHide = ()=>{
     setRowData(defaultSettings)
     setEditMode(false)
   }

  React.useEffect(()=>{

    if(!user){
      return
    }
    console.log(user)
    const sortedExperiences = user.experiences.sort((a, b) => {
      const dateA = a.end === "Present" ? new Date().getTime() : new Date(a.end).getTime();
      const dateB = b.end === "Present" ? new Date().getTime() : new Date(b.end).getTime();
        return dateB - dateA;
    });
    const sortedAcademics = user.academics.sort((a, b) => {
      const dateA = a.end === "Present" ? new Date().getTime() : new Date(a.end).getTime();
      const dateB = b.end === "Present" ? new Date().getTime() : new Date(b.end).getTime();
        return dateB - dateA;
    });
    setSortedAcademics(sortedAcademics)
    setSortedExperience(sortedExperiences)
  },[user])



  /*  experience */
  const [userExperience,setUserExperience] =  React.useState<ExperienceDto>()
  const [editUserExp,seeditUserExp] =  React.useState(false)
  /* education */
  const [userEducation,setuserEducation] =  React.useState<Academics>()
  const [editEducation,seteditEducation] =  React.useState(false)

  const handleEditExperience = (r:any)=>{
    setUserExperience(r)
    seeditUserExp(true)
    setshowEditwindow(true)
    setexperience(true)
    setHeadertext("Edit experience")
  }

  const  handleEditEducation = (r:any)=>{
    setHeadertext("Edit education")
    seteditEducation(true)
    setshowEditwindow(true)
    setexperience(false)
    setEducation(true)
    setuserEducation(r)
  }
  return (
    <React.Fragment>
    <Dialog header={headerText} visible={showEditwindow} onHide={()=> setshowEditwindow(false)} style={{width:"60vw"}}>
      {userinfo && (<UserInformation id ={user.id} setshowEditwindow={setshowEditwindow} />)} 
      {experience && ( <ExperienceComponent editMode={editUserExp} data={userExperience} setshowEditwindow={setshowEditwindow}/>)}
      {education && ( <Education setshowEditwindow={setshowEditwindow} editMode={editEducation} userId={id} data={userEducation}  />)}
    </Dialog>
    <Main>
      <TagsWrapper>
        <TagsParent>
          <Tags>
            <TagButtons onClick={()=>switchProfile("profile")}>
              <All>Profile</All>
            </TagButtons>
            <TagButtons onClick={()=>switchProfile("ventures")}>
              <All>My projects</All>
            </TagButtons>
          </Tags>
       
        </TagsParent>
      </TagsWrapper>

    {isUserProfile ?  <DashboardPersonalizedRoot> <Content>
    <Form>
      <Infomation>
        <Name11>
          <Personalized>Branch of Knowledge</Personalized>
        </Name11>
        <TagLocationsalary>
          <Tags>
          {user && (<>
              {
                user?.discipline?.split('|').map((r,i)=>  
              <Tag key={i}>
                <InformationAndComputing>
                  {r}
                </InformationAndComputing>
             </Tag>)
              }
            
            </>)}
          </Tags>
        </TagLocationsalary>
      </Infomation>
      <Category>
        <Tag2>
          <Ventures1 style={{color:"#227699"}}>Resume</Ventures1>
        </Tag2>
      </Category>
      <AboutMe>
              <EditInnerContainer style={{display:"flex"}}>
               <AboutMe1>About me</AboutMe1>
              
               <i onClick={()=> RendereEdits("userinfo")} className="pi pi-pencil" style={{ fontSize: '0.9rem' }}></i>

              </EditInnerContainer>
        <Text1>
            {user ? user.biodata : ""}
        </Text1>
      </AboutMe>
      <EducationContainer>
        <EditInnerContainer>
          <Title>Education</Title>
          <i onClick={()=> RendereEdits("education")} className="pi pi-plus" style={{ fontSize: '0.6rem' }}></i>
        </EditInnerContainer>
        {sortedAcademics && sortedAcademics.map((r,i)=><Content1>
          <Content2 key={i}>
            <Heading>
              <Heading1>
                <FptUniversity>{r.institution}</FptUniversity>
                <Year>{formatDateString(r.start.toString())} - {formatDateString(r.end.toString())}</Year>
                <i onClick={()=>handleEditEducation(r)} className="pi pi-pencil" style={{ fontSize: '0.75rem' }}></i>
              </Heading1>
              <Titles>{r.course}</Titles>
             
            </Heading>
          </Content2>
        </Content1>
        )}      
      </EducationContainer>
      <EducationContainer>
        <EditInnerContainer>
          <Title>Experience</Title>
          <div className="actions-button">
            <i onClick={()=> RendereEdits("experience")} className="pi pi-plus" style={{ fontSize: '0.9rem' }}></i>
          </div>
        </EditInnerContainer>
      
              {sortedExperience && sortedExperience.map((r,i)=>
                <Content4 key={i}>
                  <Content2>
                    <Heading4>
                      <FptUniversity>{r.org}</FptUniversity>
                      <Year>{formatDateString(r.start.toString())} - {formatDateString(r.end.toString())}</Year>
                     
                      <Year>{r.location}</Year>
                     |
                      <Year>{r.nature}</Year>
                     |
                      <i onClick={()=>handleEditExperience(r)} className="pi pi-pencil" style={{ fontSize: '0.9rem' }}></i>
                    </Heading4>
                    <Titles>{r.title}</Titles>
                    <Text1>
                      {r.roleDesc}
                    </Text1>
                  </Content2>
                </Content4>
            )}
              
      </EducationContainer>
    </Form>
    <Infomation1>
    <CouponApplyParent>
      <CouponApply>
        <Location1>Location</Location1>
        <HanoiCityVietnam>{user ? user.address : ""}</HanoiCityVietnam>
      </CouponApply>
      <Language>
        <Location1>Name:</Location1>
        {user?.firstName  || user?.firstName && (<EnglishVietnamese>{user ? user.firstName + " " + user.lastName : ""}</EnglishVietnamese>)}
      </Language>
      <CouponApply>
        <Location1>Email</Location1>
        <Hiavitexgmailcom>{user ? user.email: ""}</Hiavitexgmailcom>
      </CouponApply>
     
    </CouponApplyParent>
    </Infomation1>
    </Content> 
    </DashboardPersonalizedRoot>:
    <>
    {myProjectsData &&(
      <div style={{display:"inline-bloc" , width:"100%",marginLeft:"1rem"}}>
          <div className="overlay-window">
              <OverlayPanel ref={pl} id='overlay-panel' onHide={onHide}>
              <div style={{width:"360px",height:"107vh",overflow:"auto"}}>
                 
                  <TabView>
                      <TabPanel header='Details'>
                          <div className="project-view-container">
                          <Project ID={id} rowData={rowData} toggleEditing={editMode} />
                          </div>
                      </TabPanel>
                      {editMode &&(
                            <TabPanel header={headerTemplate}>
                                <Interest getInterest={getInterest} id={rowData.id} />   
                            </TabPanel>
                      )}
                  </TabView>    
              </div>
              </OverlayPanel>
          </div>
        
          <DataTable
                  value={myProjectsData}
                  responsiveLayout="scroll" 
                  className='tablestyle'
                  onPage={queryProjectData}
                  header={tableHeader}
                  globalFilter={keyword}
                  totalRecords = {totalRecords}
                  rows={rowsPerpage}
                  paginator = {true}
      
                  first={first}  
                  paginatorTemplate = {paginatorTemplate}
                  currentPageReportTemplate = {tableFooter}
                  rowsPerPageOptions = {rowsPerPageOptionsStandard}
                  >
                  <Column field="name" header="Name" 
                      headerStyle={styles.headerStyle(200)} style={styles.columnStyle(200)}/>
                  <Column field="budget" header="Category" headerStyle={styles.headerStyle(200)} />
                  <Column field="startDate" header="startDate" headerStyle={styles.headerStyle(200)}  style={styles.columnStyle(200)}/>
                  <Column field="industry" header="industry" headerStyle={styles.headerStyle(200)}  style={styles.columnStyle(200)}/>
                  
                  <Column field='category' header = 'Discipline' 
                      headerStyle={styles.headerStyle(200)}  style={styles.columnStyle(200)}/>
                  <Column field="quantity" header="Admin actions"  
                      headerStyle={styles.headerStyle(200)}
                      style={styles.columnStyle(200)}
                      body={(row:ProjectDto)=>(
                      <div>
                          <button className='admin-actions' onClick={(e)=> {
                              setRowData(row)
                              setEditMode(true)
                              axios.get(getFullUrl(`/api/Projects/interests/nortifications/${row.id}`)).then((res)=>{
                                  setTotals(res.data.length)
                                }).catch(()=>{
                                  console.log('error could not load interest')
                                })
                              pl.current?.toggle(e)
                              
                          }}>View</button>
                          <button className='admin-actions'>Delete</button>
                      </div>
                      )}  
                  />
                      
      </DataTable>      
      </div>
      )}
    </>
  }
  </Main>
</React.Fragment>
  )
}

export default UserScreen;


/* <ContentParent>
      <Content7>
        <SamleCvJobitex>{}</SamleCvJobitex>
        <Titles>PDF</Titles>
      </Content7>
      <Icon4 alt="" src="/assets/iconpdf.svg" />
    </ContentParent>
    <ButtonContainer>
      <Icondownload alt="" src="/assets/icondownload.svg" />
      <Ventures1>Download CV</Ventures1>
    </ButtonContainer>  */