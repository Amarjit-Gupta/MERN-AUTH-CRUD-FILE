import { BrowserRouter, Routes, Route } from "react-router";
import Signup from "./components/signup";
import Login from "./components/login";
import ForgotPassword from "./components/forgotPassword";
import { ToastContainer } from 'react-toastify';
import PrivateComponent from "./components/privateComponent";
import AddData from "./data/addData";
import EditData from "./data/editData";
import AllData from "./data/allData";
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";
import Error from "./components/Error";
import SingleData from "./data/singleData";
import loader1 from './assets/loader1.gif';

const App = () => {

  const [mainloader,setMainloader] = useState(true);

  useEffect(()=>{
    setTimeout(()=> {
      setMainloader(false);
    },700);
  },[]);

  return (
    <div>
    {mainloader?<div className="main-loader"><img src={loader1} alt="" /></div>:""}
      <ToastContainer />
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path={'/'} element={<AllData />} />
            <Route path={'/add'} element={<AddData />} />
            <Route path={'/edit/:id'} element={<EditData />} />
            <Route path={'/singleData/:id'} element={<SingleData />} />
          </Route>
          <Route path={'/signup'} element={<Signup />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/forgot-password'} element={<ForgotPassword />} />
          <Route path={'*'} element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;