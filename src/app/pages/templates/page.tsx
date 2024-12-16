'use client'
import React, { useContext, useState } from 'react'
import './template.css'
import Header from '@/app/components/Header/Header'
import { TemplateContextValue } from '@/app/context/TemplateContext'
import { PrimaryButton, SecondaryButton } from '@/app/components/Button/Button'
import Link from 'next/link'
import Loader from '@/app/components/Loader/Loader'
import { UserContextValue } from '@/app/context/UserContext'

const page = () => {
    // context: UserContext
    const userContextValue = useContext(UserContextValue);
    const [changeTemplate, setChangeTemplate] = useState(false)
    
    const [showLoader, setShowLoader] = useState<boolean>(false)
    const { selectedTemplate, setSelectedTemplate } = useContext(TemplateContextValue);

    // select template
    const selectTemplateF = (templateTitle: string) => {
        if(userContextValue.formData?.template === templateTitle){
            alert(`Template ${templateTitle} is already created. Go to "My Resume" page`)
            return
        }
        setSelectedTemplate(templateTitle)
        window.scrollTo({
            top:0,
            behavior:"smooth",
        })
    }
    // save template to local storage
    const saveTemplateF = () => {
        selectedTemplate && localStorage.setItem('selectedTemplate', selectedTemplate);
    }
    return (
        <>
            <Header showLoader={showLoader} setShowLoader={setShowLoader} />
            <div className='templatesComp'>
                <h1 className='headingH4'>Select any template you like!</h1>
                <p className='px-4 md:w-[70%] xl:w-[60%]'>Choose from one of our expertly prepared resume types below, by using pre-established parts that have been endorsed by recruiters internationally.</p>


                {/* ============ template selection confirmation =========== */}
                {
                    userContextValue && !changeTemplate ?
                    <div className="selectionContainer  flex-col flex justify-center items-center gap-5">
                        <h1 className='headingH2'>You have already created your resume in template: <span className='text-[var(--primaryColor)]'>{userContextValue.formData?.template.toUpperCase()}</span> </h1>
                        <Link href={'/pages/my_resumes'} onClick={() => { setShowLoader(true) }}>
                        <SecondaryButton text='Go to Resume' />
                        </Link>
                        <h1>Or</h1>
                        <Link href={''} onClick={()=>setChangeTemplate(true)}>
                            <PrimaryButton text='Change Template' />
                        </Link>
                    </div>
                    :
                    selectedTemplate &&
                    <div className="selectionContainer flex-col flex justify-center items-center gap-5">
                        <h1 className='headingH2'>Your selected template: <span className='border-b-2 border-[var(--primaryColor)]'>{selectedTemplate.toUpperCase()}</span></h1>
                        <Link href={'/pages/resume_form'} onClick={() => { saveTemplateF(), setShowLoader(true) }}><SecondaryButton text='Continue' /></Link>
                    </div>
                }


                {/* =================== all template cards ===================== */}

                <div className="allTemplates flex justify-center flex-wrap gap-10 mt-3">
                    <div className="templateContainer flex flex-col gap-5">
                        <div className="templateTitle headingH2 border-b-2 border-[var(--primaryColor)]">Classic</div>
                        <div className="templateCard" onClick={() => { selectTemplateF('classic') }}>
                            <div className="border1"></div>
                            <div className="border2"></div>
                            <img src="/images/classic.png" />
                        </div>
                    </div>

                    <div className="templateContainer flex flex-col gap-5">
                        <div className="templateTitle headingH2 border-b-2 border-[var(--primaryColor)]">Executive</div>
                        <div className="templateCard" onClick={() => { selectTemplateF('executive') }}>
                            <div className="border1"></div>
                            <div className="border2"></div>
                            <img src="/images/executive.png" />
                        </div>
                    </div>

                    <div className="templateContainer flex flex-col gap-5">
                        <div className="templateTitle headingH2 border-b-2 border-[var(--primaryColor)]">Vintage</div>
                        <div className="templateCard" onClick={() => { selectTemplateF('vintage') }}>
                            <div className="border1"></div>
                            <div className="border2"></div>
                            <img src="/images/vintage.jpg" />
                        </div>
                    </div>

                </div>

                {
                    showLoader &&
                    <Loader />
                }

            </div>
        </>
    )
}

export default page