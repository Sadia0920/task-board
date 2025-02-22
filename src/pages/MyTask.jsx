import React, { useContext, useState } from 'react'
import { AuthContext } from '../provider/AuthProvider';
import useTask from '../hooks/usetask';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function MyTask() {
  const {user} = useContext(AuthContext)
  const [task,refetch] = useTask();

   // delete task
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

  return (
    <div className='w-10/12 mx-auto py-7'>
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>User Name</th>
        <th>Title</th>
        <th>Category</th>
        <th>Timestamp</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody> 
    {
      task.map((item,idx) =>  <tr key={item._id}>
      <td>{idx + 1}</td>
      <td>{item.yourName}</td>
      <td>{item.title}</td>
      <td>{item.category}</td>
      <td>{item.timestamp}</td>
      <td>

      {/* update button */}
      <Link to={`/updateTask/${item._id}`}><button className='btn mr-2'><i className="fa-regular fa-pen-to-square"></i></button></Link>
      {/* delete button */}
      <button onClick={()=>handleDeleteTask(item._id)} className='btn mt-2 lg:mt-0'><i className="fa-regular fa-trash-can"></i></button> 
      </td>
      </tr>)
    }
      </tbody>
  </table>
</div>
    </div>
  )
}