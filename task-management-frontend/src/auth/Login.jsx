import React, { useState } from 'react';
import { auth, msg } from '../services';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './Register';

const Login = () => {

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const response= await auth.UserLogin(credentials)
    console.log('err',response);
    if (response.message) {
      toast.error(response.message);

    } else {
      await auth.handleLoginSuccess(response.access_token);
      await auth.saveUserDetails(response.user);
      window.location.reload();
    }
  };

  const handleValueChange = (e) => {
    const targetInput = e.target;
    const inputName = targetInput.name;
    const inputValue = targetInput.value;

    setCredentials({
      ...credentials,
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
      <input type="email"  name="email" id="email" value={credentials.email} onChange={handleValueChange}  class="form-control" />
      <label class="form-label" for="form2Example1">Email address</label>
    </div>

    <div class="mb-4">
      <input type="password"   name="password" id="password" value={credentials.password} onChange={handleValueChange} class="form-control" />
      <label class="form-label" for="form2Example2">Password</label>
    </div>



    <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>

    <div class="text-center">
      <p><Link to ="/register">Register</Link></p>
    </div>
  </form>
  </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Login;
