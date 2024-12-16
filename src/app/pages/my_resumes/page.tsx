'use client'
import Executive from '@/app/components/Executive/Executive'
import Header from '@/app/components/Header/Header'
import React, { useContext, useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import Loader from '@/app/components/Loader/Loader'
import { UserContextValue } from '@/app/context/UserContext'
import Classic from '@/app/components/Classic/Classic'
import Vintage from '@/app/components/Vintage/Vintage'

const page = () => {
  const cvContainer = useRef<HTMLDivElement>(null)
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const userContextValue = useContext(UserContextValue);
  const {formData} = userContextValue;

  // ==================== handle print =========================
  const handlePrint = async () => {
    setShowLoader(true)
    const inputData = cvContainer.current;
    if (inputData) {
      try {
        const originalStyles = inputData.style.cssText;
        const fixedWidth = 1025; // Desired fixed width in pixels
        inputData.style.width = `${fixedWidth}px`; // Apply the fixed width
        inputData.style.transform = `scale(1)`; // Prevent scaling

        // Capture the content with html2canvas
        const canvas = await html2canvas(inputData, {
          scale: 4, // No additional scaling by html2canvas
        });

        // Restore original styles after capturing
        inputData.style.cssText = originalStyles;

        const imgData = canvas.toDataURL('image/png')

        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: 'a4',
        })

        const width = doc.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;

        doc.addImage(imgData, 'PNG', 0, 0, width, height);
        doc.save('cv.pdf');
        setShowLoader(false)

      } catch (error) {
        setShowLoader(false)
        console.log(error)
      }
    }
  }

  return (
    <>
      <Header showLoader={showLoader} setShowLoader={setShowLoader} />

      <div className='myResumes flex flex-col items-center justify-center mt-10'>
        <div className='text-lg w-[90%] mx-auto flex justify-between my-10'>
          <span>My Resume</span>
          <span className='cursor-pointer' onClick={handlePrint}> <i className='fa-solid fa-print'></i> Print</span>
        </div>


      {
        formData?.template === 'classic' ?
        <div ref={cvContainer} className="resumeContainer w-[90%] m-auto">
          <Classic />
        </div>
        :
        formData?.template === 'executive' ?
        <div ref={cvContainer} className="resumeContainer w-[90%] m-auto">
          <Executive />
        </div>
        : 
        <div ref={cvContainer} className="resumeContainer w-[90%] m-auto">
          <Vintage />
        </div>
      }

      </div>

      {
        showLoader && <Loader/>
      }


    </>
  )
}

export default page