import React from 'react'

export default function TaskCard({data}) {

const {_id,yourName,email,title,category,description,timestamp} = data;

  return (
  <div className="card bg-base-100 w-full shadow-xl">
  <div className="card-body">
    <h2 className="card-title text-gray-900">{title}</h2>
    <p className='text-gray-800'>{description}</p>
    {category === 'Done' ? <p className='text-green-700 font-bold'>{category}</p>:<p className='text-red-600 font-bold'>{category}</p>}
    
    <p className='text-gray-800'>{timestamp}</p>
  </div>
  </div>

  )
}