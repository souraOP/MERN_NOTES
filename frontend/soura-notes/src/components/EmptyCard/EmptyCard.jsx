import React from 'react'

const EmptyCard = ({imgSrc, message}) => {
  return (
    <div className='flex flex-col items-center justify-center mt-20'>
        <img src={imgSrc} alt="empty" className='w-60'/>

        <p className='w-1/2 text-slate-200 text-lg font-medium text-center leading-7 mt-5'>{message}</p>
    </div>
  )
}

export default EmptyCard