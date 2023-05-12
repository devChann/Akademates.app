import axios from 'axios'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { Calendar } from 'primereact/calendar'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useRef } from 'react'
import getFullUrl from '../../../configs/axios-custom'
import ThemeContext from '../../../configs/theme'
import SectionHeader from '../Fragments/SectionHeaders'
import Select from 'react-select';
import { AllCountries } from '../../../Services/countries';
import { COUNTRIES, Disciplines, FIELDS, Industries } from '../../../Services/dropDowns'
import GrowlContext from '../../../configs/growlContext'
import { Dialog } from 'primereact/dialog'
import Profile from '../Projects/Fragments/Profile'
import { UserDto } from '../UserScreen/UserInformation'
import { Button } from 'primereact/button'

export interface UserProfile {
    firstName: string;
    lastName:string;
    email:string;
    profileImage:string;
    backgroundImage:string;
    bio:string;
    country:string;
    discipline:string;
    industry:string;
    field:string;
    id:string
}
type selectedTypes = {
    code:number,
    label:string,
}
export default function ExpertsScreen() {
  const growl = React.useContext(GrowlContext);
  const  theme = React.useContext(ThemeContext)
  const userToken = window.localStorage.getItem("refreshToken")
  const {id} = JSON.parse(userToken!)
  const [isLoading,setIsLoading] = React.useState(false)
  const[rows,setRows]= React.useState(20);
  const [first, setFirst] = React.useState(0);
  const [keyword, setKeyword] = React.useState("");
    //    filters 
   const [firstName,setFirstName] =  React.useState(""); 
   const [lastName,setLastName] =  React.useState("");
   const [bio,setBio] =  React.useState("");

   const [industry,setIndustry] =  React.useState(Array<selectedTypes>());
   const [discipline,setDiscipline] =  React.useState(Array<selectedTypes>());
   const [country,setCountry] =  React.useState(Array<selectedTypes>());
   const [field,setFields]  = React.useState(Array<selectedTypes>());

   const [rowsPerPage,setRowsPerPage] = React.useState(20) ;
   const [sortBy,setSortBy] = React.useState('firstName');
   const [sortOrder,setSortOrder] = React.useState(-1);
   const [totalItems,setTotalItems] = React.useState(0); 
   const [showProfile,setShowProfile] = React.useState(false) 
   const [userid,setUserId] = React.useState('');
   const[data,setData] = React.useState(Array<UserProfile>());
   const dt = useRef<DataTable>(null);
    function queryData(event:{
        rows:number,
        first:number,
        sortBy:string,
        sortOrder:number,
    }){
        setIsLoading(true);
        setFirst(event.first);
        const queryParams = new URLSearchParams()
     
        const selectedindustry = industry.map((s)=>(s.label))
        const selectedCountries = country.map((s)=>(s.label))
        const selectedfield= field.map((s)=>(s.label))
        const selecteddiscipline= discipline.map((s)=>(s.label))

        if (country.length) {
            queryParams.set("country", selectedCountries.join("|"))
        }
        if (industry.length) {
            queryParams.set("industry", selectedindustry.join("|"))
        }
        if (discipline.length) {
            queryParams.set("disciline", selecteddiscipline.join("|"))
        }
        if (field.length) {
            queryParams.set("field", selectedfield.join("|"))
        }
        if (firstName) {
            queryParams.set("firstname", firstName.toString())
        }

        if (lastName) {
            queryParams.set("lastName", lastName.toString())
        }
        const pageIndex = event.first / rowsPerPage;
        queryParams.set("pageIndex", pageIndex.toString());
        queryParams.set("pageSize",event.rows.toString());
        queryParams.set("sortBy",event.sortBy.toString() || sortBy);
        queryParams.set("sortOrder",event.sortOrder.toString() || sortOrder.toString());

        axios.get(getFullUrl(`/api/base/users/?${queryParams.toString()}`))
        .then((res)=>{
            const {totalItems,data} = res.data
            setTotalItems(totalItems);
            const d = data as Array<UserProfile>
            const experts = d.filter((x)=> x.id !== id)
            setData(experts)
            if(experts.length > 0){
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
  const showUserProfile = (id:string)=>{
    setUserId(id)
    setShowProfile(true)
  }
  return (
    <div>
        {/* <div className="grid">
          <SectionHeader title='Experts' 
          icontext='pi pi-users' 
          sectionStyle={theme.customStyle.sectionHeader} />
      </div> */}
      <div className="grid grid-margins" style={{marginTop:"10px"}}>
        <div className="col">
        <Accordion className='search-container'activeIndex={0}>
          <AccordionTab header="Search specialists">
          <div className="p-fluid">
                <div className="input-group-user">
                    <label className='input-lable-titles'  htmlFor="email" style={{ marginBottom: 8 }}>
                        First name
                    </label>
                    <InputText value={firstName} className="search-inputs" onChange={(e)=>setFirstName(e.target.value)}
                    placeholder="First name"    
                    />
                </div>
                
                <div className="input-group-user">
                    <label className='input-lable-titles'  htmlFor="email" style={{ marginBottom: 8 }}>
                      Other Names
                    </label>
                    <InputText value={lastName} className="search-inputs" onChange={(e)=>setLastName(e.target.value)}
                    placeholder="Other Names"    
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
                        options={COUNTRIES}
                        onChange = {(x:any)=> setCountry(x)}
                     />
                    {/* <Dropdown placeholder='select country' className='search-inputs' id="country" name="country" value={""} options={countries} optionLabel="name" /> */}
                </div>
                <div className="input-group-user">
                    <label className='input-lable-titles'  htmlFor="email" style={{ marginBottom: 8 }}>
                        Branch of knowledge
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
                       Business Sector/ Trade
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
                       Field of activity
                    </label>
                    <Select  
                        classNamePrefix="Select"
                        isMulti
                        name='industry'
                        options={FIELDS}
                        onChange = {(x:any)=> setFields(x)}
                     />
                </div>
                <button onClick={()=>queryData({rows,first,sortBy,sortOrder})} className='reset-password-button'>Search</button>
          </div>
          </AccordionTab>
        </Accordion>
        </div>
      </div>

      {/* table */}

      <div className="grid grid-margins">
         <Dialog className='dialog-box' header="User Profile"    visible={showProfile}  modal style={{ width: '60vw' }}  onHide={()=> setShowProfile(false)}>
             {
                userid && (
                    <Profile UserID={userid} />
                )
             } 
        </Dialog>
        <div className="col">
            
            <div className="table-style">
                {totalItems > 0 ? 
                        <DataTable 
                        value={data} 
                        responsiveLayout="scroll"
                        header={tableHeader}
                        >
                              <Column field="firstName" header="First Name"></Column>
                              <Column field="lastName" header="Last Name"></Column>
                              <Column field="discipline" header="Discipline"></Column>
                              <Column field="industry" header="Industry"></Column>
                              <Column field="fields" header="Field"></Column>
                              <Column field="quantity" header="Actions" 
                                  body={(r:UserProfile)=>(
                                  <div>
                                      <button onClick={()=> showUserProfile(r.id)} className='admin-actions'>View</button>
                                  </div>
                               )}  
                              />
                           
                        </DataTable>
                :<></>
                }
            </div>
        </div>
      </div>
    </div>
  )
}
