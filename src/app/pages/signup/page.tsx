"use client"
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { auth, createUserWithEmailAndPassword } from '@/app/firebase/firebaseConfig';
import Link from 'next/link';

type Inputs = {
    email: string,
    password: string,
};

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    // signup
    const signupF: SubmitHandler<Inputs> = (data)=>{
        const {email, password}=data
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user)
                alert('signup success')
                // ...
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
                // ..
            });
    }
    return (
        <div className='Signup'>
            <h1 className='text-center text-lg font-bold mt-[50px]'>Signup Form</h1>
            <form onSubmit={handleSubmit(signupF)} className="w-[50%] m-auto mt-10 flex flex-col">
                {/* register your input into the hook by invoking the "register" function */}
                <input  {...register("email", { required: true })} className='border border-[#ccc] px-2' placeholder='Email' />
                {errors.email && <span className='text-red-500 text-[12px]'>This field is required</span>}


                {/* include validation with required or other standard HTML validation rules */}
                <input {...register("password", { required: true })} className='mt-2 border border-[#ccc] px-2' placeholder='Password' />
                {/* errors will return when field validation fails  */}
                {errors.password && <span className='text-red-500 text-[12px]'>This field is required</span>}

                <input type="submit"   className='mt-5 bg-green-400 rounded-md text-[#fff] cursor-pointer' />

                <p className='mt-2 text-[14px]'>Already registered? <Link href={'/pages/signin'} className=' underline text-blue-500'>signin</Link></p>
            </form>
        </div>
    )
}

export default Signup