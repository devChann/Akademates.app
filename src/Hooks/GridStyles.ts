import React, { useContext } from "react"
import { colors } from "react-select/dist/declarations/src/theme";
import ThemeContext from "../configs/theme"

export const  useGridStyles = ()=>{

    const theme = useContext(ThemeContext);

    const keywordSearch: React.CSSProperties = {
        borderRadius: 10,
        backgroundColor: theme.v2.lightGrey,
        font: theme.v2Fonts.inputHeader,
        color: theme.v2.black,
        maxWidth: 200,
       
    };
    const saveButtons: React.CSSProperties = {
        margin:"15px",
        background:"#FFA836",
        width:'fit-content',
        border:'none',
        borderRadius: '20px',
        fontWeight:700,
        fontSize: '16px',
        color: 'white',

    }
    const tableHeaderButton: React.CSSProperties = {
        backgroundColor: theme.v2.lightOrange,
        color: 'rgb(34, 118, 153)',
        font: theme.v2Fonts.inputHeader,
        borderRadius: 26.5,
        boxShadow: "none",
        margin:"10px",
        height:"40px",
        padding:"10px",
        border:'none',
        left:0
    };

    const headerStyle = (width: number): React.CSSProperties => ({
        backgroundColor: theme.v2.darkestGrey,
        width: width,
        font: theme.v2Fonts.contextHeader,
        color: theme.v2.Orange,
        textTransform:"capitalize"
      });
    
      const columnStyle = (width: number): React.CSSProperties => ({
        width: width,
      });
      const rowStyle = (width: number): React.CSSProperties => ({
        width: width,
        textTransform:"capitalize",
        textAlign:"left",
        paddingLeft:"5px"
        
      });   
      return {
        keywordSearch,
        headerStyle,
        rowStyle,
        columnStyle,
        tableHeaderButton,saveButtons
      }
}