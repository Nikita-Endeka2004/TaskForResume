import React, { useState, setState } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setVariable, addUsers } from '../store/users';

const UserForm = () => {

  const dispatch = useDispatch();

  const handleAddUser = () => {
    dispatch(setVariable(false));
  };

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    };
    const headers = {
      'app-id': '640739832c9a7937e33517e3' 
    }
    axios.post('https://dummyapi.io/data/v1/user/create', newUser, {headers})
      .then(response => {
        dispatch(addUsers(response.data));
        setUser({
          firstName: '',
          lastName: '',
          email: ''
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className='formCreate'>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" name="firstName" placeholder='First Name' value={user.firstName} onChange={handleInputChange} />
          </div>
          <div>
            <input type="text" name="lastName" placeholder='Last Name' value={user.lastName} onChange={handleInputChange} />
          </div>
          <div>
            <input type="text" name="email" placeholder='Email' value={user.email} onChange={handleInputChange} />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
      <div className='btnInCreate'>
        <button onClick={handleAddUser} className="btn">
          <span>Go to the const page</span>
        </button>
      </div>
    </div>
  );
};

export default UserForm;