import React, { useContext, useState } from 'react'
import { AuthContext } from '../provider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from 'sweetalert2';
import axios from 'axios';

export default function Register() {

  const {createUser,setUser,updateUserInfo} = useContext(AuthContext);
  const navigate = useNavigate()
  const [showPassword,setShowPassword]=useState(false)
  const [errorMessage,setErrorMessage]=useState('')

  const handleCreateUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    const newUser = {name,email}
    // console.log(newUser);

    setErrorMessage('')

     const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

     if(!regex.test(password)){
      setErrorMessage('Please give a valid password with at lease one Uppercase, one Lowercase and length must be 6 character or more.')
      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return;
    }

      // CreateUser
      createUser(email,password)
      .then(result => {
        setUser(result.user)
  
        // UpdateUser
      const profile = {
        displayName: name,
        photoURL: photo
      }
      updateUserInfo(profile)
      .then((res)=>{
        axios.post('https://task-board-server-two.vercel.app/users', newUser)
        .then(res => {
        if(res.data.insertedId){
          // console.log('user added to the database');
          form.reset();
          Swal.fire({
            title: 'Success',
            text: 'User Registered Successfully',
            icon: 'success',
            confirmButtonText: 'Done'
          })
          navigate('/home');
        }
        // console.log(res.user)
      })
      .catch(error => {
        setErrorMessage(error.message)
      })
      })
      })
      .catch(error => {
        // console.log(error.message)
        setErrorMessage(error.message)
        setUser(null)
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
       })

  }
  return (
    <div className='my-7 w-11/12 lg:w-6/12 mx-auto'>
      <div className="hero bg-base-200 rounded-xl py-5">
  <div className="hero-content flex-col w-full md:w-7/12 lg:w-10/12 mx-auto">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-800">Register now!</h1>
    </div>
    <div className="card bg-base-100 w-full shadow-2xl">
      <form onSubmit={handleCreateUser} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="name" name='name' className="input input-bordered " required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input type="text" placeholder="photo URL" name='photo' className="input input-bordered " required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" name='email' className="input input-bordered " required />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type={showPassword?'text':'password'}  placeholder="password" name='password' className="input input-bordered" required />
          <a onClick={()=>setShowPassword(!showPassword)} className="btn btn-xs text-lg absolute mt-12 ml-[250px] lg:ml-[380px]">{showPassword?<FaEyeSlash></FaEyeSlash>:<FaEye></FaEye>}</a>
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-[#10B981] text-white">Register</button>
        </div>
      </form>
      
      <p className='font-semibold text-center px-5 mb-6'>Already have an account? please <Link className='border-b-2 border-[#0a3d62] text-[#0a3d62]' to='/login'>Login</Link></p>
    </div>
  </div>
</div>
    </div>
  )
  }
  