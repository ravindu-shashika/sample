import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../services';
import Cookies from 'js-cookie';

import {
  Profile, Task,
} from '../views';


const NavBar = ({ components, selectedComponentName, collapseSideBar }) => {
  const signOut = async () => {
    auth.signOutUser();
  };

  const [approvalModal, setApprovalModal] = useState({
    title: '',
    type: '',
    component: '',
  });

  const [showApprovals, setShowApprovals] = useState(false);

  
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);


  const toggleApprovalModal = (e) => {
    console.log(e ? e.target.name : null);

    if (e) {
      if (e.target.name === 'profile') {
        setApprovalModal({
          title: 'Profile',
          type: 'profile',
          component: <Profile />,
        });
      }
    }

    setShowApprovals(!showApprovals);
  };

  return (
    <div>
       <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      {/* Container wrapper */}
      <div className="container-fluid">
        {/* Toggle button */}
        <button
          data-mdb-collapse-init
          className="navbar-toggler"
          type="button"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Collapsible wrapper */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Navbar brand */}
          <a className="navbar-brand mt-2 mt-lg-0" href="#">
            Task Manager
            
          </a>
          {/* Left links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"
        data-mdb-ripple-init
        data-mdb-modal-init
        data-mdb-target="#exampleModal"
        onClick={toggleModal}>
                Profile
              </a>
            </li>
          </ul>
          {/* Left links */}
        </div>
        {/* Collapsible wrapper */}

        {/* Right elements */}
        <div className="d-flex align-items-center">
          {/* Icon */}
          <a className="text-reset me-3" href="#" onClick={() => signOut()}>
            <i className="fa fa-sign-out-alt"></i>
          </a>

        </div>
        {/* Right elements */}
      </div>
      {/* Container wrapper */}
    </nav>

          

        <div
        className={`modal fade ${modalOpen ? 'show' : ''}`}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden={!modalOpen}
        style={{ display: modalOpen ? 'block' : 'none' }}
      >
        
        <div className="modal-dialog modal-xl ">
          <div className="modal-content">
            <div className="modal-header bg-primary-subtle">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Task
              </h5>
              <button
                type="button"
                className="btn-close"
                data-mdb-ripple-init
                data-mdb-dismiss="modal"
                aria-label="Close"
                onClick={toggleModal}
              ></button>
            </div>
            <div className="modal-body">
            <Profile />
          </div>
          <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-mdb-ripple-init
                data-mdb-dismiss="modal"
                onClick={toggleModal}
              >
                Close
              </button>
              
            </div>
          </div>
        </div>
       
      </div>
     

    </div>
  );
};

export default NavBar;
