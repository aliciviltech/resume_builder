import Link from 'next/link'
import React, { useState } from 'react'
import {SecondaryButton, TertiaryButton } from '../Button/Button'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const Header = ({setShowLoader}:{setShowLoader: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [hideMenu, setHideMenu] = useState<boolean>(true) 
    const path = usePathname();
    const handleLoader = (currentPath:string)=>{
        if(path !== currentPath){
            setShowLoader(true)
        }        
    }
    return (
        <div className='Header w-screen justify-between px-4 h-[60px] sm:w-[90%]  m-auto flex items-center mt-5 relative'>
            <Link href={'/'} onClick={()=>{handleLoader('/')}}>
                <div className="logo"><Image className='w-[150px]' src={'/images/logo_orange.png'} alt='logo_pic' width={200} height={100}/></div>
            </Link>
            <div className={`nav ${hideMenu && "hidden"} bg-black text-white z-10 absolute top-14 right-0 flex flex-col gap-4 p-10 xl:static xl:p-0 xl:bg-transparent xl:text-black xl:flex xl:flex-row xl:gap-10 items-center`}>
                <Link href='/pages/my_resumes' onClick={()=>{handleLoader('/pages/my_resumes')}}>My Resumes</Link>
                <Link href='/pages/templates' onClick={()=>{handleLoader('/pages/templates')}}>Templates</Link>
                <div className="buttons flex flex-col xl:flex-row gap-5">
                    <Link href='/pages/signin' onClick={()=>{handleLoader('/pages/signin')}}> <TertiaryButton text='Sign in' /> </Link>
                    <Link href='/pages/signup' onClick={()=>{handleLoader('/pages/signup')}}> <SecondaryButton text='Sign up' /></Link>
                </div>
            </div>
            <div className="menuBars xl:hidden" onClick={()=>{setHideMenu(!hideMenu)}}><i className='fa-solid fa-bars'></i></div>
        </div>
    )
}

export default Header