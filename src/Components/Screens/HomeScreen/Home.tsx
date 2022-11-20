import React, { FunctionComponent } from 'react';
import './Home.css';
import  {Button} from 'primereact/button';
import ContactPic from '../../../assets/images/ContactPic.png';
import sectionbackground from '../../../assets/images/sectionbackground.jpg';
import akademates from '../../../assets/images/akademates.png';
import ourpresence from '../../../assets/images/ourpresence.png';
import {MapContainer,TileLayer,useMap,Marker,Popup} from 'react-leaflet'
import { Link } from 'react-router-dom';
import { NavHeader } from '../../Navigation/Header';
type Projects ={
    long:number,
    lat:number,
}
interface MapProps {
    Projects : Array<Projects>;
}
export const  MapServices : FunctionComponent<MapProps> = ({Projects}) => {
    const position  = [51.505, -0.09];
    return (
        <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={true}>
            <TileLayer 
                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {Projects.map((p)=> 
                 <Marker position={[p.lat	, p.long]}>
                 <Popup>
 
                 </Popup>
             </Marker>
            )}
           
        </MapContainer>
    )
}

const Home = ()=>{
    const projects = [
        {
            long:36.7974658,lat:-1.2654232
        },
        {
            long:36.6646206,lat:-1.8902939
        }
    ]
  return (
    <div className='home-container'>
        <div className="grid">
           <img src={ContactPic} alt="lemurs" className="bg-image" />
           <div className='titleContainer'>
           <div className="grid  nav-header">
               <div className="grid">
                   <NavHeader />
               </div>
               <div className="grid">
                 <div className='main-title'>
                    <p>Bridging academia and industry</p>
                     <Button className='join-button' label='Join Now'></Button>
                 </div>
               </div>
           </div>
           </div>
        </div>
        <div className="grid">
            <img src={sectionbackground} alt="lemurs" className="bg-image-subsection" />
            <div className='subsectionsbackground'>
               <h2>About us</h2>
            </div>
        </div>
        <div className="grid">
            <div className="col post-project-title">
                <p>
                ‘Online engagement platform designed to link academia and industry’
                </p>
            </div>
            <div className="col">
                <div style={{padding:"0.5rem"}}>
                    <img src={akademates} alt="lemurs" className="about-us-img" />
                </div>
            </div>
        </div>
        <div className="grid">
            <img src={sectionbackground} alt="lemurs" className="bg-image-subsection" />
            <div className='subsectionsbackground'>
               <h2>Our Presence</h2>
            </div>
        </div>
       
        <div className="grid">
        <div className="col">
                <div className='our-presence-container'>
                    <img src={ourpresence} alt="lemurs" className="about-us-img" />
                </div>
            </div>
            <div className="col post-project-title">
                <p>
                    Small to medium firms collaborating with academia
                </p>
            </div>
           
        </div>

        <div className="grid">
            <img src={sectionbackground} alt="lemurs" className="bg-image-subsection" />
            <div className='subsectionsbackground'>
               <h2>Projects</h2>
            </div>
        </div>
        <div className="grid">
            <div className="col">
                <div className='map-container'>
                    <MapServices Projects={projects}/>
                </div>
            </div>
        </div>
        <div className="grid post-project-container">
            <div className="col post-project-title">
               <p>Post your project to attract top  talents</p>
            </div>
            <div className="col post-project-title"> 
                <Button label='Post a project' className='join-button' />
            </div>
        </div>
        <div className="grid footerSection">
            <div className="col">
               <div className="grid">
                <div className="col">
                    <div className='footerSection-titles'>
                        Products
                    </div> 
                <ol>
                    <li>Pricing</li>
                    <li>Teams</li>
                    <li>Education</li>
                    <li>Refer a friend</li>
                    <li>Updates</li>
                    <li>Pricing</li>
                </ol>
                </div>
                <div className="col">
                <div className='footerSection-titles'>
                        Products
                    </div> 
                <ol>
                    <li>Pricing</li>
                    <li>Teams</li>
                    <li>Education</li>
                    <li>Refer a friend</li>
                    <li>Updates</li>
                    <li>Pricing</li>
                </ol>
                </div>
                <div className="col">
                <div className='footerSection-titles'>
                        Products
                </div> 
                <ol>
                    <li>Pricing</li>
                    <li>Teams</li>
                    <li>Education</li>
                    <li>Refer a friend</li>
                    <li>Updates</li>
                    <li>Pricing</li>
                </ol>
                </div>
                <div className="col">
                    <div className='footerSection-titles'>
                        Products
                    </div> 
                <ol>
                    <li>Pricing</li>
                    <li>Teams</li>
                    <li>Education</li>
                    <li>Refer a friend</li>
                    <li>Updates</li>
                    <li>Pricing</li>
                </ol>
                </div>
                <div className="col">
                    <div className='footerSection-titles'>
                        Products
                    </div> 
                <ol>
                    <li>Pricing</li>
                    <li>Teams</li>
                    <li>Education</li>
                    <li>Refer a friend</li>
                    <li>Updates</li>
                    <li>Pricing</li>
                </ol>
                </div>
               </div>
            </div>
            <hr />
            <p>All rights reserved Akademates</p>
        </div>
    </div>
  )
}

export default Home;