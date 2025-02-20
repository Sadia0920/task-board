import React from 'react'
import { NavLink} from 'react-router-dom'

export default function Home() {
  
  return (
    <div className='w-10/12 mx-auto my-4'>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-6'>
    <div className='md:min-h-screen bg-slate-300'>
      <ul className='menu'>
        <li>To-Do</li>
      </ul>
    </div>
    <div className='md:min-h-screen bg-slate-300'>
    <ul className='menu'>
        <li>In Progress</li>
      </ul>
    </div>
    <div className='md:min-h-screen bg-slate-300'>
    <ul className='menu'>
        <li>Done</li>
    </ul>
    </div>
    </div>
    </div>
  )
}