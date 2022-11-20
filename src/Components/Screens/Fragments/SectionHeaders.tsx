import React, { FC, FunctionComponent } from 'react'
import ThemeContext from '../../../configs/theme'

interface SectionHeaderprops {
    title:string
    icon?:string
    icontext:string
    sectionStyle?:{} 
    titleStyle?:{}
}
const SectionHeader:FunctionComponent<SectionHeaderprops> = ({title,icon,icontext,sectionStyle,titleStyle})=>{
    const theme = React.useContext(ThemeContext);

return(
   <div className="header-container">
    <span>
        <i className={icontext} style={sectionStyle}></i>
    </span>
    <p style={titleStyle}>{title}</p>
  </div>
)}

export  default SectionHeader;