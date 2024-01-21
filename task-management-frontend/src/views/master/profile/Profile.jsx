import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import CookieService from 'js-cookie';
import { api } from '../../../services';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const moduleName = 'Profile';

         const [newData, setNewData] = useState({
        current_password: '',
        // new_email: '',
        new_password: '',
        // conf_new_password: '',
        user_id: Cookies.get('user_id'),
        user_email: Cookies.get('user_email'),
        user_name: Cookies.get('user_name'),
    });

    const [taskList, setTaskList] = useState([]);

    let dataColumns = [
        { title: 'Ttile', name: 'title', searchable: true },
        { title: ' Description', name: 'description', searchable: true },
        { title: 'Date', name: 'date', searchable: true },
        { title: 'Status', name: 'status', searchable: true },
      ];

    useEffect(() => {
        fetchData();
       
      }, []);

    const fetchData = async () => {

        setTaskList([])
        
        try {
          const response = await api.get('tasks');
    
    
          if (response.error) {
            Object.values(response.error).forEach((err) => {
              toast.error(err[0]);
            });
            return;
          } else {
            let dataRows = [];
    
            response.data.results.map((entity) => {
              dataRows.push({
                id: entity.id,
                title: entity.title,
                description: entity.description,
                date: entity.assign_date,      
                status: entity.status,
              });
            });
    
            setTaskList(dataRows);
          }
         
        } catch (error) {
          return console.log(error);
        }
      };


    let is_passwords_match = true;

    const handleSubmit = async (e) => {
        e.preventDefault();

        await submitData();

        resetAll();
    };

    const handleValueChange = (e) => {
        const targetInput = e.target;
        const inputName = targetInput.name;
        const inputValue = targetInput.value;

        if (inputName === 'conf_new_password') {
            console.log(inputName);
            if (inputValue === newData.new_password) {
              is_passwords_match = true;
            } else {
              is_passwords_match = false;
            }
          } else {
            setNewData({
              ...newData,
              [inputName]: inputValue,
            });
          }

    };

    const submitData = async () => {
        if(is_passwords_match){
            try {
                const response = await api.post('change-user-password').values(newData);
            
                if (response.data.error) {
                    return toast.error(response.data.error);
                    toast.error(response.data.error);
                    resetAll();
                } else {
                  // return toast.success(response.data.success);
                  resetAll();
                }
              } catch (error) {
                return console.log(error);
                resetAll();
              }
        }else {
            resetAll();
            toast.error(`Password and Confirmation Password fields doesn't match`);
          }
    };

    const resetAll = () => {
        setNewData({
            current_password: '',
            new_password: '',
            user_id: Cookies.get('user_id'),
            user_email: Cookies.get('user_email'),
        });

        document.getElementById('conf_new_password').value = ''
      };

    return (
        <div>
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
            <h5 className="text-center">Profile ({(Cookies.get('user_name'))})</h5>
            <br />

            <form onSubmit={handleSubmit}>
                <div className="modal-body">
                    <div className="row form-group">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-4">
                            <input
                                type="text"
                                name="email"
                                id="email"
                                maxLength="20"
                                minLength="10"
                                className="form-control form-control-sm"
                                value={newData.user_email}
                                disabled
                            />
                        </div>
                        <label htmlFor="current_password" className="col-sm-2 col-form-label">Current Password</label>
                        <div className="col-sm-4">
                            <input
                                type="password"
                                name="current_password"
                                id="current_password"
                                placeholder="Enter Current Password"
                                maxLength="20"
                                minLength="6"
                                className="form-control form-control-sm"
                                value={newData.current_password}
                                onChange={handleValueChange}
                            />
                        </div>
                    </div>

                    <div className="row form-group">
                        <label htmlFor="new_password" className="col-sm-2 col-form-label">New Password</label>
                        <div className="col-sm-4">
                            <input
                                type="password"
                                name="new_password"
                                id="new_password"
                                maxLength="20"
                                minLength="6"
                                className="form-control form-control-sm"
                                value={newData.new_password}
                                onChange={handleValueChange}
                            />
                        </div>

                        <label htmlFor="conf_new_password" className="col-sm-2 col-form-label">Confirm New Password</label>
                        <div className="col-sm-4">
                            <input
                                type="password"
                                name="conf_new_password"
                                id="conf_new_password"
                                maxLength="20"
                                minLength="6"
                                className="form-control form-control-sm"
                                value={newData.conf_new_password}
                                onChange={handleValueChange}
                            />
                        </div>
                    </div>

                    <div className="row form-group">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-4">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                
                                className="form-control form-control-sm"
                                value={newData.user_name}
                                onChange={handleValueChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                <button type="submit" className="btn btn-primary" data-mdb-ripple-init>
                Save changes
              </button>
                </div>
            </form>

        
      <div
        className="row m-0 table-responsive header-fixed-scrollable"
        style={{ maxHeight: '25em' }}
      >
        <table className="table table-sm table-striped table-bordered">
          <thead className=" thead-dark">
            <tr>
              {dataColumns.map((column) => {
                return (
                  <th scope="col" key={column.name}>
                    {column.title}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {taskList.map((filteredData) => {
              return (
                <tr key={filteredData.id}>
                  {dataColumns.map((column) => {
                    return (
                      <td key={column.name} className={column.class}>
                        {filteredData[column.name]}
                      </td>
                    );
                  })}
                  
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>         

        </div>

    );

};

export default Profile;
