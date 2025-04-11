export function AppBar(){
    return <div className="shadow h-14 flex justify-between ">
        <div className="ml-4 h-full flex items-center justify-center"> {/*enable flex and do items-center*/}
            Paytm App
        </div>
        <div className="flex">
            <div className="flex mr-4 items-center justify-center h-full">
                Hello
            </div>
            <div className="rounded-full w-12 h-12 mt-1 mr-2 flex justify-center items-center text-xl bg-slate-200">
             U
            </div>
        </div>
    </div>
}