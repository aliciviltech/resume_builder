'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { PrimaryButton } from '../Button/Button'
import Image from 'next/image'
import Loader from '../Loader/Loader'

const Hero = () => {
  const [showLoader, setShowLoader] = useState<boolean>(false);
  return (
    <div className='Hero min-h-[calc(100vh-160px)] flex items-center mt-10 sm:flex-col sm:h-[calc(100vh-120px)] xl:flex-row xl:w-[90%] xl:m-auto xl:max-h-[calc(100vh-80px)] xl:flex sm:overflow-hidden'>
      <div className="leftCol p-8  flex flex-col justify-center  gap-7 sm:w-[90%] xl:w-[50%] xl:pl-10">
        <h1 className='headingH1'>Create a <span className='themeTextT1'>resume</span> that secures your <span className='themeTextT1'>dream job</span></h1>
        <p>Build a resume thats piques the interest of recruiters and gets you hired. {`It's`} fast and easy to use.</p>
        <Link href={'/pages/templates'} onClick={() => setShowLoader(true)}><PrimaryButton text='Try for free' /></Link>
      </div>
      <div className="rightCol hidden sm:block xl:w-[50%] ">
        <Image className='w-[100%] mt-20 xl:mt-20' src="/images/hero2.png" alt="hero_img" width={500} height={500} />
      </div>
      {
        showLoader && <Loader />
      }
    </div>
  )
}

export default Hero