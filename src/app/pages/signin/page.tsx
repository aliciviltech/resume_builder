"use client"
import React, { useEffect } from 'react'
import './Signin.css'
import { useForm, SubmitHandler } from "react-hook-form";
import { auth, onAuthStateChanged, signInWithEmailAndPassword } from '@/app/firebase/firebaseConfig'
import Link from 'next/link';
import Image from 'next/image';


type Inputs = {
  email: string,
  password: string,
};


const Signin = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const signinF: SubmitHandler<Inputs> = (data) => {
    const { email, password } = data
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  const checkState = () => {
    console.log('this is check state function')
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        
        // window.location.href = "/pages/dashboard"
        console.log('signed in')
      } else {
        console.log('signed out')
      }
    });
  }
  useEffect(() => {
    checkState()
  })
  return (
    

    <div className="Signin">


      <div className="contentArea">

      <div className="welcomeNote">
      <h1 className='headingH4'>Welcome Back !</h1>
      <p>Enter your credentials to access your account</p>
      </div>


      <form onSubmit={handleSubmit(signinF)} className="form">
        <input  {...register("email", { required: true })} placeholder='Email' />
        {errors.email && <span className='text-black mb-2 text-[12px] text-red-500'>* This field is required</span>}

        <input type='password' {...register("password", { required: true })}  placeholder='Password' />
        {errors.password && <span className='text-black text-[12px] text-red-500'>* This field is required</span>}
        
        <button className='loginBtn'>Log in</button>

      </form>

      <div className="borderLine"></div>

<div className="socialBtnContainer">
      <button className='socialBtn'> <Image src="/images/google_icon.png" alt='icon' width={100} height={100}/> Signin with Google</button>
      <button className='socialBtn'> <Image src="/images/fb_icon.png" alt='icon' width={100} height={100}/> Signin with Facebook</button>
</div>
        <p className='mt-2 text-[14px] text-center '>{"Don't"} have account? <Link href={'/pages/signin'} className=' underline '>Signup</Link></p>

      </div>
      </div>



  )
}

export default Signin