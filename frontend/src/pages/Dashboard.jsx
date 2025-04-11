import { AppBar } from "../components/AppBar";
import {Users} from "../components/Users";
import { Balance } from "../components/Balance";

export const Dashboard=()=>{
    return <>
    <AppBar/>
    <div className="m-6">
        <Balance value={"10,000"}/>
        <Users/>
    </div>
    </>
}