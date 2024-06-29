import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { FaMagnifyingGlass } from 'react-icons/fa6'

export default function SearchBar({value, onChange, handleSearchNotes, onClearSearchNotes}) {
  return (
    <div className='flex items-center px-4 w-80 rounded-md bg-slate-200'>
        <input 
            type="text"
            placeholder="Search your notes"
            className = "w-full text-sm bg-transparent outline-none py-[11px]"
            value={value}
            onChange={onChange}
        />

        {value && <IoMdClose className='text-xl text-slate-400 cursor-pointer hover:text-black mr-4' onClick={onClearSearchNotes}/>}

        <FaMagnifyingGlass className=' text-slate-500 cursor-pointer hover:text-black' onClick={handleSearchNotes}/>
    </div>
  );
}
