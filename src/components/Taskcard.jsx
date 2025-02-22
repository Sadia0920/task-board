import axios from 'axios';
import React from 'react'
import Swal from 'sweetalert2';
import useTask from '../hooks/usetask';
import { Link } from 'react-router-dom';

export default function TaskCard({data}) {

const {_id,yourName,email,title,category,description,timestamp} = data;
const [task,refetch] = useTask();

const handleDeleteTask = (_id) => {

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`https://task-board-server-two.vercel.app/tasks/${_id}`)
      .then(res => {
        // console.log(res.data)
        if(res.data.deletedCount > 0){
          refetch();
        Swal.fire({
        title: "Deleted!",
        text: "Your Task has been deleted.",
        icon: "success"
      });
        }
      })
    }
  });
}


const handleMakeInProgress = (_id) => {
  axios.patch(`https://task-board-server-two.vercel.app/tasks/inProgress/${_id}`)
  .then(res => {
    // console.log(res.data)
    if(res.data.modifiedCount > 0){
      refetch()
      Swal.fire({
        title: 'Success',
        text: `Task is now in progress`,
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    }
  })
}

const handleMakeDone = (_id) => {
  axios.patch(`https://task-board-server-two.vercel.app/tasks/done/${_id}`)
  .then(res => {
    // console.log(res.data)
    if(res.data.modifiedCount > 0){
      refetch()
      Swal.fire({
        title: 'Success',
        text: `Task is done`,
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    }
  })
}

  return (

  <div className="card bg-base-100 w-full shadow-xl" draggable>
  <div className="card-body">
    <h2 className="card-title text-gray-900">{title}</h2>
    <p className='text-gray-800'>{description}</p>
    {category === 'Done' ? <p className='text-green-700 font-bold'>{category}</p>:<p className='text-red-600 font-bold'>{category}</p>}
    
    <p className='text-gray-800'>{timestamp}</p>
    {/* update button */}

    {
      category === 'Done' ? '' : 
      <>
      {
        category === 'To-Do' ? 
        <button onClick={()=> handleMakeInProgress(_id)} className='btn mb-1 bg-green-100 text-green-900'><i className="fa-regular fa-pen-to-square text-green-900"></i>Update as In Progress</button>
        :
        <button onClick={()=> handleMakeDone(_id)} className='btn mb-1 bg-green-100 text-green-900'><i className="fa-regular fa-pen-to-square text-green-900"></i>Update as Done</button>
      }
      </>
    }

    {/* delete */}
    <button onClick={()=>handleDeleteTask(_id)} className='btn mt-2 lg:mt-0 bg-red-100'><i className="fa-regular fa-trash-can text-red-700"></i></button> 
  </div>
  </div>

  )
}