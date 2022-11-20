import React from "react";

export type Theme = {
    primaryFont: string,
    colors: {
        primary: string,
        secondary: string,
        accent: string,
        primaryFaded: string,
        accentFaded: string,
        offwhite: string
    },
    customStyle : {
        sectionHeader:{
          fontSize:string,
          marginTop:string,
          color:string
        }
        subHeader:{
            fontSize:string,
            marginTop:string,
            color:string
        },
        headerTitle:{
            fontSize:string,
            fontWeight:number,
            textAlign:string,
            display:string,
            alignItems:string
            marginTop:string
            marginLeft:string

        },
        subHeaderTitle:{
            font:string,
            fontWeight:number,
            textAlign:string,
            display:string,
            alignItems:string ,
            marginTop:string,
            marginLeft:string,
            color:string

        },
        modalDialogLabels:{
            font:string,
            fontWeight:number,
            textAlign:string,
            display:string,
            alignItems:string ,
            marginTop:string,
            marginLeft:string,
            color:string

        },
        icons : {
            fontSize:string,
            marginTop:string,
            color:string
        }


    },
    v2: {
        lightYellow: string,
        darkYellow: string,
        lightBlue: string,
        darkBlue: string,
        lightGrey: string,
        darkGrey: string,
        darkestGrey: string,
        black: string,
        green: string,
        accentFaded: string,
        Orange:string,
        lightOrange : string
    },
    v2Fonts: {
        largeHeader: string,
        mediumHeader: string,
        smediumHeader: string,
        smallHeader: string,
        menuSelected: string,
        menuRootNode: string,
        menu: string,
        gridData: string,
        inputHeader: string,
        input: string,
        contextHeader: string,
        context: string,
        link: string
    },

}

const defaultTheme: Theme = {
    primaryFont: 'Montserrat',
    colors: {
        primary: '#187AB5',
        secondary: 'rgba(24, 122, 181, 1)',
        accent: '#FCB017',
        primaryFaded: 'rgba(24, 122, 181, 1)',
        accentFaded: 'rgba(252, 176, 23, 0.5)',
        offwhite: 'rgba(255, 255, 255, 0.1)'
    },
    v2: {
        lightYellow: 'rgb(250,234,203)',
        darkYellow: 'rgb(238,173,36)',
        lightBlue: 'rgb(203,227,242)',
        darkBlue: 'rgb(50,126,184)',
        lightGrey: 'rgb(217,217,217)',
        darkGrey: 'rgb(151,151,151)',
        darkestGrey: 'rgb(96,95,95)',
        black: 'rgb(0,0,0)',
        green: 'rgb(106,195,69)',
        accentFaded: 'rgba(252, 176, 23, 0.5)',
        Orange:'white',
        lightOrange:'rgb(250, 234, 205)'
    },
    v2Fonts: {
        largeHeader: '800 28px Montserrat',
        mediumHeader: '800 24px Montserrat',
        smediumHeader: '800 20px Montserrat',
        smallHeader: 'bold 16px Montserrat',
        menuSelected: '800 16px Montserrat',
        menuRootNode: '800 16px Montserrat',
        gridData: '14px Montserrat',
        menu: '16px Montserrat',
        inputHeader: 'bold 14px Montserrat',
        input: '16px Montserrat',
        contextHeader: 'bold 15px varela round',
        context: '14px Open Sans',
        link: '14px Open Sans'
    },
    customStyle:{
        sectionHeader:{
            fontSize:"1.5rem",
            marginTop:"5px",
            color:"orange"
        },
        subHeader:{
            fontSize:"1.5rem",
            marginTop:"5px",
            color:"orange"
        
        },
        headerTitle:{
            fontSize:"20px",
            display:"flex",
            fontWeight:800,
            textAlign:"center",
            alignItems:"center",
            marginTop:"5px",
            marginLeft:"8px"
        },
        subHeaderTitle:{
            font:"20px varela round",
            display:"flex",
            fontWeight:600,
            textAlign:"center",
            alignItems:"center",
            marginTop:"5px",
            marginLeft:"8px",
            color:"#227699"
        },
        modalDialogLabels :{
            font:"15px varela round",
            display:"flex",
            fontWeight:600,
            textAlign:"center",
            alignItems:"center",
            marginTop:"5px",
            marginLeft:"8px",
            color:"#227699"
        },
        icons :{
            fontSize:"1rem",
            marginTop:"5px",
            color:"orange"
        }
    }
};

const ThemeContext = React.createContext<Theme>(defaultTheme);

export default ThemeContext;

export {defaultTheme};
