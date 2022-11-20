import { Dialog } from 'primereact/dialog'
import React from 'react'
import Mapwraper from './Mapwraper'

const MapContainer = () => {
    const [showDialog,setShowDialog] = React.useState(false)
    const showDialogBox = ()=>{
        setShowDialog(true)
    }
    const hideDialogBox =()=>{
        setShowDialog(false)
    }
  return (
    <Dialog className='dialog-box' header="Select Project location"    visible={showDialog} maximizable modal style={{ width: '50vw' }}  onHide={hideDialogBox}>
        <Mapwraper />                          
    </Dialog>
  )
}

export default MapContainer
