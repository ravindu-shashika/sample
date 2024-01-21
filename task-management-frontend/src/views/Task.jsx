import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { api } from '../services';
import CookieService from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Task = () => {

  const moduleName = 'Tasks';

  const [newData, setNewData] = useState({
    title: '',
    description: '',
     status :'',
     user:'',
    user_id: Cookies.get('user_id'),
  });

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  const [isLoading, setIsLoading] = useState(false);
  const [showModalState, setShowModalState] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [selectedId, setSelectedId] = useState('');


  let dataColumns = [
    { title: 'Ttile', name: 'title', searchable: true },
    { title: ' Description', name: 'description', searchable: true },
    { title: ' Date', name: 'date', searchable: true },
    { title: 'Status', name: 'date', searchable: true },
    { title: 'Action', name: 'status', searchable: true },
  ];

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  
  }, []);

  useEffect(() => {
    if (showModalState === false) {
      resetForm();
    }
  }, [showModalState]);



  const fetchData = async () => {

    setTaskList([])
    
    try {
      setIsLoading(true);
      const response = await api.get('tasks');
      const userrespon=await api.get('users');


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
            assign_user:entity.assign_user,
            user_id:entity.user_id
          });
        });

        setIsLoading(false);
        setTaskList(dataRows);
        setUsers(userrespon.data.results);
      }
     
    } catch (error) {
      return console.log(error);
    }
  };


 

  const toggleFormModal = () => {
    setShowModalState(!showModalState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await submitData();

    setNewData({
      title: '',
      description: '',
      status :'',
      user:'',
      user_id:'',
    });

    fetchData();

    setModalOpen(false);
  };

  const editRow = (dataObj) => {
    console.log('obj',dataObj);
    setNewData({
      title: dataObj.title,
      description: dataObj.description,
      user:dataObj.user_id,
      status :dataObj.status,
      user_id:dataObj.user_id,
    });

    setModalOpen(true);
    setIsEdit(true);
    setSelectedId(dataObj.id);
  };

  const deleteRow = async (dataObj) => {
    try {
      const response = await api.delete(`taskdelete/${dataObj.id}`);

      toast.success(response.message);
    } catch (error) {
      return console.log(error);
    } finally {
      fetchData();
    }
  };

  const handleValueChange = (e) => {
    const targetInput = e.target;
    const inputName = targetInput.name;
    const inputValue = targetInput.value;

    setNewData({
      ...newData,
      [inputName]: inputValue,
    });
  };

  const submitData = async () => {
    if (isEdit === false) {
      try {
        const response = await api.post('addtask').values(newData);

        if (response.error) {
          Object.values(response.error).forEach((err) => {
            toast.error(err[0]);
          });
          return;
        } else {
          toast.success(response.data);
          setModalOpen(false);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await api
          .put('taskupdate', selectedId)
          .values(newData);

        if (response.error) {
          Object.values(response.error).forEach((err) => {
            toast.error(err[0]);
          });
          return;
        } else {
          // toast.success(response.message);
          setModalOpen(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsEdit(false);
        setSelectedId('');
      }
    }
  };

  const resetForm = () => {
    setNewData({
      title: '',
      description: '',
      status :'',
      user:'',
      user_id: Cookies.get('user_id'),
    });
    setIsEdit(false);

  };

  const handleStatusChange = async (taskId, newStatus) => {


    const response = await api
    .put('status-update', taskId)
    .values({'status':newStatus});
    if (response.error) {
      Object.values(response.error).forEach((err) => {
        toast.error(err[0]);
      });
      return;
    } else {
      toast.success(response.data.message);
      fetchData();
    }
    
  };


  return (
    <div className='container-fluid'>
      {/* <ToastContainer /> */}
      <br/>
          
      <h5 className="text-center">{moduleName}</h5>
      <br />
      <div className="row">
        <div className="col-sm-2">
        <button
        type="button"
        className="btn btn-primary"
        data-mdb-ripple-init
        data-mdb-modal-init
        data-mdb-target="#exampleModal"
        onClick={toggleModal}
      >
      Add Task
      </button>
        </div>
       
      </div>


          

      <div
        className={`modal fade ${modalOpen ? 'show' : ''}`}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden={!modalOpen}
        style={{ display: modalOpen ? 'block' : 'none' }}
      >
         <form
          onSubmit={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.preventDefault();
          }}
          className="compactForm"
        >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
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
            
            <div className="col-sm-10 form-group">
                <label htmlFor="name">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter title"
                  className="form-control"
                  value={newData.title}
                  onChange={handleValueChange}
                />
              </div>
              <div className="col-sm-10 form-group">
                <label htmlFor="category_id">Description</label>
                <textarea 
                  name="description"
                  id="description"
                  placeholder="Enter description"
                  className="form-control"
                  value={newData.description}
                  onChange={handleValueChange}
                />
              </div>
              <div className="col-sm-10">
                <div className="form-group">
                  <label htmlFor="status">Status </label>
                  <select
                    type="text"
                    name="status"
                    id="status"
                    className="form-control form-control-sm"
                    value={newData.status}
                    onChange={handleValueChange}
                  >
                    <option value="" className="text-muted" disabled>
                      -- Select Status
                    </option>
                    <option value='Todo'>Todo</option>
                    <option value='InProgress'>InProgress</option>
                    <option value='Completed'>Completed</option>
                               
                  </select>
                </div>
              </div>
              {Cookies.get('user_role') ==='admin' ?(
                <div className="col-sm-10">
                <div className="form-group">
                  <label htmlFor="status">User </label>
                  <select
                  type="text"
                  name="user_id"
                  id="user_id"
                  className="form-control form-control-sm"
                  value={newData.user_id}
                  onChange={handleValueChange}
                >
                  <option value="" className="text-muted" disabled>
                    -- Select User
                  </option>
                  {users.map((user) => {
                    return (
                      <option value={user.id} key={user.id}>
                        {user.name}
                      </option>
                    );
                  })}
                </select>
                </div>
              </div>
              ):''}
              
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
              <button type="submit" className="btn btn-primary" data-mdb-ripple-init>
                Save changes
              </button>
            </div>
          </div>
        </div>
        </form>
      </div>
      <br />
      <br />


      <table className="table align-middle mb-0 bg-white">
      <thead className="bg-light">
        <tr>
        {dataColumns.map((column) => {
                    return (
                      <td key={column.name} className={column.class}>
                        {[column.title]}
                      </td>
                    );
                  })}
        </tr>
      </thead>
      <tbody>
      {taskList.map((list) => (
    <tr key={list.id}>
      <td>
        <p className="fw-normal mb-1">{list.title}</p>
      </td>
      <td>
        <p className="fw-normal mb-1">{list.description}</p>
      </td>
      <td>
        <p className="fw-normal mb-1">{list.date}</p>
      </td>
      <td>
        <p className="fw-normal mb-1">{list.status}</p>
        <select className='form-control'
                value={list.status}
                onChange={(e) => { 
                  handleStatusChange(list.id, e.target.value);
                }}
              >
                <option value="Todo">Todo</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
      </td>
      <td>
        {Cookies.get('user_id')==list.assign_user?(
           <button type="button" className="btn btn-info" data-mdb-ripple-init onClick={() => editRow(list)}>
           Edit
         </button>
        ):''}    
        &nbsp;
        {Cookies.get('user_id')==list.assign_user?(
        <button type="button" className="btn btn-danger" data-mdb-ripple-init  onClick={() => deleteRow(list)}>
          Delete
        </button>
         ):''}   
      </td>
    </tr>
  ))}
      </tbody>
    </table>
    </div>
  );

};

export default Task;
