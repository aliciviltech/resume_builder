'use client'
import React, { useState } from 'react'
import './globals.css'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Loader from './components/Loader/Loader'

const page = () => {

  const [showLoader, setShowLoader] = useState<boolean>(false)
  
  return (
    <div className='Home'>


      <Header showLoader={showLoader} setShowLoader={setShowLoader}/>
      <Hero/>
      {
        showLoader && <Loader/>
      }
  
    </div>
  )
}

export default page