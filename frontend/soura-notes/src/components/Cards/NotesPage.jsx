import React from 'react'
import { PiPushPin } from "react-icons/pi";
import { IoCreateOutline } from "react-icons/io5";
import { RiDeleteBin7Line } from "react-icons/ri";
import moment from 'moment';

export default function NotesPage({title, date, content, tags, isPinned, onEdit, onDelete, onPinNote}) {
  return (
    <div className=" border p-4 rounded-lg bg-slate-200 transition-all ease-in-out hover:shadow-[5px_5px_10px_2px_rgba(109,40,217)]">
        <div className='flex items-center justify-between'>
            <div>
                <h6 className=" font-medium text-lg">{title}</h6>
                <span className='text-sm text-slate-400'>{moment(date).format('Do MMM YYYY')}</span>
            </div>

            <PiPushPin className={`icon-btn ${isPinned ? 'text-green-500': 'text-slate-400'}`} onClick={onPinNote}/>

        </div>
        <p className='text-sm mt-4 text-slate-700'>{content?.slice(0, 70)}</p>
        <div className='flex items-center justify-between'>
            <div className='text-sm text-slate-500 mt-3'>
                {tags.map((item) => `#${item} `)}
            </div>
            <div className='flex items-center gap-2 mt-1'>
                <IoCreateOutline 
                    className='icon-btn hover:text-green-600'
                    onClick={onEdit}
                />
                <RiDeleteBin7Line 
                    className='icon-btn hover:text-red-600'
                    onClick={onDelete}
                />

            </div>
        </div>
    </div>
  )
}
