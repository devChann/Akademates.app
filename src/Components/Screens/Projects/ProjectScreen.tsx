import React, { FunctionComponent, useRef } from 'react'
import {Accordion, AccordionTab} from 'primereact/accordion'
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './ProjectsScreen.css'
import ThemeContext from '../../../configs/theme';
import { COUNTRIES, Disciplines, FIELDS, Industries } from '../../../Services/dropDowns';
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
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';
import { Tooltip } from 'primereact/tooltip';
import styled from 'styled-components';

type CoordsProps ={
  lng:number,
  lat:number,
}
export const VentureParentContainer = styled.div`
  display: flex;
  height:100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 0rem 0rem 0.5rem 0.5rem;
  width:100%;
  background:white;
  margin-left: 2rem;
  .rows{
    display:flex;
    flex-direction:row;
    gap:50px;
  }
  .tablestyle{
    font-family:var(--title);
    padding:15px;
    font-size:14px;
  }
  @media(max-width: 768px) {
     .rows{
      flex-direction:column;
      gap:15px;
     }
     .tablestyle{
        max-width:70vw;
     }
     .p-tabview .p-tabview-panels{
      width:30rem;
     } 
     width:20rem;
  }
`
const FormParent = styled.div`
  align-self: stretch;
  border-radius: 0px 0px var(--br-5xs) var(--br-5xs);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 14px;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-23xl);
`;

const FormParentInner = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-xl);
`;

const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-xs);
`;
const Titles = styled.b`
  align-self: flex-start;
  position: relative;
  line-height: 1.5rem;
  font-size:14px;
`;

const Component = styled.div`
  .inputs {
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
    width: 28rem;
    height: 33px;
    font-family: 'Plus Jakarta Sans';
  }
  .drop-downs{
    width: 28rem;
    background-color: var(--surface);
    border-radius: var(--br-9xs);
    text-align: start;
    font-size: var(--body-03-default-size);
    font-family: 'Plus Jakarta Sans';
    span{
      
    }
  }
  @media (max-width: 768px) {
      .drop-downs{
        width:18rem;
      }
      .inputs{
        width:18rem;
      }
  }
`;

const CustomButtom =  styled.button`
  color: #FFF;
  font-family:Plus Jakarta Sans;
  font-size: 1;
  font-style: normal;
  font-weight: 400;
  line-height: 1.625rem; /* 216.667% */
`
const MainContainer = styled.div`
  display:flex;
  flex-direction:column;
  gap:20px;
`
export const  TableHeaderContainer =  styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  font-family:var(--title)
  .records{
    font-family:var(--title)
  }
  .button-group-table{
    display:flex;
    flex-direction:row;
    gap:10px;
    justify-content:flex-end;
    margin-right:20px;
  }
`
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
interface ColumnMeta {
  field: string;
  header: string;
}
type selectedTypes = {
  code:number,
  value:number
  label:string,
}
let defaultDate = new Date()

interface ViewProjectProps {
  project:ProjectDto
}
export const ViewProject : FunctionComponent<ViewProjectProps> = ({project})=>{
    const [showDialog,setShowdialog] = React.useState(false)
    const showCustomDialog = ()=>{
      setShowdialog(true)
    }
    const hideCustomDialog = ()=>{
      setShowdialog(false)
    }
    const userToken = window.localStorage.getItem("refreshToken")
    const growl = React.useContext(GrowlContext);
    const [msg,setMsg] = React.useState("I would like to learn more a bout your project..");
    const userID = JSON.parse(userToken!)
    const theme = React.useContext(ThemeContext);
    const disp = project?.category.split('|');
    const indu = project?.industry.split('|');
    const field = project?.fields.split('|')

    const expressInterest = ()=>{
      axios.post(getFullUrl(`/api/projects/newinterest/${project.id}`),{
        UserID:userID.id,
        ProjectID:project.id,
        Read:false,
        Message:msg
      }).then(()=>{
        growl.current.show({
          severity:"success",
          summary:"Successfully, your profile  has been shared with the project owner"
       })
       setShowdialog(false)  
      }).catch(()=>{
        growl.current.show({
          severity:"error",
          summary:"We could not save your interest in this project"
       }) 
      })
    }

 return(
  <>
    <div className='project-details-view'>
    <SectionHeader title='Summary' 
          icontext='pi pi-stop-circle' titleStyle={theme.customStyle.modalDialogLabels}
          sectionStyle={theme.customStyle.icons}/>
      <div className="details-group">
          <div className="details-fields">
            <p className='details-labels'>Title : {" "} </p>
            <p className="details">{project?.name}</p>
          </div>
          <div className="details-fields">
            <p className='details-labels'>Desc :  {" "}</p>
            <p className="details">{project?.desc}</p>
          </div>
          <div className="details-fields">
            <p className='details-labels'>Country : {" "}</p>
            <p className="details">{project?.country}</p>
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
        <Dialog header="Interest" visible={showDialog} onHide={hideCustomDialog}>
        <InputTextarea value={msg} rows={4} cols={45}
                        placeholder="custom message"   className='custom-message'  
                        onChange={(e)=> setMsg(e.target.value)} />
        <div className='button-custom'>
        <Button onClick={expressInterest} className="google p-2" aria-label="msg">
                        <i className="pi pi-send px-0"></i>
                        <span className="px-0">Send</span>
        </Button>
        </div>
        </Dialog>
        <Button onClick={showCustomDialog} className='show-interest-button' tooltip='Please, note that your profile will be shared with project owner.' tooltipOptions={{position: 'top'}}>Express Interest</Button>
      </div>
    </div>
  </>
 ) 
}
export  const ProjectScreen=()=> {
  const growl= React.useContext(GrowlContext)
  const [data, setData] = React.useState(Array<ProjectRecord>());
  const [isLoading, setIsLoading] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [totalRecords, setTotalRecords] = React.useState(0); // todo
  const [first, setFirst] = React.useState(0);
  const [sortField, setSortField] = React.useState("createdOn");
  const [sortOrder, setSortOrder] = React.useState(-1);
  const [title,setTitle] = React.useState<string>('')
  const [projectCoords,setprojectCoords] =  React.useState<Array<CoordsProps>>()
 
  const [discipline,setDiscipline] =  React.useState(Array<selectedTypes>());
  const [subDisciplines,setSubDisciplines] =  React.useState(Array<selectedTypes>());
  const [country,setCountry] =  React.useState(Array<selectedTypes>());
  const [field,setFields]  = React.useState(Array<selectedTypes>());


  // Filtered Options
  const [industryFilteredOptions,setIndustryFilteredOptions] =  React.useState(Array<selectedTypes>());
  const [FilteredOptions,setFilteredOptions] =  React.useState(Array<selectedTypes>());
  // 
  const [keyword,setKeyword]= React.useState("")
  const [totalItems,setTotalItems] = React.useState(0); 
  const [Coords,setCoords] = React.useState<MapProps>(defaultMapSettings);
  const [createdDate,setCreatedOn] = React.useState<Date | null>(defaultDate)
  const [projectID,setProjectID] = React.useState('');

  const [rowData,setRowData] = React.useState<ProjectDto>(defaultSettings);
  const [showDialog,setShowDialog] =  React.useState(false);

  const dt = useRef<DataTable>(null);

  React.useEffect(()=>{
        const industriesOptions = Industries.filter((sa)=>{
            return discipline.some((f)=>{
                return f.code == sa.code
            })
        }) as Array<selectedTypes>
        setIndustryFilteredOptions(industriesOptions)
  },[discipline])

  React.useEffect(()=>{
    console.log(subDisciplines)
    const f = FIELDS.filter((sa)=>{
        return subDisciplines.some((f)=>{
            return f.code == sa.code
        })
    }) as Array<selectedTypes>
    console.log(f)
    setIndustryFilteredOptions(f)
  },[subDisciplines])

  function queryData(event:{
    first: number;
    rows: number;
    sortField: string;
    sortOrder: number;
  }){
    setRowsPerPage(event.rows)
    setIsLoading(true)
    console.log(subDisciplines)
    const selectedindustry = subDisciplines.map((s)=>(s.label))
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
        const coords =  d.map((r)=> {
           return {
            lng: r.long , lat: r.lat
          }
        })
        setprojectCoords(coords)

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
       
        
    }).catch(()=>{
        growl.current.show({
            severity:"error",
            summary:"error loading data"
        })
    })

  }

  // export data

  // const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

    const exportCSV = (selectionOnly: boolean) => {
      if (dt && dt.current) {
        dt.current.exportCSV({ selectionOnly });
      }
    };

    const exportExcel = () => {
      import('xlsx').then((xlsx) => {
          const worksheet = xlsx.utils.json_to_sheet(data);
          const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
          const excelBuffer = xlsx.write(workbook, {
              bookType: 'xlsx',
              type: 'array'
          });

          saveAsExcelFile(excelBuffer, 'products');
      });
  };

    const saveAsExcelFile = (buffer: BlobPart, fileName: string) => {
      import('file-saver').then((module) => {
          if (module && module.default) {
              let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
              let EXCEL_EXTENSION = '.xlsx';
              const data = new Blob([buffer], {
                  type: EXCEL_TYPE
              });

              module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
          }
      });
  };
  const tableHeader = ()=>{
    return(
      <TableHeaderContainer>
         <p className="records">Total records : {data.length}</p>
         <div className="button-group-table">
                  <Button type="button" icon="pi pi-file"   onClick={() => exportCSV(false)} data-pr-tooltip="CSV" className='export-table' />
                  <Button type="button" icon="pi pi-file-excel" onClick={exportExcel} data-pr-tooltip="XLS"  className='export-table'/>
                  {/* <Button type="button" icon="pi pi-file-pdf"  data-pr-tooltip="PDF"  className='export-table'/> */}
          </div>
      </TableHeaderContainer>
    )
  }
  const projects = [
    {
        long:36.7974658,lat:-1.2654232
    }
  
  ] 
  return (
    <MainContainer>
      <Dialog visible={showDialog} header="View project" onHide={()=> setShowDialog(false)}>
          {rowData && (<ViewProject project={rowData} />)}
      </Dialog>
       <Tooltip target=".export-buttons>button" position="bottom" />
       <VentureParentContainer>
          <div className="rows">
            <FormParent>
              <FormParentInner>
                <InputWrapper>
                  <Titles>Venture Title</Titles>
                  <Component>
                    {/* <SelectCountry>Venture Title</SelectCountry> */}
                    <InputText value={title} className="inputs"
                      placeholder=" Venture Title" 
                        onChange={(e)=> setTitle(e.target.value)}
                      />
                  </Component>
                </InputWrapper>
              </FormParentInner>
            </FormParent>
            <FormParent>
              <FormParentInner>
                <InputWrapper>
                  <Titles>Keyword</Titles>
                  <Component>
                    {/* <SelectCountry>Venture Title</SelectCountry> */}
                    <InputText value={keyword} className="inputs"
                      placeholder="Keyword" 
                        onChange={(e)=> setKeyword(e.target.value)}
                      />
                  </Component>
                </InputWrapper>
              </FormParentInner>
            </FormParent>
          </div>
          <div className="rows">
            <FormParent>
              <FormParentInner>
                <InputWrapper>
                  <Titles>Country</Titles>
                  <Component>
                    {/* <SelectCountry>Venture Title</SelectCountry> */}
                    <Dropdown value={country} options={COUNTRIES} 
                      onChange={(e)=>setCountry(e.value)} 
                        optionLabel="label" filter showClear filterBy="label" 
                           placeholder="Select" className='drop-downs'
                    />
                  </Component>
                </InputWrapper>
              </FormParentInner>
            </FormParent>
            <FormParent>
              <FormParentInner>
                <InputWrapper>
                  <Titles> Branch of knowledge</Titles>
                  <Component>
                    {/* <SelectCountry>Venture Title</SelectCountry> */}
                    <MultiSelect value={discipline} options={Disciplines} 
                        onChange={(e) => setDiscipline(e.value)} optionLabel="label" 
                        placeholder="Select a branch of knowledge" display="chip" filter className='drop-downs' />
                  </Component>
                </InputWrapper>
              </FormParentInner>
            </FormParent>
          </div>
          <div className="rows">
            <FormParent>
              <FormParentInner>
                <InputWrapper>
                  <Titles> Start Date</Titles>
                  <Component>
                    {/* <SelectCountry>Venture Title</SelectCountry> */}
                    <Calendar  id="date" 
                    name="date" value={new Date()}  dateFormat="dd/mm/yy" 
                    // onChange={(e)=>onvalueChange("startDate",e.value)}
                    mask="99/99/9999" showIcon className='drop-downs' />
                  </Component>
                </InputWrapper>
              </FormParentInner>
            </FormParent>
            <FormParent>
              <FormParentInner>
                <InputWrapper>
                  <Titles> Business Sector/ Trade</Titles>
                  <Component>
                    {/* <SelectCountry>Venture Title</SelectCountry> */}
                    <MultiSelect value={subDisciplines} options={industryFilteredOptions} 
                        onChange={(e) => setSubDisciplines(e.value)} optionLabel="label" 
                        placeholder="Select a sub discipline" display="chip" filter className='drop-downs'/>
                  </Component>
                </InputWrapper>
              </FormParentInner>
            </FormParent>
          </div>
          <div className="rows">
            <FormParent>
              <FormParentInner>
                <InputWrapper>
                  <Titles>Field of activity</Titles>
                  <Component>
                    {/* <SelectCountry>Venture Title</SelectCountry> */}
                    <MultiSelect value={field} options={FilteredOptions} 
                        onChange={(e) => setFields(e.value)} optionLabel="label" 
                        placeholder="Select fields" display="chip" filter className='drop-downs'/>
                  </Component>
                </InputWrapper>
              </FormParentInner>
            </FormParent>
            <FormParent>
              <FormParentInner>
                <InputWrapper style={{width:"28rem"}}>
                  <CustomButtom style={{margin:"auto"}} onClick={()=> queryData({first,rows:rowsPerPage,sortField,sortOrder}) } className='reset-password-button'>Search</CustomButtom>
                </InputWrapper>
              </FormParentInner>
            </FormParent>
          </div>
       </VentureParentContainer>
      
      <VentureParentContainer>
      {totalItems > 0 ? 
        <TabView>
          <TabPanel header="Table view">
                  <DataTable 
                  value={data} 
                  responsiveLayout="scroll"
                  header={tableHeader}
                  scrollHeight="400px"
                  ref={dt}
                 className='tablestyle'
                  >
                        <Column field="name" header="Title"></Column>
                        <Column field="country" header="Country"></Column>
                        <Column field="category" header="Discipline"></Column>
                        <Column field="industry" header="Industry"></Column>
                        <Column field="fields" header="Field"></Column>
                        <Column field="quantity" header="Actions" 
                            body={(row:ProjectDto)=>(
                            <div>
                                <button onClick={()=> {
                                  setShowDialog(true)
                                  setRowData(row)
                                }} className='admin-actions'>View</button>
                            </div>
                        )}  
                        />
                  </DataTable>
          </TabPanel>
            <TabPanel header="Map view">
               {projectCoords && (<MapServices coordinates={projectCoords}/>)}    
            </TabPanel>
        </TabView>
          :<></>
        }
      </VentureParentContainer>
    </MainContainer>
  )
}
