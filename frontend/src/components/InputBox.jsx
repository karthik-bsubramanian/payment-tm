export function InputBox({label,placeHolder,onChange}){
    return <div>
        <div className="text-sm font-medium py-2 text-left">
            {label}
        </div>
        <input onChange={onChange} placeholder={placeHolder} className="w-full px-2 py-1 border rounded border-slate-200"/>
    </div>
}