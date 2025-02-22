import React, { useContext, useState } from 'react'
import { AuthContext } from '../provider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from 'sweetalert2';
import axios from 'axios';

export default function Login() {
  const {signInUser,signInWithGoogle,setUser} = useContext(AuthContext);
  const navigate = useNavigate()
  const [showPassword,setShowPassword]=useState(false)

  const handleSignInUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const user = {email,password}
    // console.log(user);

    // SignInUser
    signInUser(email,password)
    .then(result => {
      // console.log(result.user)
      setUser(result.user)
      Swal.fire({
        title: 'Success',
        text: 'Login successfully',
        icon: 'success',
        confirmButtonText: 'Done'
      })
      navigate('/home')
      form.reset()
    })
    .catch(error => {
      // console.log(error.message)
      setUser(null)
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })

  }
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(result => {
        setUser(result.user)
        // console.log(result.user)
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
        }
        axios.post('https://task-board-server-two.vercel.app/users', userInfo)
        .then(res => {
          // console.log(res.data)
          Swal.fire({
            title: 'Success',
            text: 'Login With Google Successfully',
            icon: 'success',
            confirmButtonText: 'Done'
          })
          navigate('/home');
        })
      })
      .catch(error => {
        // console.log(error)
        setUser(null)
      })
  }
  return (
    <div className='my-7 w-11/12 lg:w-6/12 mx-auto'>
      <div className="hero bg-base-200 rounded-xl py-5">
  <div className="hero-content flex-col w-full md:w-7/12 lg:w-10/12 mx-auto">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-800">Login now!</h1>
    </div>
    <div className="card bg-base-100 w-full shadow-2xl">
      <form onSubmit={handleSignInUser} className="card-body">
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
          <input type={showPassword?'text':'password'} placeholder="password" name='password' className="input input-bordered" required />
          <a onClick={()=>setShowPassword(!showPassword)} className="btn btn-xs text-lg absolute mt-12 ml-[250px] lg:ml-[380px]">{showPassword?<FaEyeSlash></FaEyeSlash>:<FaEye></FaEye>}</a>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-[#10B981] text-white">Login</button>
        </div>
      </form>
      
      <div className="mx-auto">
          <button onClick={handleGoogleLogin} className="btn px-[65px] lg:px-[144px] mb-4 bg-[#4A90E2] text-white">
            <i className="fa-brands fa-google"></i>
            Login With Google</button>
      </div>
        <p className='font-semibold text-center px-5 mb-6'>Don't have an account? please <Link className='border-b-2 border-[#0a3d62] text-[#0a3d62]' to='/register'>Register</Link></p>
    </div>
  </div>
</div>
    </div>
  )
}