import React, { useState } from 'react';
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
    axios.post('https://dummyapi.io/data/v1/user/create', newUser, {
      headers: {
        'Content-Type': 'application/json',
        'app-id': '640739832c9a7937e33517e3' 
      }
    })
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
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input type="text" name="firstName" value={user.firstName} onChange={handleInputChange} />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" name="lastName" value={user.lastName} onChange={handleInputChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="text" name="email" value={user.email} onChange={handleInputChange} />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default UserForm;