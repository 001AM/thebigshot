import React from 'react'
import logo from '../assets/logo.svg'
export default function Navbar() {
  return (
    <div className='text-black bg-white rounded-sm' style={{boxShadow:'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px'}}>
      <div className='flex flex-row flex-1 p-2 h-14'>
        <img src={logo} className='h-full' alt='logo'/>
        <div className='w-2/5 ml-28'>
          <input type="text" className='h-full border-2 rounded-md border-slate-700'/>
        </div>
      </div>
      
    </div>
  )
}
