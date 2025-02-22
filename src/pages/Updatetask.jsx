import Swal from 'sweetalert2';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useTask from '../hooks/usetask';
import axios from 'axios';
import { useState } from 'react';

export default function UpdateTask() {
  const loadData = useLoaderData()
  const {_id,yourName,email,title,category,description} = loadData;
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setSelectedValue(event.target.value);
};
  const [, refetch] = useTask();

  const handleUpdateTask = (event) => {
    event.preventDefault();
    const form = event.target;
    const yourName = form.yourName.value;
    const email = form.email.value;
    const title = form.title.value;
    const category = form.category.value;
    const description = form.description.value;

    const newUpdatedTask = {yourName,email,title,category,description, timestamp: new Date().toISOString()}
    // console.log(newUpdatedTask)

    // send data to the server
    try{
        axios.put(`https://task-board-server-two.vercel.app/tasks/${_id}`, newUpdatedTask)
        .then(res => {
        // console.log(res.data)
          if(res.data.modifiedCount > 0){
              Swal.fire({
                  title: 'Success',
                  text: 'Task Updated successfully',
                  icon: 'success',
                  confirmButtonText: 'Ok'
                })
                refetch()
          }
          navigate('/myTask')
      })
    }
    catch (err) {
        Swal.fire({
            title: 'Error',
            text: 'Task updated error',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
    }
    
  }
  return (
    <div className='w-10/12 mx-auto py-7'>
        <div className=' bg-base-200 rounded-xl p-10'>
            <h2 className='text-center text-4xl font-bold text-[#374151]'>Update Tasks</h2>
            <p className='text-center text-[#1B1A1AB3] w-9/12 mx-auto mt-8'>It is a dedicated area where user can update their tasks.</p>
        <form onSubmit={handleUpdateTask}>

        <div className='md:flex justify-between items-center gap-5 mt-6'>
            <div className='md:w-1/2'>
                <label className="form-control">
                <div className="label">
                <span className="label-text font-bold">Your Name</span>
                </div>
                <input type="text" readOnly defaultValue={yourName}  placeholder="Enter Your Name" name='yourName' className="input input-bordered w-full" required/>
                </label>
            </div>
            <div className='md:w-1/2'>
                <label className="form-control">
                <div className="label">
                <span className="label-text font-bold">Your Email</span>
                </div>
                <input type="email" readOnly defaultValue={email} placeholder="Enter Your Email" name='email' className="input input-bordered w-full" required/>
                </label>
            </div>
        </div>
        
        <div className='md:flex justify-between items-center gap-5 mt-6'>
            <div className='md:w-1/2'>
                <label className="form-control">
                <div className="label">
                <span className="label-text font-bold">Title</span>
                </div>
                <input type="text" placeholder="Enter Title" defaultValue={title} name='title' className="input input-bordered w-full" required />
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
                <textarea type="text" defaultValue={description} placeholder="Enter Description*" name='description' className="textarea" required></textarea>
                </label>
            </div>
        </div>
        <div className='mt-6'>
            <input type="submit" value="Update Task" className="btn w-full font-bold border-white text-white  bg-[#4A90E2]" />
        </div>
        </form>
        </div>
    </div>
  )
}