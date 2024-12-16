"use client"
import React, { useContext, useEffect, useState } from 'react'
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { ToastContainer,toast } from 'react-toast';
import './ResumeForm.css'
import Header from '@/app/components/Header/Header';
import Loader from '@/app/components/Loader/Loader';
import { templateImages } from '@/utils/templates';
import {  Inputs } from '@/utils/dummyUserData';
import Image from 'next/image';
import { UserContextValue } from '@/app/context/UserContext';


const ResumeForm = () => {
  const userContextValue = useContext(UserContextValue);
  const setFormData = userContextValue.setFormData;

  const [selectedTemplate, setSelectedTemplate] = useState<string|null>(null)
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string | null | ArrayBuffer>();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1970 + 1 }, (_, i) => 1970 + i);
  const [dateInputType, setDateInputType] = useState('text')

  // set date input type
  const handleDateType=(e:React.ChangeEvent<HTMLInputElement>)=>{
    if(!e.target.value){
      setDateInputType('text')
    }
  }

  const [inputs] = useState({
    name: '',
    profession: '',
    summary: '',
    dob: '',
    nationality: '',
    phone: '',
    email: '',
    linkedin: '',
    address: '',
    education: [
      {
        degree: '',
        subject: '',
        startingYear: '',
        endingYear: '',
        institute: '',
        grade: '',
      }
    ],
    skills: [{ name: '' }],
    languages: [{ name: '' }],
    experience: [{
      organization: '',
      jobDescription: '',
      startingYear: '',
      endingYear: ''
    }]
  });

  

  const { register, handleSubmit,reset,control } = useForm<Inputs>({
    defaultValues: inputs
  });
  const { fields: educationFields, append: addEducation, remove: removeEducation } = useFieldArray<Inputs, "education">({
    control,
    name: 'education',
  })
  const { fields: skillsFields, append: addSkills, remove: removeSkills } = useFieldArray<Inputs, "skills">({
    control,
    name: 'skills',
  })
  const { fields: languagesFields, append: addLanguage, remove: removeLanguage } = useFieldArray<Inputs, "languages">({
    control,
    name: 'languages',
  })
  const { fields: experienceFields, append: addExperience, remove: removeExperience } = useFieldArray<Inputs, "experience">({
    control,
    name: 'experience',
  })

  useEffect(()=>{
    if(userContextValue){
      // setValue(userContextValue.formData)
      reset(userContextValue.formData?.formData);
    }
  },[userContextValue])

  const submitAlert = ()=> toast.success('Submitted')

  const submitDataF: SubmitHandler<Inputs> = (data) => {
    if (selectedTemplate) {
      const userData = { template: selectedTemplate, imageURL: selectedImage, formData: data };
      setFormData(userData)
      // save data to local storage
      localStorage.setItem('userData', JSON.stringify(userData))
      submitAlert()
    }
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first selected file
    if (file) {
      // Create an object URL for the selected file
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        setSelectedImage(fileReader.result)
      }
    }
  };


  // ===================== selected template ==========================
  useEffect(()=>{
    const template = localStorage.getItem('selectedTemplate');
    setSelectedTemplate(template);
  },[])




  
  return (
    <div className='ResumeForm'>
      <Header  setShowLoader={setShowLoader} />
      <div className="ResumeFormContainer">
        <h1 className='headingH4 text-center '>Resume Builder Form</h1>
        {/* <h1>{selectedImage}</h1> */}

        {/* ====================== form ================================ */}
        <form onSubmit={handleSubmit(submitDataF)} className="w-[50%]  m-auto mt-10 flex flex-col">

          <div className={`upperSection flex flex-row-reverse ${selectedTemplate === 'classic' ? "justify-center" : "justify-between"}  items-end`}>
            {
              // =================== selected template ======================
              selectedTemplate &&
              <div className="selectedTemplate flex flex-col justify-center items-center">
                <h1 className='headingH2'>Your selected template: <span className='border-b-2 border-[var(--primaryColor)]'>{selectedTemplate.toUpperCase()}</span></h1>
                <Image className='w-[200px] border-2 border-orange-500 mt-5 p-2' src={templateImages[selectedTemplate]} alt="templateImg" width={300} height={300} />
              </div>
            }
            {
              selectedTemplate !== 'classic'
              &&
              <div className="picture">
                <div className="pictureContainer">
                  {
                    selectedImage ?
                      <Image src={`${selectedImage}`} alt="uploadimage" width={200} height={300} />
                      :
                      <Image src="/images/emptyProfile.jpg" alt="uploadImage" width={200} height={300} />
                  }

                </div>
                <div className="pictureRequirements">
                  <ul>
                    <li>The picture should be professional with clear face</li>
                    <li>Avoid casual clothing, accessories, or backgrounds</li>
                    <li>The photo should be a headshot, focusing on the upper part of your body {'(head and shoulders)'}</li>
                    <li>Keep photo editing minimal to retain a natural look</li>
                    <li>The picture should be up-to-date, ideally taken within the last year</li>
                    <li><input {...register("image", { required: true })} type="file" onChange={handleFileChange} /></li>
                  </ul>
                </div>
              </div>
            }

          </div>


          <div className="sectionTitle">Basic Info</div>
          <div className="basicInfo">
            <input  {...register("name", { required: true })} className='border border-[#ccc] px-2' placeholder='Name' />
            <input  {...register("profession", { required: true })} className='border border-[#ccc] px-2' placeholder='Profession' />
            <input  {...register("summary",)} className='border border-[#ccc] px-2' placeholder='Summary' />
            <input type={dateInputType} {...register("dob",)} className='border border-[#ccc] px-2' placeholder='Date of birth' onFocus={() => { setDateInputType('date') }} onBlur={handleDateType} />
            <input  {...register("nationality",)} className='border border-[#ccc] px-2' placeholder='Nationality' />
            <input  {...register("phone",)} className='border border-[#ccc] px-2' placeholder='Phone' />
            <input  {...register("email",)} className='border border-[#ccc] px-2' placeholder='Email' />
            <input  {...register("linkedin",)} className='border border-[#ccc] px-2' placeholder='LinkedIn account link' />
            <input  {...register("address",)} className='border border-[#ccc] px-2' placeholder='Address' />
          </div>


          {/* ============================ Education ================================ */}

          <div className="sectionTitle">Education <span className='text-gray-500 text-[16px]'>{"(Start from higher degree)"}</span> </div>
          <div className="education">
            {
              educationFields.map((item, index) => {
                return (
                  
                    <div key={item.id} className="educationInputs">
                      <select  {...register(`education.${index}.degree`)} >
                        <option value="" selected>Select Degree</option>
                        <option value="matric">Matric</option>
                        <option value="inter">Inter</option>
                        <option value="diploma">Diploma</option>
                        <option value="bachelors">Bachelors</option>
                        <option value="masters">Masters</option>
                        <option value="mphil">MPhil</option>
                        <option value="phd">PHD</option>
                      </select>
                      <select {...register(`education.${index}.startingYear`)} >
                        <option value={''} disabled selected >Starting year</option>
                        {
                          years.map((year, index) => <option key={index} value={year}>{year}</option>)
                        }
                      </select>
                      <select {...register(`education.${index}.endingYear`)} >
                        <option value={''} disabled selected  >Ending year</option>
                        {
                          years.map((year, index) => <option key={index} value={year}>{year}</option>)
                        }
                        <option value={'Continue...'} >Continue...</option>
                      </select>
                      <input   {...register(`education.${index}.subject`)} className='border border-[#ccc] px-2' placeholder='Subject' />
                      <input   {...register(`education.${index}.grade`)} className='border border-[#ccc] px-2' placeholder='Grade/Division' />
                      {
                        index > 0 &&
                        <button className='removeButton' onClick={() => { removeEducation(index) }}>Remove Education</button>
                      }
                    </div>
                  
                )
              })
            }

            <button className='addButton' onClick={() => { addEducation(inputs.education[0]) }}>Add Education</button>
          </div>

          {/* ============================ Skills ================================ */}
          <div className="sectionTitle">Skills </div>
          <div className="skills">
            {
              skillsFields.map((item, index) => {
                return (

                  <div key={item.id} className="skillsInputs">
                    <input   {...register(`skills.${index}.name`)} className='border border-[#ccc] px-2' placeholder='Skill' />
                    {
                      index > 0 &&
                      <button className='removeButton' onClick={() => { removeSkills(index) }}>Remove Skill</button>
                    }
                  </div>

                )
              })}
            <button className='addButton' onClick={() => { addSkills(inputs.skills[0]) }}>Add Skill</button>

          </div >

          {/* ============================ Experience ================================ */}
          <div className="sectionTitle">Experience </div>
          <div className="experience">
            {
              experienceFields.map((item, index) => {
                return (
                  
                    <div key={item.id} className="experienceInputs">
                      <input   {...register(`experience.${index}.organization`)} className='border border-[#ccc] px-2' placeholder='Organization' />
                      <input   {...register(`experience.${index}.jobDescription`)} className='border border-[#ccc] px-2' placeholder='Job description' />
                      <select {...register(`experience.${index}.startingYear`)} >
                        <option value={''} disabled selected >Starting year</option>
                        {
                          years.map((year, index) => <option key={index} value={year}>{year}</option>)
                        }
                      </select>
                      <select {...register(`experience.${index}.endingYear`)} >
                        <option value={''} disabled selected  >Ending year</option>
                        {
                          years.map((year, index) => <option key={index} value={year}>{year}</option>)
                        }
                        <option value={'Continue...'} >Continue...</option>
                      </select>
                      {
                        index > 0 &&
                        <button className='removeButton' onClick={() => { removeExperience(index) }}>Remove Experience</button>
                      }
                    </div>
                  
                )
              })}
            <button className='addButton' onClick={() => { addExperience(inputs.experience[0]) }}>Add Experience</button>

          </div >


                    {/* ============================ languages ================================ */}
                    <div className="sectionTitle">Languages </div>
          <div className="languages">
            {
              languagesFields.map((item, index) => {
                return (

                  <div key={item.id} className="languagesInputs">
                    <input   {...register(`languages.${index}.name`)} className='border border-[#ccc] px-2' placeholder='Language' />
                    {
                      index > 0 &&
                      <button className='removeButton' onClick={() => { removeLanguage(index) }}>Remove Skill</button>
                    }
                  </div>

                )
              })}
            <button className='addButton' onClick={() => { addLanguage(inputs.languages[0]) }}>Add Language</button>

          </div >




          <button className='submitButton'>Submit</button>
        </form>

        <ToastContainer position='top-center' delay={6000}/>


        {
          showLoader && <Loader />
        }

      </div>


    </div>


  )
}

export default ResumeForm