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

export const ViewProject : FunctionComponent<ProjectDto> = ({name,id,
  desc,country,category,industry,fields})=>{
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
    const disp = category.split('|');
    const indu = industry.split('|');
    const field = fields.split('|')

    const expressInterest = ()=>{
      axios.post(getFullUrl(`/api/projects/newinterest/${id}`),{
        UserID:userID.id,
        ProjectID:id,
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

  //   const exportPdf = () => {
  //     import('jspdf').then((jsPDF) => {
  //         import('jspdf-autotable').then(() => {
  //             const doc = new jsPDF.default(0, 0);

  //             doc.autoTable(exportColumns, data);
  //             doc.save('products.pdf');
  //         });
  //     });
  //  };
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
      <div className='table-header'>
        <div className="grid">
            <div className="col">
              <p className='total-records-p'>Total records : {data.length}</p>
            </div>
           
            <div className="col">
              <div className="flex align-items-center justify-content-end gap-2">
                  <Button type="button" icon="pi pi-file"   onClick={() => exportCSV(false)} data-pr-tooltip="CSV" className='export-table' />
                  <Button type="button" icon="pi pi-file-excel" onClick={exportExcel} data-pr-tooltip="XLS"  className='export-table'/>
                  <Button type="button" icon="pi pi-file-pdf"  data-pr-tooltip="PDF"  className='export-table'/>
              </div>
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
       <Tooltip target=".export-buttons>button" position="bottom" />
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
                     Venture Title
                  </label>
                  <InputText value={title} className="search-inputs"
                  placeholder=" Venture Title" 
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
                    <Dropdown value={country} options={COUNTRIES} 
                      onChange={(e)=>setCountry(e.value)} 
                        optionLabel="label" filter showClear filterBy="label" 
                           placeholder="Select a Country" className='p-dropdown-custom'
                    />
                  </div>
                <div className="input-group-user">
                    <label className='input-lable-titles'  htmlFor="email" style={{ marginBottom: 8 }}>
                    Branch of knowledge
                    </label>
                    <MultiSelect value={discipline} options={Disciplines} 
                        onChange={(e) => setDiscipline(e.value)} optionLabel="label" 
                        placeholder="Select a branch of knowledge" display="chip" filter className='p-dropdown-custom' />
                      
                </div>
                <div className="input-group-user">
                    <label className='input-lable-titles'  htmlFor="email" style={{ marginBottom: 8 }}>
                      Business Sector/ Trade
                    </label>
                    <MultiSelect value={subDisciplines} options={industryFilteredOptions} 
                        onChange={(e) => setSubDisciplines(e.value)} optionLabel="label" 
                        placeholder="Select a sub discipline" display="chip" filter />
                </div>
                <div className="input-group-user">
                    <label className='input-lable-titles'  htmlFor="email" style={{ marginBottom: 8 }}>
                    Field of activity
                    </label>
                    <MultiSelect value={field} options={FilteredOptions} 
                        onChange={(e) => setFields(e.value)} optionLabel="label" 
                        placeholder="Select fields" display="chip" filter />
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
          onHide={()=> setShowDialog(false) }>
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
                        ref={dt}
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
