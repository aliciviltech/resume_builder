import React from 'react'
import { PrimaryButton } from '../Button/Button'

export const PrimaryModal = ({text}:{text:string}) => {
  return (
    <div className='PrimaryModal flex flex-col items-center w-3/4 h-96 bg-white lg:w-1/4 '>
        {text}
        <PrimaryButton text='Close'/>
    </div>
  )
}
