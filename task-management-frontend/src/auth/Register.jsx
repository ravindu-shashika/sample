import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { auth } from '../services';
 
const Register = () => {
 
    const [userdata, setuserData] = useState({
        name: '',
        email: '',
        password: '',

      });
    
      const handleSubmit = async (e) => {
        e.preventDefault();
          
        try{
        const response= await axios.post("http://127.0.0.1:8000/api/register", userdata);
        if (response.data && response.data.message) {
           // toast.success(response.data.message);
           console.log(response);
           await auth.handleLoginSuccess(response.data.access_token);
           await auth.saveUserDetails(response.data.user);
           window.location.href='/';
            
          }
       
    } catch (error) {
         if (error.response && error.response.status === 422) {
          // Handle validation errors
          const validationErrors = error.response.data.errors;
    
          if (validationErrors) {
            Object.values(validationErrors).forEach((errorMessages) => {
              errorMessages.forEach((errMsg) => {
                toast.error(errMsg);
              });
            });
          } else {
            toast.error('Validation error occurred');
          }
        } 
      }
        
      };
    
      const handleValueChange = (e) => {
        const targetInput = e.target;
        const inputName = targetInput.name;
        const inputValue = targetInput.value;
    
        setuserData({
          ...userdata,
          [inputName]: inputValue,
        });
      };
 

    return (

        <div>
        <div class="container">
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      <div class="row">
        <div class="col-sm-4 mx-auto mt-5">
          <div class="card">
            <div class="card-body">
              <h1 class="card-title text-center mb-4">Log in</h1>
    <form onSubmit={handleSubmit}>
    <div class="mb-4">
        <input type="text"  name="name" id="name" value={userdata.name} onChange={handleValueChange}  class="form-control" />
        <label class="form-label" for="form2Example1"> Name</label>
      </div>

      <div class="mb-4">
        <input type="email"  name="email" id="email" value={userdata.email} onChange={handleValueChange}  class="form-control" />
        <label class="form-label" for="form2Example1">Email address</label>
      </div>
  
      <div class="mb-4">
        <input type="password"   name="password" id="password" value={userdata.password} onChange={handleValueChange} class="form-control" />
        <label class="form-label" for="form2Example2">Password</label>
      </div>
  
  
  
      <button type="submit" class="btn btn-primary btn-block mb-4">Register</button>
  
    </form>
    </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    )
};
 
export default Register;