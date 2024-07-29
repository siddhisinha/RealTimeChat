import React,{useState}from 'react'
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

  const {handleUserRegister} = useAuth()
  const [credentials, setCredentials] = useState({
    name:"",
    email: "",
    password1: "",
    password2:""
  });

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCredentials({ ...credentials, [name]: value });
   
  };
  return (
    <div>
        <div className="auth--container">
      <div className="form--wrapper">
        <form onSubmit={(e) => {handleUserRegister(e,credentials)}} >
        <div className="field--wrapper">
                <label>Name:</label>
                <input 
                  required
                  type="text" 
                  name="name"
                  value={credentials.name}
                  placeholder="Enter your name..."
                  onChange={(e) => {handleInputChange(e)}}
                />
            </div>
          <div className="field--wrapper">
            <label>Eamil</label>
            <input
              type="email"
              required
              name="email"
              placeholder="Enter your email..."
              value={credentials.email}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
          </div>
          <div className="field--wrapper">
            <label>Password</label>
            <input
              type="password"
              required
              name="password1"
              placeholder="Enter your email..."
              value={credentials.password1}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
          </div>
          
          <div className="field--wrapper">
            <label>Confirm Password</label>
            <input
              type="password"
              required
              name="password2"
              placeholder="Confirm your password..."
              value={credentials.password2}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
          </div>

          <div className="field--wrapper">
            <input type="submit" value="Register" className="btn btn--lg btn--main" />
          </div>
        </form>
         <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
      
    </div>
    </div>
    
  )
}

export default Register
