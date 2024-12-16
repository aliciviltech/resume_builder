'use client'
import React, { createContext, ReactNode, useState } from 'react'

interface ContextType {
  selectedTemplate: string|null , 
  setSelectedTemplate: React.Dispatch<React.SetStateAction<string | null>> 
}
export const TemplateContextValue = createContext<ContextType >({
  selectedTemplate: null , 
  setSelectedTemplate: ()=>{},
})

const TemplateContext = ({children}:{children:ReactNode}) => {
    const [selectedTemplate, setSelectedTemplate] = useState<string|null>('')

  return (
    <TemplateContextValue.Provider value={{selectedTemplate, setSelectedTemplate}}>
        {children}
    </TemplateContextValue.Provider>
  )
}

export default TemplateContext