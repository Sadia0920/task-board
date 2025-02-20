import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Home from "../pages/Home"
import AddTask from "../pages/AddTask"
import MyTask from "../pages/MyTask"
import Error from "../pages/Error"

const router =  createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/addTask',
                element: <AddTask></AddTask>,
            },
            {
                path: '/myTask',
                element: <MyTask></MyTask>,
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