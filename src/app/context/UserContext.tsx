'use client'
import { dummyUserData, formDataType } from '@/utils/dummyUserData';
import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { auth, onAuthStateChanged, signOut } from '@/app/firebase/firebaseConfig'

interface UserData {
    isLogin:boolean | string, 
    uid:string,
    email:string,
    name:string
}

interface UserContextType{
    formData:formDataType|null,
    setFormData:React.Dispatch<React.SetStateAction<formDataType|null>>
    userLoginData: UserData,
    signoutF:()=>void
}
export const UserContextValue = createContext<UserContextType>({
    formData:{template:'', formData:dummyUserData},
    setFormData:()=>{},
    userLoginData:{isLogin: 'pending', uid:'', email:'', name:'' },
    signoutF:()=>{}
});

const UserContext = ({ children }: { children: ReactNode }) => {
    const [formData, setFormData] = useState<formDataType | null>(null);
    const [userLoginData, setUserLoginData] = useState<UserData>({isLogin:'pending', uid:'', email:'', name:'' });

    // check User
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
                if (user) {
                  setUserLoginData({isLogin: true, uid:user.uid, email:user.email!, name:user.displayName! })
                } else {
                  setUserLoginData({isLogin: false, uid:'', email:'', name:'' })
                  console.log('signed out')
                }
        });
    },[])

    
    // signout
    const signoutF = ()=>{
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            console.log(error)
          });
    }

    
    
    
    useEffect(()=>{
        const userDataString = localStorage.getItem('userData');
        const userData = userDataString && JSON.parse(userDataString);
        setFormData(userData);
    },[])

    return (
        <UserContextValue.Provider value={{formData, setFormData, userLoginData, signoutF}}>
            {children}
        </UserContextValue.Provider>
    )
}

export default UserContext