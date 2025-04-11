import {Signin} from "./pages/Signin";
import {Signup} from "./pages/Signup";
import {Send} from "./pages/Send";
import {Dashboard} from "./pages/Dashboard";


import{
  BrowserRouter,
  Routes,
  Route
}from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/send" element={<Send/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
