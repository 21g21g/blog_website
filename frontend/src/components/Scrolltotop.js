import React, { useEffect } from 'react'
import {useLocation}  from "react-router-dom"

const Scrolltotop = () => {
    const {pathName}=useLocation()
    useEffect(()=>{
        window.scroll(0,0)

    },[pathName])
  return (
    <div>
      
    </div>
  )
}

export default Scrolltotop
