import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div className='py-52 my-7 text-center bg-[#0a3d62] text-[#d4af37] w-10/12 mx-auto rounded-xl'>
      <h1 className=' text-4xl font-bold'>ERROR - 404</h1>
      <p className='text-lg mt-5 text-gray-400 font-semibold'>Pages Are Not Found</p>
      <p className='text-lg mt-5 text-gray-400 font-semibold'>Please go to - <Link to='/' className='border-b-2 text-[#d4af37] border-[#d4af37]'>Home</Link></p>
    </div>
  )
}