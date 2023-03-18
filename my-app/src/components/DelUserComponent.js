import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { setUsers, setVariable } from '../store/users';
const UserList = () => {

  const [inputUserId, setInputUserId] = useState('');
  const {list: users} = useSelector(state => state.users);
  const [isUserDeleted, setIsUserDeleted] = useState(false);
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
      setIsUserDeleted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputUserId(value);
  };

  return (
    <div className='delComponent'>
      <div className="center">
        <button onClick={handleConstPage} className="btn">
          <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
            <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
            <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
          </svg>
          <span>Go to the const page</span>
        </button>
      </div>
      <h1>User List</h1>
      <div className='delBlock'>
        <p>Enter user ID to delete:</p>
        {isUserDeleted && <p>User has been deleted.</p>}
        <input type="text" value={inputUserId} onChange={handleInputChange} />
        <button className="bubbly-button" onClick={handleDeleteUser}>Delete</button>
      </div>
      <div className='gridDelBlock'>
        {users.map((user) => (
          <div key={user.id}>
            <h2>{user.firstName} {user.lastName}</h2>
            <p>Id: {user.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
