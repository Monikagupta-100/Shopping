import axios from 'axios';
import React,{useState} from 'react';

import {useNavigate}  from 'react-router';
function Register() {
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
        confirmpwd:""
    })
    let navigate=useNavigate();
    const handleChange=(e)=>
    {console.log(user);
        setUser({...user,[e.target.name]:e.target.value})
    }
   const registerFunction=async(e)=>
   {e.preventDefault();
       if(user.password===user.confirmpwd)
    {
    const response= await axios.post("/registration",
   {
       name:user.name,
       email:user.email,
       password:user.password,
       confirmpwd:user.confirmpwd
   })
   navigate("/login")
   console.log(response);
}
else
{ document.getElementById("ifinvalid").innerHTML="***password and confirm password haven't matched "
setTimeout(()=>
    {document.getElementById("ifinvalid").innerHTML="";
   
   },10000)}} 
return (
        <div>
           <section id="actions" className="py-4 mb-4 bg-light">
            <div className="container">
              <div className="row">
              </div>
            </div>
          </section>
        
          <section id="register">
            <div className="container">
              <div className="row">
                <div className="col-md-6 mx-auto">
                  <div className="card">
                    <div className="card-header">
                      <h4 style={{textAlign:"center"}}>Registration Form </h4>
                    </div>
                    <div className="card-body">
                      <form>
                      <div className="form-group">
                          <label>Name</label>
                          <input type="text" name="name" onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input type="text" name="email" onChange={handleChange} className="form-control" />
                         
                        </div>
                        <div className="form-group">
                          <label htmlFor="password">Password</label>
                          <input type="password" name="password" onChange={handleChange} className="form-control" />
                         </div>
                         <div className="form-group">
                          <label htmlFor="password">Confirm Password</label>
                          <input type="password" name="confirmpwd" onChange={handleChange} className="form-control" />
                         </div>
                         <h5 style={{color:"red"}} id="ifinvalid"></h5>
                        <button onClick={registerFunction} className="btn btn-primary btn-block">Register</button>
                     
                      
                      
                      </form>
                  
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          </div>
          )}
          export default Register;