import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
export default function ResetPassword() {
    let [pswd, setPswd] = useState("")
    let [cpswd, setCPswd] = useState("")
    let {token} = useParams();
    let na  =useNavigate()
    async function rP(){
      try {
        if (pswd === cpswd) {
            await axios.post(`http://localhost:3002/web/resetpswd/${token}`,{
                password:pswd
            }).then((a)=>{
                toast(a.data.msg)
                console.log("Password Updated")
                na("/log")
            })
        } else {
            toast.error("Password And Confirm Password Don't Match")
        }
      } catch (error) {
        toast.error(error.response.data.msg)
      }
    }

   
  return (
    <div className='container'> <h2>Reset  Password</h2><hr />
<ToastContainer />
    <p>enter your Password</p>
    <input type="password" placeholder='enter Password' className='form-control my-2' value={pswd}
        onChange={(e) => setPswd(e.target.value)} />

<p>Confirm Password</p>
    <input type="password" placeholder='Confirm Password' className='form-control my-2' value={cpswd}
        onChange={(e) => setCPswd(e.target.value)} />

    <button className='btn btn-primary my-2' onClick={rP}>Reset Password</button>


    </div>
  )
}