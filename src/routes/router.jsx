import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Home from "../pages/Home"
import AddTask from "../pages/AddTask"
import MyTask from "../pages/MyTask"
import Error from "../pages/Error"
import PrivateRoute from './PrivateRoute';
import UpdateTask from "../pages/Updatetask"

const router =  createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <PrivateRoute><Home></Home></PrivateRoute>,
            },
            {
                path: '/addTask',
                element: <PrivateRoute><AddTask></AddTask></PrivateRoute>,
            },
            {
                path: '/myTask',
                element: <PrivateRoute><MyTask></MyTask></PrivateRoute>,
            },
            {
                path:'/updateTask/:id',
                element:<PrivateRoute><UpdateTask></UpdateTask></PrivateRoute>,
                loader: ({params})=>fetch(`http://localhost:5000/tasks/${params.id}`)
              },
            {
                path: '/login',
                element: <Login></Login>,
            },
           {
                path: '/register',
                element: <Register></Register>,
           },
           
        ]
    }
])

export default router