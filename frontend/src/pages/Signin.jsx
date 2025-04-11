import {Button} from "../components/Button";
import {BottomWarning} from "../components/BottomWarning";
import {InputBox} from "../components/InputBox";
import {Heading} from "../components/Heading";
import {SubHeading} from "../components/SubHeading";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signin = ()=>{
    const navigate=useNavigate();
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    return <div className="bg-slate-500 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg text-center w-80 h-max p-2 bg-white px-4 ">
                <Heading label={"Signin"}/>
                <SubHeading label={"Enter your credentials to access the account"}/>
                <InputBox onChange={(e)=>setUserName(e.target.value)}label={"Email"} placeHolder={"karthik@gmail.com"}/>
                <InputBox onChange={e=>setPassword(e.target.value)}label={"password"} placeHolder=" "/>
                <div className="pt-4">
                    <Button onClick={async ()=>{
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                            username:userName,
                            password:password
                        })
                        localStorage.setItem("token",response.data.token);
                        if (response){
                            navigate("/dashboard");
                        }
                    }} label={"Signin"}/>
                </div>
                <BottomWarning label={"Don't have an account?"} to={"/signup"} buttonText={"SignUp"}/>
            </div>
        </div>
    </div>
}
