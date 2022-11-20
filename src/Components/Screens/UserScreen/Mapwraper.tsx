import React from 'react'
import Map, { NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl} from 'react-map-gl';
import GeocoderControl from '../../../Services/GeocoderControl';

const TOKEN = "pk.eyJ1IjoiY2hhbm4iLCJhIjoiY2w3OHI1a293MGI4aTNxbzh1dHI5b2owaSJ9.RSbIOzGoHc8JnKvgyIWZ4w";

const Mapwraper = () => {

  return (
   <>
   <Map
        initialViewState={{
          longitude: 0,
          latitude: 0,
          zoom: 0
        }}
        style={{width:"100%" , height:"100vh"}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={TOKEN}
      >
        <GeocoderControl mapboxAccessToken={TOKEN} position="top-left"  />
        <GeolocateControl  />
      </Map>
   </>
  )
}

export default Mapwraper
