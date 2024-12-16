import React from 'react'

export const Button = ({text}:{text:string}) => {
  return (
    <div className='Button w-[200px] bg-white py-3 text-black rounded-lg cursor-pointer ' >
        {text}
    </div>
  )
}
export const PrimaryButton = ({text}:{text:string} )=>{
  return(
    <div className="SecondaryButton w-[250px] cursor-pointer text-center bg-[var(--primaryColor)] text-white px-8 py-2 rounded-3xl "> {text} </div>
  )
}
export const SecondaryButton = ({text}:{text:string} )=>{
  return(
    <div className="SecondaryButton w-fit bg-[var(--primaryColor)] text-white px-8 py-2 rounded-3xl"> {text} </div>
  )
}
export const TertiaryButton = ({text}:{text:string} )=>{
  return(
    <div className="SecondaryButton w-fit bg-white text-black px-8 py-2 rounded-3xl border border-[var(--primaryColor)]"> {text} </div>
  )
}