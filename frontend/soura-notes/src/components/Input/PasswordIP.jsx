import React, { useState } from 'react'
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";

export default function PasswordIP({value, onChange, placeholder}) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const showPasswordSwitch = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className='flex items-center bg-transparent border-[1px] border-dashed px-4 rounded-md mb-3'>
      <input value={value} onChange={onChange} type={isShowPassword ? "text" : "password"} placeholder={placeholder || "Password"}
             className = "w-full text-lg bg-transparent py-3 rounded-md outline-none mr-3"
      />

      {isShowPassword ? ( <RxEyeOpen size={24} className='text-lg cursor-pointer' onClick={showPasswordSwitch} /> )
        : (<RxEyeClosed size={24} className='text-lg text-slate-400 cursor-pointer' onClick={showPasswordSwitch} />)
      }
    </div>
  )
}
