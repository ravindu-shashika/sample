import React, { useEffect, useState } from 'react';
import { ListView, NavBar, SideNav } from './components';
import { Login, Register } from './auth';
import { api, auth } from './services';
import Cookies from 'js-cookie';
import CookieService from 'js-cookie';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Task } from './views';
function App() { 

  const [menuRoutes, setMenuRoutes] = useState([]);
  const [navCollapse, setNavCollapse] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState('');


  const collapseSideBar = () => {
    setNavCollapse(!navCollapse);
  };


  const componentName = (e) => {
    setSelectedComponent(e);
  };
  
  console.log('ffd');

  return (
     <div className="body-main" style={{ fontSize: 'smaller' }}>
  {Cookies.get('access_token') ? (
    <Routes>
      <Route
        path="/"
        element={
          <div className='container-fluid'>
            <NavBar
              components={menuRoutes}
              selectedComponentName={selectedComponent}
            />
            <div className="row">
              <div className='col-sm-12 component-container'>
                <Task />
                
              </div>
            </div>
          </div>
        }
      />
    </Routes>
  ) : (
   
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>

   
  )}


    </div>
  );
}

export default App;
