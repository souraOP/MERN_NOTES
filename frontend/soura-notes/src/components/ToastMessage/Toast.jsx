import React, {useEffect} from 'react'
import {LuCheck} from 'react-icons/lu';
import { MdDeleteOutline } from 'react-icons/md';

const Toast = ({isShown, message, type, onClose}) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    }
  }, [onClose]);

  return (
    <div className={`absolute top-24 right-6 transition-all duration-400 ${isShown ? "opacity-100" : "opacity-0"}`}>
      <div className={`min-w-52 bg-white border shadow-2xl rounded-md after:w-[5px] after:h-full ${type === "delete" ? "after:bg-red-500" : "after:bg-green-500"} after:absolute after:left-0 after:top-0 after:rounded-l-lg`}>
        <div className='flex items-center px-4 py-2 gap-3'>
          <div className={`flex items-center w-10 h-10 rounded-full justify-center ${type === "delete" ? "bg-red-100" : "bg-green-100"}`}>
            {type === "delete" ? (<MdDeleteOutline className='text-xl text-red-500'/>) : (<LuCheck className='text-xl text-green-400'/>)}
          </div>

          <p className=' text-slate-600'>{message}</p>
        </div>
      </div>
    </div>
  )
}

export default Toast 