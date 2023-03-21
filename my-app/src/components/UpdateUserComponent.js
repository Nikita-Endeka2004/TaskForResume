import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { setUsers, setVariable } from '../store/users';

const UserUpdate = () => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [photo, setPhoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const dispatch = useDispatch();
  const {list: users} = useSelector(state => state.users);

  const handleAddUser = () => {
    dispatch(setVariable(false));
  };

  const findUserById = (userId, users) => {
    return users.find(user => user.id === userId);
  };

  const updateUserInArray = (user, users) => {
    const index = users.findIndex(u => u.id === user.id);
    if (index === -1) return users;
    const updatedUsers = [...users];
    updatedUsers[index] = user;
    return updatedUsers;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'userId':
        setUserId(value);
        break;
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'photo':
        setPhoto(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
  event.preventDefault();
  setIsLoading(true);

  const user = findUserById(userId, users);

  if (user) {
    const { firstName, lastName, picture } = user;
    setUser(user);
    setFirstName(firstName);
    setLastName(lastName);
    setPhoto(picture);
    setIsLoading(false);
  } else {
    setError('User not found.');
    setIsLoading(false);
  }
};

  const handleUpdate = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await axios.put(`https://dummyapi.io/data/v1/user/${user.id}`, {
        firstName,
        lastName,
        picture: photo
      }, {
        headers: { 'app-id': '640739832c9a7937e33517e3' }
      });
      const updatedUser = { ...user, firstName, lastName, picture: photo };
      console.log(updateUserInArray(updatedUser, users));
      dispatch(setUsers(updateUserInArray(updatedUser, users)));
      setSuccess('User data updated successfully.');
    } catch (error) {
      console.error(error);
      setError('Failed to update user data.');
    }

    setIsLoading(false);
  };

  return (
    <div>
      <button className="bubbly-button" onClick={handleAddUser}>Go to the const page</button>
      <div className='updateComponent'>
        <h1>Update User Data</h1>
        {error && <div className='errorDelComponent'>Error: {error}</div>}
        {success && <div className='successDelComponent'>Success: {success}
        </div>}
        <div className='firstFormUpComponent'>
          <form onSubmit={handleSubmit}>
            <div className='labelGroap'>
              <label htmlFor="userId">User ID:</label>
              <input type="text" id="userId" name="userId" value={userId} onChange={handleInputChange} />
            </div>
            <div className='buttonSubmit'>
              <button type="submit" className="btn">
                <span>Fetch User</span>
              </button>
            </div>
          </form>
        </div>
        <div className='secondFormUpComponent'>
          <form onSubmit={handleUpdate}>
            <div className='labelGroap'>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" value={firstName} onChange={handleInputChange} />
            </div>
            <div className='labelGroap'>
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" id="lastName" name="lastName" value={lastName} onChange={handleInputChange} />
            </div>
            <div className='labelGroap'>
              <label htmlFor="photo">Photo:</label>
              <input type="text" id="photo" name="photo" value={photo} onChange={handleInputChange} />
            </div>
            <button type="submit" className="btn">
              <span>Update User</span>
            </button>
          </form>
          {isLoading && <div>Loading...</div>}
        </div>
        </div>
      </div>
    );
  }

export default UserUpdate;