import React from 'react'
import './Loader.css'

const Loader = () => {
  return (
    <div className='LoaderContainer z-10 w-screen h-screen bg-white flex items-center justify-center bg-white fixed inset-0'>
        <div className="loader"></div>
    </div>
  )
}

export default Loader