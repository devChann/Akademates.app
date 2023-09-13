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
import { Button } from 'primereact/button'
import { TableHeaderContainer, VentureParentContainer } from '../Projects/ProjectScreen'
import styled from 'styled-components'
import { UserDto } from '../../../types'
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
   const [profile,setProfile] = React.useState<UserDto>();
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
          <TableHeaderContainer>
            <p className='total-records-p'>Total records : {data.length}</p>
            <div className="button-group-table">
                      <Button type="button" icon="pi pi-file"   onClick={() => exportCSV(false)} data-pr-tooltip="CSV" className='export-table' />
                      <Button type="button" icon="pi pi-file-excel" onClick={exportExcel} data-pr-tooltip="XLS"  className='export-table'/>
                      {/* <Button type="button" icon="pi pi-file-pdf"  data-pr-tooltip="PDF"  className='export-table'/> */}
                  </div>
          </TableHeaderContainer>
        )
      }
  const showUserProfile = (user:UserDto)=>{
    setProfile(user)
    setShowProfile(true)
  }
  return (
    <MainContainer>
       <Dialog className='dialog-box' header="User Profile"    visible={showProfile}  modal style={{ width: '60vw' }}  onHide={()=> setShowProfile(false)}>
             {
                profile && (
                    <Profile user={profile} />
                )
             } 
        </Dialog>
         <VentureParentContainer>
          <div className="rows">
            <FormParent>
              <FormParentInner>
                <InputWrapper>
                  <Titles>  First name</Titles>
                  <Component>
                    {/* <SelectCountry>Venture Title</SelectCountry> */}
                    <InputText value={firstName} className="inputs"
                      placeholder="First name" 
                        onChange={(e)=> setFirstName(e.target.value)}
                      />
                  </Component>
                </InputWrapper>
              </FormParentInner>
            </FormParent>
            <FormParent>
              <FormParentInner>
                <InputWrapper>
                  <Titles>Other names</Titles>
                  <Component>
                    {/* <SelectCountry>Venture Title</SelectCountry> */}
                    <InputText value={lastName} className="inputs"
                      placeholder="Keyword" 
                        onChange={(e)=> setLastName(e.target.value)}
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
                    <Select  
                        classNamePrefix="Select"
                        isMulti
                        name='country'
                        options={COUNTRIES}
                        onChange = {(x:any)=> setCountry(x)}
                        className='drop-downs'
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
                  <Select  
                        classNamePrefix="Select"
                        isMulti
                        name='discipline'
                        options={Disciplines}
                        onChange = {(x:any)=> setDiscipline(x)}
                        className='drop-downs'
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
                  <Select  
                        classNamePrefix="Select"
                        isMulti
                        name='industry'
                        options={Industries}
                        onChange = {(x:any)=> setIndustry(x)}
                        className='drop-downs'
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
                  <Titles>Field of activity</Titles>
                  <Component>
                    {/* <SelectCountry>Venture Title</SelectCountry> */}
                    <Select  
                        classNamePrefix="Select"
                        isMulti
                        name='industry'
                        options={FIELDS}
                        onChange = {(x:any)=> setFields(x)}
                        className='drop-downs'
                     />
                  </Component>
                </InputWrapper>
              </FormParentInner>
            </FormParent>
            <FormParent>
              <FormParentInner>
                <InputWrapper style={{width:"28rem"}}>
                  <CustomButtom style={{margin:"auto"}} onClick={()=> queryData({rows,first,sortBy,sortOrder}) } className='reset-password-button'>Search</CustomButtom>
                </InputWrapper>
              </FormParentInner>
            </FormParent>
          </div>
       </VentureParentContainer>
       <VentureParentContainer>
       <div className="table-style">
                {totalItems > 0 ? 
                        <DataTable 
                        value={data} 
                        responsiveLayout="scroll"
                        header={tableHeader}
                        className="tablestyle"
                        >
                          <Column field="firstName" header="First Name"></Column>
                          <Column field="lastName" header="Last Name"></Column>
                          <Column field="discipline" header="Discipline"></Column>
                          <Column field="industry" header="Industry"></Column>
                          <Column field="fields" header="Field"></Column>
                          <Column field="quantity" header="Actions" 
                              body={(r:UserDto)=>(
                              <div>
                                  <button onClick={()=> showUserProfile(r)} className='admin-actions'>View</button>
                              </div>
                            )}  
                          />
                           
                        </DataTable>
                :<></>
                }
            </div>
       </VentureParentContainer>
    </MainContainer>
   
  )
}
