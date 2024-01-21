import React, { useState } from 'react';
import { auth, msg } from '../services';
import { useHistory } from 'react-router-dom';
import { loginLogo, loginMain } from '../assets';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './Register';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';

const Log = () => {

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const response= await auth.UserLogin(credentials)
    console.log('err',response);
    if (response.message) {
     // msg.error(response.message);
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
    <Router>
      <div className="container">
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
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Log;
