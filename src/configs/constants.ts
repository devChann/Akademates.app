export const rowsPerPageOptionsStandard = [
    20,
    50,
    100,
    1000
];

export const CLIENT_ID = "744771166267-8v917skij9gm90snjq93oruj7jhnqtqs.apps.googleusercontent.com";

export const PostOptions =  [
    {name:"Funding", value:"Funding"},
    {name:"Grants", value:"Grants"},
    {name:"Hot tasks", value:"Hot tasks"},
    {name:"Specialist",value:"Specialist"},
    {name:"Consultancy",value:"Consultancy"},
    {name:"Tender",value:"Tender"},
    {name:"Other",value:"Other"}]


export const formatDate = (dateString:string)=>{
    return new Date(dateString)
}

export const formartDateToIsoString = (dateString:string)=>{
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
    const formattedDate = date.toLocaleDateString('en-US');

    return formattedDate
}