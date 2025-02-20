import React, { useContext } from 'react'
import { Navigate } from "react-router-dom"
import { AuthContext } from '../provider/AuthProvider';

export default function PrivateRoute({children}) {

  const {user,loading} = useContext(AuthContext)
  
if(loading){
  return <span className='block mx-auto loading loading-infinity loading-lg'></span>

}

if(user){
    return children;
}
return (
  <Navigate to='/login'></Navigate>
)
  }