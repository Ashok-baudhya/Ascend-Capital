import React, { useState } from "react";
import "../Styles/login.css";
import { BiShow } from "react-icons/bi";
import { FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
   
    // Perform client-side validation
    if (!emailOrMobile || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    // Simulate login process (replace with actual login logic)
   else  if (
      emailOrMobile&&password
    
    ) {

      let check=emailOrMobile.split("").map(Number);
      let query=check.includes(NaN)?"email":"mobileNumber";
      setLoading(true)
     axios.get(`http://localhost:8081/login`)
     .then((res)=>{
      setLoading(false)
      if(res.msg!="Login Successfull"){
        setErrorMessage("You don't have an account");
      }
      else{
        localStorage.setItem('token', JSON.stringify(res.token));
        navigate("/profile")
      }
      
     })
     .catch((err)=>{
      setLoading(false)
      setErrorMessage(err.message)
      console.log(err.message)
     })
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid email/mobile or password.");
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h2 id="text">Sign in</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleLogin} id="login-form">
          <div className="login-form-group">
            <div className="user">
              <FaUser className="icon" />
              <input
                className="login-input"
                type="text"
                placeholder="Enter your Email/Mobile"
                value={emailOrMobile}
                onChange={(e) => setEmailOrMobile(e.target.value)}
              />
            </div>
          </div>

          <div className="login-form-group">
            <div className="password">
              <FaLock className="icon" />
              <div className="login-password-group">
                <input
                  className="login-input"
                  name="password"
                  maxLength={30}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="login-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {<BiShow />}
                </span>
              </div>
            </div>
          </div>

          <button id="loginButton" type="submit" disabled={loading} style={{cursor:loading?"not-allowed":"pointer",fontWeight:loading?800:500}} >
           {
            loading?"....":" Login"
           }
          </button>
        </form>
        <p id="account_message">
          Don't have an account? <span onClick={()=>navigate('/register')} >Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;