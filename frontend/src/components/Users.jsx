import { useEffect, useState } from "react";
import {Button} from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Users = ()=>{
    const [users,setUsers]=useState([]);
    const [filter,setFilter]=useState("");

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter)
            .then(response=>{
                setUsers(response.data.user);
            })
    },[filter])

    return <div className="mx-6">
        <div className="font-bold text-lg mt-6">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e)=>{
                setFilter(e.target.value)
            }} type="text" placeholder="Search for Users..." className="w-full py-1 px-2 border rounded border-slate-200" />
        </div>
        <div>
            {users.map(user=><User user={user}/>)}
        </div>
    </div>
}

const User = ({user})=>{
    const navigate = useNavigate();
    return <div className="flex justify-between">
        <div className="flex">
            <div className="border rounded-full w-12 h-12 flex items-center justify-center text-lg bg-slate-200 mt-2 mr-2">
                {user.firstname[0].toUpperCase()}
            </div>
            <div className="flex items-center text-lg font-bold">
                {user.firstname} {user.lastname}
            </div>
        </div>
        <div className="flex items-center">
            <Button onClick={()=>{
                navigate(`/send?id=${user._id}&name=${user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)}`)
            }}label={"Send Money"}/>
        </div>

        
    </div>
}