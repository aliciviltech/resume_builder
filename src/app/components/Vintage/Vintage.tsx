import React, { useContext } from 'react'
import { dummyUserData } from '@/utils/dummyUserData'
import './Vintage.css'
import Image from 'next/image'
import { UserContextValue } from '@/app/context/UserContext'




const Vintage = () => {
    const userContextValue = useContext(UserContextValue);
  const {formData} = userContextValue;
    const { name, address, email, linkedin, phone, profession, summary, education, skills, experience, languages } = formData ? formData.formData : dummyUserData;


    return (
        <div className="Vintage">



            {/* ================================= left side ================================== */}

            <div className="leftCol">
                {
                    typeof userContextValue.formData?.imageURL === 'string' &&
                    <div className="image p-4">
                        <Image className=' w-[100%] rounded-full border-white border-[0.8vmin] lg:border-8' src={userContextValue.formData?.imageURL} alt='' width={250} height={250} />
                    </div>
                }

                {/* personal info */}
                <div className="personal section mt-[3vmin] lg:mt-24">
                    <div className='sectionTitleLeft border-white border-b lg:border-b-2 pb-2'>CONTACT</div>
                    <div className='sectionContent flex flex-col gap-[4px] lg:gap-2'>
                        <div className="subSection">
                            <p className='flex gap-[2vmin] lg:gap-5'> <i className='fa-solid fa-phone'></i> {phone}</p>
                        </div>
                        <div className="subSection">
                            <p className='flex gap-[2vmin] lg:gap-5'> <i className='fa-solid fa-envelope'></i> {email} </p>
                        </div>
                        <div className="subSection">
                            <p className='flex gap-[2vmin] lg:gap-5'> <i className='fa-solid fa-location-dot'></i> {address}</p>
                        </div>
                        <div className="subSection">
                            <p className='flex gap-[2vmin] lg:gap-5'> <i className='fa-brands fa-linkedin'></i> {linkedin}</p>
                        </div>
                    </div>
                </div>

                {/* Skills */}
                <div className="skillsSection section">
                    <div className='sectionTitleLeft border-white border-b lg:border-b-2 pb-2'>SKILLS</div>
                    <div className='sectionContent flex gap:2 lg:gap-5'>
                        <ul className='list-disc list-inside flex flex-col '>
                            {
                                skills.map((skill, index) => {
                                    return (
                                        <li key={index}>{skill.name}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>

                {/* languages */}
                <div className="languagesSection section">
                    <div className='sectionTitleLeft border-white border-b lg:border-b-2 pb-2'>LANGUAGES</div>
                    <div className='sectionContent flex gap:2 lg:gap-5'>
                        <ul className='list-disc list-inside flex flex-col '>
                            {
                                languages?.map((language, index) => {
                                    return (
                                        <li key={index}>{language.name}</li>    
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>

            </div>




            {/* ===================== right side =================== */}
   
            <div className="rightCol">


                {/* header */}
                <div className="header">
                    <h1 className='name' >{name}</h1>
                    <h3 className='profession'>{profession.toUpperCase()}</h3>
                    <div className="borderDiv"></div>
                </div>

                {/* summary */}
                <div className="summarySection section">
                    <div className='sectionTitle'>PROFILE</div>
                    <div className='sectionContent'>
                        {summary}
                    </div>
                </div>

                {/* experience */}
                <div className="experienceSection section">
                    <div className='sectionTitle'>WORK EXPERIENCE</div>
                    {
                        experience.map((exp, index) => {
                            return (
                                <div key={index} className='sectionContent tableForm flex gap-2 lg:gap-5'>
                                    <div className="col1">{exp.startingYear}-{exp.endingYear}</div>
                                    <div className="col2">{exp.organization}</div>
                                    <div className="col3">
                                        <ul className='list-disc list-inside'>
                                            <li>{exp.jobDescription}</li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>


                {/* education */}
                <div className="educationSection section">
                    <div className='sectionTitle'>Education</div>
                    {
                        education.map((edu, index) => {
                            return (
                                <div key={index} className='sectionContent tableForm flex gap-2 lg:gap-5'>
                                    <div className="col1">{edu.startingYear}-{edu.endingYear}</div>
                                    <div className="col2">{edu.degree}-{edu.subject}</div>
                                    <div className="col3">{edu.institute}</div>
                                    <div className="col4">Grade/Division - {edu.grade}</div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Vintage