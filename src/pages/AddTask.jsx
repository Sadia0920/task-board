import React, { useContext, useState } from 'react'
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AddTask() {

  const {user} = useContext(AuthContext);
  const [selectedValue, setSelectedValue] = useState("");
  const navigate = useNavigate()

  const handleChange = (event) => {
    event.preventDefault();
    setSelectedValue(event.target.value);
  };
  const handleAddTask = (event) => {
        event.preventDefault();
        const form = event.target;
        const yourName = form.yourName.value;
        const email = form.email.value;
        const title = form.title.value;
        const category = form.category.value;
        const description = form.description.value;
        // const timestamp = form.timestamp.value;
        const newTask = {yourName,email,title,category,description, timestamp: new Date().toISOString(), }
        
        console.log(newTask)

        // send data to the server
    try{
        axios.post('http://localhost:5000/tasks', newTask)
        .then(res => {
        // console.log(res.data)
          if(res.data.insertedId){
              Swal.fire({
                  title: 'Success',
                  text: 'Task created successfully',
                  icon: 'success',
                  confirmButtonText: 'Ok'
                })
          }
          form.reset()
          navigate('/')
      })
    }
    catch (err) {
        Swal.fire({
            title: 'Error',
            text: 'Task created error',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
    }
        // send data to the server
        // fetch('https://game-freak-reviews-server.vercel.app/reviews',{
        //     method : 'POST',
        //     headers : {
        //         'content-type' : 'application/json'
        //     },
        //     body : JSON.stringify(newReview)
        // })
        // .then(res => res.json())
        // .then(data => {
        //     // console.log(data)
        //     if(data.insertedId){
        //         Swal.fire({
        //             title: 'Success',
        //             text: 'Review added successfully',
        //             icon: 'success',
        //             confirmButtonText: 'Ok'
        //           })
        //     }
        //     form.reset()
        // })
        }
  return (
    <div className='w-10/12 mx-auto py-7'>
        <div className=' bg-base-200 rounded-xl p-10'>
            <h2 className='text-center text-4xl font-bold text-[#374151]'>Add Task</h2>
            <p className='text-center text-[#1B1A1AB3] w-9/12 mx-auto mt-8'>It is a dedicated area where user can add their task.</p>
        <form onSubmit={handleAddTask}>
        
        <div className='md:flex justify-between items-center gap-5 mt-6'>
            <div className='md:w-1/2'>
                <label className="form-control">
                <div className="label">
                <span className="label-text font-bold">Your Name</span>
                </div>
                <input type="text" readOnly defaultValue={user.displayName}  placeholder="Enter Your Name" name='yourName' className="input input-bordered w-full" required/>
                </label>
            </div>
            <div className='md:w-1/2'>
                <label className="form-control">
                <div className="label">
                <span className="label-text font-bold">Your Email</span>
                </div>
                <input type="email" readOnly defaultValue={user.email} placeholder="Enter Your Email" name='email' className="input input-bordered w-full" required/>
                </label>
            </div>
        </div>
        <div className='md:flex justify-between items-center gap-5 mt-6'>
            <div className='md:w-1/2'>
                <label className="form-control">
                <div className="label">
                <span className="label-text font-bold">Title</span>
                </div>
                <input type="text" placeholder="Enter Title" name='title' className="input input-bordered w-full" required />
                </label>
            </div>
            <div className='md:w-1/2'>
            <label className="form-control">
               <div className="label">
               <span className="label-text font-bold">Category</span>
               </div>
               <select id="dropdown" name='category' value={selectedValue} onChange={handleChange} className='input input-bordered w-full' >
               <option value="" disabled>Select an option</option>
               <option value="To-Do">To-Do</option>
               <option value="In Progress">In Progress</option>
               <option value="Done">Done</option>
               </select>
            </label>
            </div>
        </div>
        <div className='mt-6'>
            <div className='md:w-full'>
                <label className="form-control">
                <div className="label">
                <span className="label-text font-bold">Description</span>
                </div>
                <textarea type="text" placeholder="Enter Description" name='description' className="textarea" required></textarea>
                </label>
            </div>
        </div>
        {/* <div className='mt-6'>
            <div className='md:w-full'>
                <label className="form-control">
                <div className="label">
                <span className="label-text font-bold">Timestamp</span>
                </div>
                <input type="number" placeholder="Enter Timestamp" name='timestamp' className="input input-bordered w-full" required/>
                </label>
            </div>
        </div> */}
        <div className='mt-6'>
            <input type="submit" value="Add Task" className="btn w-full font-bold border-white text-white  bg-[#4A90E2]" />
        </div>
        </form>
        </div>
    </div>
  )
}