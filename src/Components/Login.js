import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router'
function Login() {
   const [user,setUser]=useState({
       email:"",
       password:""
   })
  const navigate= useNavigate();
  const handleChange=(e)=>
  {console.log(user);
setUser({...user,[e.target.name]:e.target.value})
  }
  const submitFunction=async(e)=>
  {e.preventDefault();
    try{
  const login= await axios.post("/loginauthentication",{
     email:user.email,
     password:user.password
      })
      console.log(login.data.userLogin);
      localStorage.setItem("token",JSON.stringify(login.data.userLogin.tokens))
     navigate("/")
    }
    catch(err)
    {
      console.log(err);
    }
      
  }
return (
        <div>
          <section id="actions" className="py-4 mb-4 bg-light">
            <div className="container">
              <div className="row">
              </div>
            </div>
          </section>
          
      
          
     
          <section id="login">
            <div className="container">
              <div className="row">
                <div className="col-md-6 mx-auto">
                  <div className="card">
                    <div className="card-header">
                      <h4> Login</h4>
                    </div>
                    <div className="card-body">
                      <form>
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input type="text" name="email" onChange={handleChange} className="form-control" />
                         
                        </div>
                        <div className="form-group">
                          <label htmlFor="password">Password</label>
                          <input type="password" name="password" onChange={handleChange} className="form-control" />
                        
                        </div>
                        <h5 id="loginvalidation" style={{color:"red"}}></h5>
                        <button value="login" onClick={submitFunction} className="btn btn-primary btn-block">Login</button>
                     <h4 id="validationCheck" style={{color:"green"}}></h4>
                      <Link to="/register">Register</Link>
                      
                      </form>
                  
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          </div>
)}
export default Login;