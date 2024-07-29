import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Loginpage() {
  const { user,handleUserLogin} = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCredentials({ ...credentials, [name]: value });
   
  };

  return (
    <div className="auth--container">
      <div className="form--wrapper">
        <form onSubmit={(e) => {handleUserLogin(e,credentials)}} >
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
              name="password"
              placeholder="Enter your password..."
              value={credentials.password}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
          </div>

          <div className="field--wrapper">
            <input type="submit" value="Login" className="btn btn--lg btn--main" />
          </div>
        </form>
         <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

export default Loginpage;
