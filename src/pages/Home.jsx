import React, { useState } from 'react'
import { NavLink} from 'react-router-dom'
import useTask from '../hooks/usetask';
import TaskCard from '../components/Taskcard';

export default function Home() {

  const [task,refetch] = useTask();
  console.log(task)

  const todoTasks = task.filter((item) => item.category === 'To-Do')

  const inProgressTasks = task.filter((item) => item.category === 'In Progress')

  const doneTasks = task.filter((item) => item.category === 'Done')
  
  return (
    <div className='w-10/12 mx-auto my-4'>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-6'>
    <div className='md:min-h-screen bg-slate-300'>
      <ul className='menu'>
        <li className='text-center text-2xl font-bold text-gray-900 my-3'>To-Do</li>
      </ul>
      <div className='w-11/12 mx-auto grid grid-cols-1 gap-4 mb-5'>
      {
        todoTasks.map((data,idx) => <TaskCard key={idx} data={data}></TaskCard>)
      }
      </div>
    </div>

    <div className='md:min-h-screen bg-slate-300'>
      <ul className='menu'>
        <li className='text-center text-2xl font-bold text-gray-900 my-3'>In Progress</li>
      </ul>
      <div className='w-11/12 mx-auto grid grid-cols-1 gap-4 mb-5'>
      {
        inProgressTasks.map((data,idx) => <TaskCard key={idx} data={data}></TaskCard>)
      }
      </div>
    </div>

    <div className='md:min-h-screen bg-slate-300'>
      <ul className='menu'>
        <li className='text-center text-2xl font-bold text-gray-900 my-3'>Done</li>
      </ul>
      <div className='w-11/12 mx-auto grid grid-cols-1 gap-4 mb-5'>
      {
        doneTasks.map((data,idx) => <TaskCard key={idx} data={data}></TaskCard>)
      }
      </div>
    </div>
    </div>
    </div>
  )
}