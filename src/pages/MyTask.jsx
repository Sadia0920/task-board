import React, { useContext, useState } from 'react'
// import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import useTask from '../hooks/usetask';
import axios from 'axios';
import Swal from 'sweetalert2';

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
        axios.delete(`http://localhost:5000/tasks/${_id}`)
        .then(res => {
          // console.log(res.data)
          if(res.data.deletedCount > 0){
            refetch();
          Swal.fire({
          title: "Deleted!",
          text: "Your Task has been deleted.",
          icon: "success"
        });
        // const remainingNote = noteData.filter(note => note._id !== _id)
        // setNoteData(remainingNote)
          }
        })
      }
    });
  }

    
//   const setLoadedReviews = loadedReviews.filter((email) => email.email == user.email)
//   const [reviews,setReviews]=useState(setLoadedReviews)

//   const handleDeleteUser = (_id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         fetch(`https://game-freak-reviews-server.vercel.app/reviews/${_id}`,{
//           method : 'DELETE'
//         })
//         .then(res => res.json())
//         .then(data => {
          // console.log(data)
//           if(data.deletedCount > 0){
//           Swal.fire({
//           title: "Deleted!",
//           text: "Your file has been deleted.",
//           icon: "success"
//         });
//         const remaining = reviews.filter(review => review._id !== _id)
//         setReviews(remaining)
//           }
//         })
//       }
//     });
//   }
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
      {/* <Link to={`/dashboard/updateNotes/${item._id}`}><button className='btn mr-2'><i className="fa-regular fa-pen-to-square"></i></button></Link> */}
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