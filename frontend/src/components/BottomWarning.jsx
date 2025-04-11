import { Link } from "react-router-dom"

export function BottomWarning({label,to,buttonText}){
    return <div className="flex text-sm py-2 justify-center">
        {label}

        <Link className="pl-1 underline cursor-pointer" to={to}>
            {buttonText}
        </Link>
    </div>
}