import React, { useCallback } from 'react'
import Map, { NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl} from 'react-map-gl';
import GeocoderControl from '../../../Services/GeocoderControl';
type PopupProperties ={
  longitude:number,
  latitude:number,
}
const TOKEN = "pk.eyJ1IjoiY2hhbm4iLCJhIjoiY2w3OHI1a293MGI4aTNxbzh1dHI5b2owaSJ9.RSbIOzGoHc8JnKvgyIWZ4w";

const Mapwraper = (props:any) => {
  const [popupContent,setPopupContent]= React.useState<PopupProperties | null>(null);
  const [updatedCorrds,setUpdatedCoords] = React.useState(Array<number>())

  React.useEffect (()=>{
    props.getCoords(updatedCorrds)
  },[updatedCorrds])

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
        <GeocoderControl mapboxAccessToken={TOKEN} position="top-left" setUpdatedCoords={setUpdatedCoords}  />
        <GeolocateControl  />
      </Map>
   </>
  )
}

export default Mapwraper
