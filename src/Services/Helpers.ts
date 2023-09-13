export const  formatDateString  =  (dateObject:string)=>{
    let  date = new Date(dateObject)

    if (dateObject === "Present") {
        return dateObject
    }else {
        return date.toLocaleDateString("en-CA")
    }
}