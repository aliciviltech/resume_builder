import React, { useContext, useEffect, useRef } from 'react'
import { dummyUserData } from '@/utils/dummyUserData'
import html2canvas from 'html2canvas'
import { UserContextValue } from '@/app/context/UserContext'
import './Classic.css'


const Classic = () => {
    const userContextValue = useContext(UserContextValue);
    const {formData} = userContextValue;
    const { name, address, dob, email, linkedin, nationality, phone, profession, summary, education, skills, experience } = formData ? formData.formData : dummyUserData;

    // ========================= capture thumbnail ========================
    const captureRef = useRef<HTMLDivElement>(null);

    const captureAndResize = async () => {
        if (captureRef.current) {
            console.log('coming')
            const canvas = await html2canvas(captureRef.current);
            const thumbnail = document.createElement('canvas');
            const context = thumbnail.getContext('2d');
            const desiredWidth = 1000;
            const desiredHeight = 1000;

            // Set thumbnail dimensions
            thumbnail.width = desiredWidth;
            thumbnail.height = desiredHeight;
            context?.drawImage(canvas, 0, 0, desiredWidth, desiredHeight);
        }
    }
    useEffect(() => {
        captureAndResize();
    }, [])




    return (
        <div ref={captureRef} className="Classic">

            {/* ==================== header ====================== */}
            <div className="header">
                <h1 className='name' >{name}</h1>
                <h3 className='profession'>{profession}</h3>
            </div>

            {/* ===================== main body =================== */}
            <div className="mainBody">

                {/* basic info */}
                <div className="basicInfoSection section">
                    <div className='sectionTitle'>Basic Info</div>
                    <div className='sectionContent'>
                        
                            <div className='flex gap-10 mt-2'><span className='w-36 font-bold'>Date of birth:</span> <span>{dob}</span></div>
                            <div className='flex gap-10 mt-2'><span className='w-36 font-bold'>Phone:</span> <span>{phone}</span></div>
                            <div className='flex gap-10 mt-2'><span className='w-36 font-bold'>Email:</span> <span>{email}</span></div>
                            <div className='flex gap-10 mt-2'><span className='w-36 font-bold'>LinkedIn:</span> <span>{linkedin}</span></div>
                            <div className='flex gap-10 mt-2'><span className='w-36 font-bold'>Address:</span> <span>{address}</span></div>
                            <div className='flex gap-10 mt-2'><span className='w-36 font-bold'>Nationality:</span> <span>{nationality}</span></div>
                        
                    </div>
                </div>

                {/* summary */}
                <div className="summarySection section">
                    <div className='sectionTitle'>Summary</div>
                    <div className='sectionContent'>
                        {summary}
                    </div>
                </div>

                {/* experience */}
                <div className="experienceSection section">
                    <div className='sectionTitle'>Experience</div>
                    {
                        experience.map((exp, index) => {
                            return (
                                <div key={index} className='sectionContent tableForm flex gap-2 lg:gap-5'>
                                    <div className="col1 w-[14vmin] lg:min-w-32">{exp.startingYear}-{exp.endingYear}</div>
                                    <div className="col2 w-[20vmin] lg:min-w-48">{exp.organization}</div>
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

                {/* Skills */}
                <div className="skillsSection section">
                    <div className='sectionTitle'>Skills</div>
                    <div className='sectionContent flex h-[100px] gap:2 lg:gap-5'>
                        <ul className='list-disc list-inside flex flex-col flex-wrap gap-x-10'>
                            {
                                skills.map((skill,index) => {
                                    return (
                                        <li key={index}>{skill.name}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>

                {/* education */}
                <div className="educationSection section">
                    <div className='sectionTitle'>Education</div>
                    {
                        education.map((edu,index) => {
                            return (
                                <div key={index} className='sectionContent tableForm flex justify-between gap-2 lg:gap-5'>
                                    <div className="col1">{edu.startingYear}-{edu.endingYear}</div>
                                    <div className="col2">{edu.degree}-{edu.subject}</div>
                                    <div className="col3">{edu.institute}</div>
                                    <div className="col4" >Grade/Division - {edu.grade}</div>
                                </div>
                            )
                        })
                    }
                </div>


            </div>
        </div>
    )
}

export default Classic