import axios from 'axios'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { Calendar } from 'primereact/calendar'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import React, { useEffect } from 'react'
import getFullUrl from '../../../configs/axios-custom'
import ThemeContext from '../../../configs/theme'
import SectionHeader from '../Fragments/SectionHeaders'
import Select from 'react-select';
import { AllCountries } from '../../../Services/countries';
import { Disciplines, Industries } from '../../../Services/dropDowns'
import GrowlContext from '../../../configs/growlContext'

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

   const[data,setData] = React.useState(Array<UserProfile>());

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
            console.log(d)
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
    React.useEffect(()=>{
        console.log(data)
    })
  const tableHeader = ()=>{
    return(
      <div className='table-header'>
        <div className="grid">
            <div className="col">
             Experts {totalItems}
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

  // On page load data
  
  React.useEffect(()=>{
    //queryData(first,rows,sortBy,sortOrder)
  })
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
          <AccordionTab header="Search Experts">
          <div className="p-fluid">
 
                <div className="input-group-user">
                    <label className='input-lable-titles'  htmlFor="email" style={{ marginBottom: 8 }}>
                        First name
                    </label>
                    <InputText value={firstName} className="search-inputs" onChange={(e)=>setFirstName(e.target.value)}
                    placeholder="first name"    
                    />
                </div>
                
                <div className="input-group-user">
                    <label className='input-lable-titles'  htmlFor="email" style={{ marginBottom: 8 }}>
                        Last name
                    </label>
                    <InputText value={lastName} className="search-inputs" onChange={(e)=>setLastName(e.target.value)}
                    placeholder="first name"    
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
                        name='industry'
                        options={AllCountries}
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
                                  body={()=>(
                                  <div>
                                      <button className='admin-actions'>View</button>
                                  </div>
                               )}  
                              />
                              {/* <Column field="Status" header="Status"></Column>
                              <Column field="Partners" header="Partners"></Column>
                              <Column field="Budget" header="Budget"></Column>
                              <Column field="Country" header="Country"></Column>
                              <Column field="Status" header="Status"></Column>
                              <Column field="Status" header="Status"></Column> */}
                        </DataTable>
                :<></>
                }
            </div>
        </div>
      </div>
    </div>
  )
}
