import React, { useContext, useEffect, useRef } from 'react'
import './Executive.css'
import { dummyUserData } from '@/utils/dummyUserData'
import html2canvas from 'html2canvas'
import Image from 'next/image'
import { UserContextValue } from '@/app/context/UserContext'




const Executive = () => {
  const userContextValue = useContext(UserContextValue);
  const {formData} = userContextValue;
  const { name, address,profession, summary, education, skills, experience } = formData ? formData.formData : dummyUserData;

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
    <div ref={captureRef} className="Executive">

      {/* ==================== header ====================== */}
      <div className="header">
        <h1 className='name' >{name}</h1>
        <h3 className='profession'>{profession}</h3>
      </div>

      {/* ===================== main body =================== */}
      <div className="mainBody">
        <div className="leftCol">

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

        {/* ================================= right side ================================== */}

        <div className="rightCol">
          <div className="image">
            <Image src={'/images/pic_ai.jpeg'} alt='' width={200} height={200} />
          </div>
          <div className="personal section">
            <div className='sectionTitle'>Personal Info</div>
            <div className='sectionContent'>
              <div className="subSection">
                <p className='font-bold mb-2'>Address</p>
                <p className='mb-2'>{address}</p>
              </div>
              <div className="subSection">
                <p className='font-bold mb-2'>Address</p>
                <p className='mb-2'>House No B-43 Garden City Society Ameen Hospital Road Karachi</p>
              </div>
              <div className="subSection">
                <p className='font-bold mb-2'>Address</p>
                <p className='mb-2'>House No B-43 Garden City Society Ameen Hospital Road Karachi</p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Executive