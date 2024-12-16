'use client'
import { dummyUserData, formDataType } from '@/utils/dummyUserData';
import React, { createContext, ReactNode, useEffect, useState } from 'react'

interface UserContextType{
    formData:formDataType|null,
    setFormData:React.Dispatch<React.SetStateAction<formDataType|null>>
}
export const UserContextValue = createContext<UserContextType>({
    formData:{template:'', formData:dummyUserData},
    setFormData:()=>{}
});

const UserContext = ({ children }: { children: ReactNode }) => {
    const [formData, setFormData] = useState<formDataType | null>(null);

    useEffect(()=>{
        const userDataString = localStorage.getItem('userData');
        const userData = userDataString && JSON.parse(userDataString);
        setFormData(userData);
    },[])

    return (
        <UserContextValue.Provider value={{formData, setFormData}}>
            {children}
        </UserContextValue.Provider>
    )
}

export default UserContext