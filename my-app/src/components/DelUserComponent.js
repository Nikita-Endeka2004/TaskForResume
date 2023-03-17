import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { setUsers, setVariable } from '../store/users';
const UserList = () => {

  const [inputUserId, setInputUserId] = useState('');
  const {list: users} = useSelector(state => state.users);
  const dispatch = useDispatch();

  const handleConstPage = () => {
    dispatch(setVariable(false));
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`https://dummyapi.io/data/v1/user/${inputUserId}`, {
        headers: { 'app-id': '640739832c9a7937e33517e3' },
      });
      const filteredUsers = users.filter((user) => user.id !== inputUserId);
      dispatch(setUsers(filteredUsers));
      setInputUserId('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputUserId(value);
  };

  return (
    <div>
      <button onClick={handleConstPage}>Go to the const page</button>
      <h1>User List</h1>
      <p>Enter user ID to delete:</p>
      <input type="text" value={inputUserId} onChange={handleInputChange} />
      <button onClick={handleDeleteUser}>Delete</button>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.firstName} {user.lastName}</h2>
          <p>Id: {user.id}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
