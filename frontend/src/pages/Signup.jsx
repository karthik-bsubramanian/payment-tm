import {Button} from "../components/Button";
import {BottomWarning} from "../components/BottomWarning";
import {InputBox} from "../components/InputBox";
import {Heading} from "../components/Heading";
import {SubHeading} from "../components/SubHeading";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Signup = ()=>{
    const navigate = useNavigate();
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");

    return <div className="bg-slate-500 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg text-center w-80 h-max p-2 bg-white px-4 ">
                <Heading label={"Signup"}/>
                <SubHeading label={"Enter your credentials to create account"}/>
                <InputBox onChange={e=> setFirstName(e.target.value)} label={"FirstName"} placeHolder="karthik"/>
                <InputBox onChange={e=> setLastName(e.target.value)} label={"LastName"} placeHolder="Balasubramanian"/>
                <InputBox onChange={e=> setUserName(e.target.value)} label={"Email"} placeHolder={"karthik@gmail.com"}/>
                <InputBox onChange={e=> setPassword(e.target.value)} label={"password"} placeHolder=" "/>
                <div className="pt-4">
                    <Button onClick={async()=>{
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                            username:userName,
                            firstname:firstName,
                            lastname:lastName,
                            password:password
                        });
                        if(response){
                            navigate('/dashboard');
                        }
                        localStorage.setItem("token",response.data.token)
                    }} label={"Signup"}/>
                </div>
                <BottomWarning label={"Already have an account?"} to={"/signin"} buttonText={"Signin"}/>
            </div>
        </div>
    </div>
}
