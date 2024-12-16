import Image from 'next/image'
import React from 'react'

const MyResumeThumbnail = ({thumbnailSRC}:{thumbnailSRC:string}) => {
  return (
    <div className='MyResumeThumbnail p-2 rounded-sm'>
        {
            thumbnailSRC &&
            <Image className='w-[300px] h-[350px]' src={thumbnailSRC} alt='thumbnail' width={500} height={700} />
        }
    </div>
  )
}

export default MyResumeThumbnail