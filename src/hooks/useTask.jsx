import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

export default function useTask() {
   
    const {user} = useContext(AuthContext);
    const { refetch, data: task=[] } = useQuery({
        queryKey: ['task', user?.email],
        queryFn: async()=>{
            const res = await axios.get(`http://localhost:5000/tasks?email=${user.email}`)
            return res.data;
        }
    })
    return[task, refetch]
}