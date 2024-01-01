import React, { useState } from 'react';
import style from "../Styles/Register.css";
import {BiShow} from "react-icons/bi"
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoding]=useState(false)
  const navigate=useNavigate()

  
// Hide and Show Password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // input change event
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
// validation for add input field
  const validateForm = () => {
    const newErrors = {};
  // name
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
// email
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid ';
    }
    
// password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    else if(formData.password.length<6){
      newErrors.password="Password must be longer than 5 digits"
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoding(true)
    if (validateForm()) {
      console.log(formData)
      axios.post(`http://localhost:8081/register`,formData).then((res)=>{
        navigate("/list")
        setErrors({});
        setLoding(false)
      })
      .catch((err)=>{
        console.log(err);
        // alert("err")
        setErrors({message:err.message})
        setLoding(false)
      })
      
    }
  };
  
  return (
    <div className="registration-main-container" >
      <div className="registration-container">
      <h2>Registration</h2>
      {Object.keys(errors).length>=1&& <p  style={{textAlign:"center",fontWeight:"600",fontStyle:"italic"}} className="error-message">{errors.message?errors.message:"Found one or more errors"}</p>}
      <form onSubmit={handleSubmit}>

        {/* name and email fields */}
       <div className="form_flex">
       <div className="form-group">
          <label>Name:</label>
          <input
           className='input_field'
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleInputChange}
            
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
           className='input_field'
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleInputChange}
           
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
       </div>
       {/*password fields  */}
        <div className="form_flex">
        
        <div className="form-group">
            <label>Password :</label>
          <div className="password-group">
        <input
        className='input_field'
        name="password"
        maxLength={30}
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <span className="toggle-icon" onClick={togglePasswordVisibility}>
        {
          <BiShow/>
        }
      </span>
          </div>
          {errors.password && <p  className="error-message">{errors.password}</p>}
        </div>
        </div>
        {/* Age and Gender */}
       
        <button id='submit-utton' type="submit" disabled={loading} style={{ cursor:loading?"not-allowed":"pointer",backgroundColor:loading?"gray":""}}>Register</button>
      </form>
      <p className='have-an-account'>
          Already have an account please
          <strong onClick={()=>navigate("/")}>Sign in</strong>
        </p>
      
    </div>
    
    </div>
  );
};

export default RegistrationPage;