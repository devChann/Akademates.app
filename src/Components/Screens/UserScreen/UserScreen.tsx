import React, { FC } from 'react'
import { Button } from 'primereact/button'
import { Accordion, AccordionTab } from 'primereact/accordion'
import {InputTextarea} from 'primereact/inputtextarea'
import SectionHeader from '../Fragments/SectionHeaders'
import ThemeContext from '../../../configs/theme'
import { InputText } from 'primereact/inputtext'
import { Timeline } from 'primereact/timeline';
import {MultiSelect} from 'primereact/multiselect'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog';
import './userscreen.css'
import Experience from './Experience'
import Education from './Education'
import { useFormik } from 'formik'
import axios from 'axios'
import getFullUrl from '../../../configs/axios-custom'
import { type, UserInfo } from 'os'
import GrowlContext from '../../../configs/growlContext'
import reactSelect from 'react-select'
import { Disciplines, Industries } from '../../../Services/dropDowns'
import { useGridStyles } from '../../../Hooks/GridStyles'
import { rowsPerPageOptionsStandard } from '../../../configs/constants'
import { OverlayPanel } from 'primereact/overlaypanel';
import { TabPanel, TabView } from "primereact/tabview";
import { UserInformation } from './UserInformation'
import Project, { defaultSettings, ProjectDto } from '../Projects/Fragments/Project'
import { Badge } from 'primereact/badge'
import Interest from '../Projects/Fragments/Interest'
export default function UserScreen() {
    const styles = useGridStyles();
   
    const [myProjectsData,setMyProjectsData] = React.useState<Array<ProjectDto>>();
    const  theme = React.useContext(ThemeContext)
    const [showDialog,setShowDialog] = React.useState(false)
    const [keyword,setKeyword] = React.useState('');
    const [totalRecords,setTotalrecords] =  React.useState(0);
    const [rowsPerpage ,setRowsPerpage] = React.useState(20);
    const [isLoading, setIsLoading] = React.useState(false);
    const [first,setFirst] = React.useState(0);
    const userToken = window.localStorage.getItem("refreshToken")
    const {id} = JSON.parse(userToken!)
    // side bar 
    const pl = React.useRef<OverlayPanel>(null);

    // row data 

    const [rowData, setRowData] = React.useState<ProjectDto>(defaultSettings)
    const [editMode,setEditMode] = React.useState(false);
    const[modalTitle,setModalTitles] = React.useState("")

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
    const [myaccount,setMyaccountVisisbility] = React.useState(true)
    const [myprojects,setMyProjectsVisisbility] = React.useState(false)

    const  selectedTab = (type:"MyAccount" | "MyProjects")=>{
        switch (type) {
            case "MyAccount":
                setMyaccountVisisbility(true)
                setMyProjectsVisisbility(false)
                break;
            case "MyProjects":
                setMyProjectsVisisbility(true)
                setMyaccountVisisbility(false)
                break;
            default:
                break;
        }
    }
    const getInterest = (i:any)=>{
        // setTotals(i);
    }
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


   const tableHeader = (
    <div className="grid">
        <div className="col-4">
        <div className="search-bar">
          <InputText
            type="search"
            style={{ ...styles.keywordSearch }}
            value={keyword}
            onInput={(e: any) => setKeyword(e.target.value)}
            placeholder="Search"
          />
        </div>
        </div>
        <div className="col-4"></div>
        <div className="col-4 table-header-button">
            <Button onClick={(e:React.SyntheticEvent<Element,Event>)=> pl.current?.toggle(e)} style={styles.tableHeaderButton}>+ Add New Project</Button>
        </div>
    </div>
   )
   const onHide = ()=>{
     setRowData(defaultSettings)
     setEditMode(false)
   }
   const headerTemplate = (
    <i className="pi pi-bell mr-4 p-text-secondary p-overlay-badge" style={{ fontSize: '1.2rem' }}><Badge value={total} ></Badge></i>
   ) 
   const tableFooter = "Showing {first} to {last} of {totalRecords} entries";
   const paginatorTemplate ="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown";
  return (
    <div>
        {/* <div className="grid">
            <SectionHeader title='Settings' titleStyle={theme.customStyle.headerTitle}
            icontext='pi pi-cog' sectionStyle={theme.customStyle.sectionHeader} />
        </div> */}
        <div className="grid banner-container">
            <div className="col banners">
                <div style={{display:"inline-bloc"}}>
                    <Button onClick={()=>selectedTab("MyAccount")} className='user-button'>My Account</Button>
                    <Button onClick={()=>selectedTab("MyProjects")} className='user-button'>Projects</Button>
                </div>
            </div>
        </div>
        <div className="grid banner-container">
            <div className="col banners">
                {myaccount &&(
                    <UserInformation id = {id}/>
                )}
                {myprojects &&(
                <div style={{display:"inline-bloc" , width:"100%"}}>
                    <div className="overlay-window">
                        <OverlayPanel ref={pl} id='overlay-panel' onHide={onHide}>
                        <div style={{width:"340px",height:"107vh",overflow:"auto"}}>
                            <div className="side-panel-header">
                                <SectionHeader title='New Projects' 
                                icontext='pi pi-stop-circle' titleStyle={theme.customStyle.subHeaderTitle}
                                sectionStyle={theme.customStyle.subHeader}/>
                            </div>
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
                    <SectionHeader title='My Projects' 
                        icontext='pi pi-stop-circle' titleStyle={theme.customStyle.subHeaderTitle}
                        sectionStyle={theme.customStyle.subHeader}/>
                        <div className="card">
                        <DataTable
                            value={myProjectsData}
                            responsiveLayout="scroll" 
                            className='table-class'
                            onPage={queryProjectData}
                            header={tableHeader}
                            globalFilter={keyword}
                            totalRecords = {totalRecords}
                            rows={rowsPerpage}
                            paginator = {true}
                        //   lazy={true}
                            first={first}  
                            paginatorTemplate = {paginatorTemplate}
                            currentPageReportTemplate = {tableFooter}
                            rowsPerPageOptions = {rowsPerPageOptionsStandard}
                        //   scrollable = {true}
                            >
                        
                            {/* <Column 
                                field="acronym"
                                header=value
                                headerStyle={styles.headerStyle(70)}
                                style={styles.columnStyle(30)}
                                /> */}
                            <Column field="name" header="Name" 
                                headerStyle={styles.headerStyle(200)} style={styles.columnStyle(200)}/>
                            <Column field="budget" header="Category" headerStyle={styles.headerStyle(200)} />
                            <Column field="startDate" header="startDate" headerStyle={styles.headerStyle(200)}/>
                            <Column field="industry" header="industry" headerStyle={styles.headerStyle(200)}/>
                            
                            <Column field='category' header = 'Discipline' 
                                headerStyle={styles.headerStyle(200)}/>
                            <Column field="quantity" header="Admin actions"  
                                headerStyle={styles.headerStyle(200)}
                                body={(row:ProjectDto)=>(
                                <div>
                                    <button className='admin-actions' onClick={(e)=> {
                                        setRowData(row)
                                        setEditMode(true)
                                        axios.get(getFullUrl(`/api/Projects/interests/nortifications/${row.id}`)).then((res)=>{
                                            setTotals(res.data.length)
                                          }).catch((msg)=>{
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
                </div>
                )}
               
            </div>
        </div>
    </div>
  )
}
