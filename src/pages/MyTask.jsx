import React, { useContext, useState } from 'react'
// import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
// import Swal from 'sweetalert2';

export default function MyTask() {
  const {user} = useContext(AuthContext)
//   const loadedReviews = useLoaderData();
    
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
        <th></th>
        <th>User Name</th>
        <th>Title</th>
        <th>Category</th>
        <th>Timestamp</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody> 
        <td>1</td>
        <td>yourName</td>
        <td>Title</td>
        <td>Category</td>
        <td>Timestamp</td>
    
        <td>
          <button className='btn mr-2'><i className="fa-regular fa-pen-to-square"></i></button>
          <button  className='btn'><i className="fa-regular fa-trash-can"></i></button> 
      </td>
      {/* row 1 */}
     {/* {
      reviews.map((review,idx) =>  <tr key={review._id}>
        <td>{idx + 1}</th>
        <td>{review.yourName}</td>
        <td>{review.gameName}</td>
        <td>{review.genres}</td>
        <td>{review.rating} Stars</td>
    
        <td>
          <Link to={`/updateReview/${review._id}`}><button className='btn mr-2'><i className="fa-regular fa-pen-to-square"></i></button></Link>
          <button onClick={()=>handleDeleteUser(review._id)} className='btn'><i className="fa-regular fa-trash-can"></i></button> 
      </td>
      </tr>)
      } */}
      </tbody>
  </table>
</div>
    </div>
  )
}