import React, { FunctionComponent } from 'react'
import { Panel } from 'primereact/panel';
import {Accordion, AccordionTab} from 'primereact/accordion'
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './ProjectsScreen.css'
import ThemeContext from '../../../configs/theme';
import Select from 'react-select';
import { AllCountries } from '../../../Services/countries';
import { Disciplines, Industries } from '../../../Services/dropDowns';
import axios from 'axios';
import getFullUrl from '../../../configs/axios-custom';
import GrowlContext from '../../../configs/growlContext';
import { TabView, TabPanel } from 'primereact/tabview';
import { MapServices, } from '../HomeScreen/Home';
import { Dialog } from 'primereact/dialog';
import { defaultSettings, ProjectDto } from './Fragments/Project';
import SectionHeader from '../Fragments/SectionHeaders';
import { Chip } from 'primereact/chip';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';

type MapCoords ={
  long:number,
  lat:number,
}
interface MapProps {
  Projects : Array<MapCoords>;
}
const defaultMapSettings: MapProps = {
  Projects: [{
    long:0, lat:0
  }]
} 
interface ProjectRecord {
  Id:string;
  title:string;
  industry:string;
  discipline:string;
  desc:string;
  country:string 
  lat:number;
  long:number;
  sponsors:Array<string>
  participants:Array<string>
  organization:string;
  createdOn:string
  status:string;
  budget:number;
}
type selectedTypes = {
  code:number,
  label:string,
}
const customStyle = {
  sectionHeader:{
    fontSize:"1.5rem",
    marginTop:"5px"
  }
}
type Project = {
  project:ProjectRecord
}
let defaultDate = new Date()

export const ViewProject : FunctionComponent<ProjectDto> = ({name,id,
  budget, desc,country,startDate,category,industry,fields})=>{
    const userToken = window.localStorage.getItem("refreshToken")
    const growl = React.useContext(GrowlContext);

    const userID = JSON.parse(userToken!)
    const theme = React.useContext(ThemeContext);
    const disp = category.split('|');
    const indu = industry.split('|');
    const field = fields.split('|')

    const expressInterest = ()=>{
      axios.post(getFullUrl(`/api/projects/newinterest/${id}`),{
        UserID:userID.id,
        ProjectID:id,
        Read:false
      }).then((res)=>{
        growl.current.show({
          severity:"success",
          summary:"Successfully, your profile  has been shared with the project owner"
       })
         
      }).catch((msg)=>{
        growl.current.show({
          severity:"error",
          summary:"We could not save your interest in this project"
       }) 
      })
    }

    const tooltips = (
      <Tooltip></Tooltip>
    )
 return(
  <>
    <div className='project-details-view'>
    <SectionHeader title='Summary' 
          icontext='pi pi-stop-circle' titleStyle={theme.customStyle.modalDialogLabels}
          sectionStyle={theme.customStyle.icons}/>
      <div className="details-group">
          <div className="details-fields">
            <p className='details-labels'>Title : {" "} </p>
            <p className="details">{name}</p>
          </div>
          <div className="details-fields">
            <p className='details-labels'>Desc :  {" "}</p>
            <p className="details">{desc}</p>
          </div>
          <div className="details-fields">
            <p className='details-labels'>Country : {" "}</p>
            <p className="details">{country}</p>
          </div>
          <div className="details-fields">
            <p className='details-labels'>Staring Date  {" "}</p>
            <p className="details">{}</p>
          </div>
      </div>
      <Divider />
        {disp && (
          <>
             <SectionHeader title='Disciplines' 
              icontext='pi pi-stop-circle' titleStyle={theme.customStyle.modalDialogLabels}
              sectionStyle={theme.customStyle.icons}/>
            <div className="details-group-chips">
              {disp.map((x)=><Chip key={x} label={x}  icon="pi pi-star-fill" className="mr-2 mb-2" />)}
            </div>
          </>
        )}
        <Divider />
       {indu && (
          <>
             <SectionHeader title='Sub disciplines' 
              icontext='pi pi-stop-circle' titleStyle={theme.customStyle.modalDialogLabels}
              sectionStyle={theme.customStyle.icons}/>
            <div className="details-group-chips">
              {indu.map((x)=><Chip key={x} label={x}  icon="pi pi-star-fill" className="mr-2 mb-2" />)}
            </div>
          </>
        )}
      <Divider />
       {field && (
          <>
             <SectionHeader title='Fields' 
              icontext='pi pi-stop-circle' titleStyle={theme.customStyle.modalDialogLabels}
              sectionStyle={theme.customStyle.icons}/>
            <div className="details-group-chips">
              {field.map((x)=><Chip key={x} label={x}  icon="pi pi-star-fill" className="mr-2 mb-2" />)}
            </div>
          </>
        )}
         <Divider />
      <div className="show-interest">
        <Button onClick={expressInterest} className='show-interest-button' tooltip='Please, note that your profile will be shared with project owner. 
        ' tooltipOptions={{position: 'top'}}>Express Interest</Button>
      </div>
    </div>
  </>
 ) 
}
export default function ProjectScreen() {


  const growl= React.useContext(GrowlContext)
  const [data, setData] = React.useState(Array<ProjectRecord>());
  const [isLoading, setIsLoading] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [totalRecords, setTotalRecords] = React.useState(0); // todo
  const [first, setFirst] = React.useState(0);
  const [sortField, setSortField] = React.useState("createdOn");
  const [sortOrder, setSortOrder] = React.useState(-1);
  const [title,setTitle] = React.useState<string>('')

  const [industry,setIndustry] =  React.useState(Array<selectedTypes>());
  const [discipline,setDiscipline] =  React.useState(Array<selectedTypes>());
  const [country,setCountry] =  React.useState(Array<selectedTypes>());
  const [field,setFields]  = React.useState(Array<selectedTypes>());
  const [keyword,setKeyword]= React.useState("")
  const [totalItems,setTotalItems] = React.useState(0); 
  const [Coords,setCoords] = React.useState<MapProps>(defaultMapSettings);
  const [createdDate,setCreatedOn] = React.useState<Date | null>(defaultDate)
  const [projectID,setProjectID] = React.useState('');

  const [rowData,setRowData] = React.useState<ProjectDto>(defaultSettings);
  const [showDialog,setShowDialog] =  React.useState(false);

  const onShowDialog = ()=>{
    setShowDialog(true)
  }
  
  const onHideDialog = ()=>{
    setShowDialog(false)
  }

  const theme = React.useContext(ThemeContext)

  let countries : string[] = ["Kenya","Austria", "Ghana"]

  function queryData(event:{
    first: number;
    rows: number;
    sortField: string;
    sortOrder: number;
  }){
    setRowsPerPage(event.rows)
    setIsLoading(true)

    const selectedindustry = industry.map((s)=>(s.label))
    const selectedCountries = country.map((s)=>(s.label))
    const selectedfield= field.map((s)=>(s.label))
    const selecteddiscipline= discipline.map((s)=>(s.label))

   
    const  queryString = new URLSearchParams();

    if(title){
      queryString.set('title', title.toString())
    }
    
    if(keyword){
      queryString.set('keyword', keyword.toString())
    }

    if(selectedindustry.length){
      queryString.set('industry', selectedindustry.join("|"))
    }

    if(selecteddiscipline.length){
      queryString.set('discipline',selecteddiscipline.join("|"))
    }
    if(selectedCountries.length){
      queryString.set('country',selectedCountries.join("|"))
    }

    if(selectedfield.length){
      queryString.set('field',selectedfield.join("|"))
    }

    let pageIndex = event.first / rowsPerPage
    queryString.set("pageIndex", pageIndex.toString())

    queryString.set("pageIndex", pageIndex.toString());
    queryString.set("pageSize", event.rows.toString());

    queryString.set("sortField", event.sortField || sortField);
    queryString.set("sortOrder", (event.sortOrder || sortOrder).toString());

    axios.get(getFullUrl(`/api/Projects/search/?${queryString.toString()}`))
    .then((res)=>{
        
        const {totalItems,data} = res.data
        setTotalItems(totalItems);
        const d = data as Array<ProjectRecord>
       
         const x = d.map((r )=>{
          return {
            long:r.long, lat:r.lat
          }
         })
        setData(d)
        if(totalItems > 0){
            growl.current.show({
                severity:"success",
                summary:"data loaded successfully"
            })
        }else{
            growl.current.show({
                severity:"success",
                summary:"No matches for your search query"
            })
        }
       
        
    }).catch((error)=>{
        growl.current.show({
            severity:"error",
            summary:"error loading data"
        })
    })

  }
  const tableHeader = ()=>{
    return(
      <div className='table-header'>
        <div className="grid">
            <div className="col">
              Total records
            </div>
            <div className="col">
              last updated 
            </div>
            <div className="col">

            </div>
        </div>
      </div>
    )
  }
  const projects = [
    {
        long:36.7974658,lat:-1.2654232
    }
  
]
  return (
    <div>
      {/* <div className="grid">
        <SectionHeader  title='Poject +' 
          icontext='pi pi-th-large' sectionStyle={theme.customStyle.sectionHeader} />
      </div> */}
      <div className="grid grid-margins">
        <div className="col">
        <Accordion className='search-container' activeIndex={0}>
          <AccordionTab header="Search">
          <div className="p-fluid">
              <div className="input-group-user">
                  <label className='input-lable-titles'  htmlFor="email" style={{ marginBottom: 8 }}>
                     Project Name
                  </label>
                  <InputText value={title} className="search-inputs"
                  placeholder="Project Name" 
                    onChange={(e)=> setTitle(e.target.value)}
                  />
              </div>
              <div className="input-group-user">
                  <label className='input-lable-titles'  htmlFor="email" style={{ marginBottom: 8 }}>
                     Keyword
                  </label>
                  <InputText value={keyword} className="search-inputs"
                  placeholder="keyword filter" 
                  onChange={(e)=>setKeyword(e.target.value)}   
                  />
              </div>
              <div className="input-group-user">
                    <label className='input-lable-titles'  htmlFor="email" style={{ marginBottom: 8 }}>
                        Country
                    </label>
                    <Select  
                        classNamePrefix="Select"
                        isMulti
                        name='country'
                        options={AllCountries}
                        onChange = {(x:any)=> setCountry(x)}
                     />
                    {/* <Dropdown placeholder='select country' className='search-inputs' id="country" name="country" value={""} options={countries} optionLabel="name" /> */}
                </div>
                <div className="input-group-user">
                    <label className='input-lable-titles'  htmlFor="email" style={{ marginBottom: 8 }}>
                        Discipline
                    </label>
                    <Select  
                        classNamePrefix="Select"
                        isMulti
                        name='discipline'
                        options={Disciplines}
                        onChange = {(x:any)=> setDiscipline(x)}
                     />
                    {/* <Dropdown placeholder='select discipline' className='search-inputs' id="country" name="country" value={""} options={countries} optionLabel="name" /> */}
                </div>
                <div className="input-group-user">
                    <label className='input-lable-titles'  htmlFor="email" style={{ marginBottom: 8 }}>
                       Industry
                    </label>
                    <Select  
                        classNamePrefix="Select"
                        isMulti
                        name='industry'
                        options={Industries}
                        onChange = {(x:any)=> setIndustry(x)}
                     />
                </div>
                <div className="input-group-user">
                    <label className='input-lable-titles'  htmlFor="email" style={{ marginBottom: 8 }}>
                       Fields
                    </label>
                    <Select  
                        classNamePrefix="Select"
                        isMulti
                        name='fields'
                        options={AllCountries}
                        onChange = {(x:any)=> setFields(x)}
                     />
                </div>
                <div className="field">
                    <label className='input-lable-titles'  htmlFor="orgname" style={{ marginBottom: 8 }}>
                        Start Date
                    </label> 
                    <Calendar  id="date" 
                    name="date" value={new Date()}  dateFormat="dd/mm/yy" 
                    // onChange={(e)=>onvalueChange("startDate",e.value)}
                    mask="99/99/9999" showIcon />
                </div>
            {/* <div className="input-group-user">
                <label className='input-lable-titles'  htmlFor="email" style={{ marginBottom: 8 }}>
                  Show projects created from
                </label>
                <Calendar  id="date" name="date"  dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
            </div> */}
            <button onClick={()=> queryData({first,rows:rowsPerPage,sortField,sortOrder}) } className='reset-password-button'>Search</button>
          </div>
          </AccordionTab>
        </Accordion>
        </div>
      </div>
      
      <div className="grid grid-margins">
      <Dialog className='dialog-box' header="Project Details" 
        visible={showDialog}  modal style={{ width: '50vw' }}  
          onHide={onHideDialog}>
      <ViewProject name={rowData.name} id = {rowData.id}
              industry={rowData.industry} 
              category={rowData.category} 
              desc={rowData.desc} country={rowData.country} 
              lat={0} long={0} sponsors={rowData.sponsors} 
              participants={rowData.participants} 
              organization={rowData.organization} 
              createdOn={rowData.createdOn} status={rowData.status} budget={rowData.budget} 
              acronym={rowData.acronym} fields={rowData.fields} groupDesc={rowData.groupDesc} 
              startDate={rowData.startDate} 
              endDate={rowData.endDate} partners={rowData.partners} nature={rowData.nature}  />                      
      </Dialog>
        <div className="col">
            
            <div className="table-style">
            {totalItems > 0 ? 

                <TabView>
                 <TabPanel header="Table view">
                        <DataTable 
                        value={data} 
                        responsiveLayout="scroll"
                        header={tableHeader}
                        scrollHeight="400px"
                        >
                              <Column field="name" header="Title"></Column>
                              <Column field="country" header="Country"></Column>
                              <Column field="category" header="Discipline"></Column>
                              <Column field="industry" header="Industry"></Column>
                              <Column field="fields" header="Field"></Column>
                              <Column field="quantity" header="Actions" 
                                  body={(row:ProjectDto)=>(
                                  <div>
                                      <button onClick={(e)=> {
                                        setShowDialog(true)
                                        setRowData(row)
                                        console.log(row)
                                      }} className='admin-actions'>View</button>
                                  </div>
                               )}  
                              />
                        </DataTable>
                </TabPanel>
                  <TabPanel header="Map view">
                      <MapServices Projects={projects}/>   
                  </TabPanel>
                </TabView>
                     
                :<></>
                }
            </div>
        </div>
      </div>
    </div>
  )
}
