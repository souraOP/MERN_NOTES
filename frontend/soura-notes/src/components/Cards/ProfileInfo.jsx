import React from 'react'
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({ onLogout, userInfo}) => {
  return (
    userInfo && <div className='flex items-center gap-3'>
      <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-800 font-semibold bg-slate-200/90'>
        {getInitials(userInfo.fullName)}
      </div>
      <div>
        <p className='text-md font-medium '>
          {userInfo.fullName}
        </p>
        <button onClick={onLogout} className='text-sm text-slate-800 underline'>
          Logout
        </button>
      </div>
    </div>
  )
}

export default ProfileInfo;