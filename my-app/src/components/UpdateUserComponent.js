import React, { Component } from 'react';
import axios from 'axios';

class UserUpdate extends Component {
  state = {
    userId: '',
    user: {},
    firstName: '',
    lastName: '',
    photo: '',
    isLoading: false,
    error: null,
    success: null,
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { userId } = this.state;

    axios.get(`https://dummyapi.io/data/v1/user/${userId}`, {
      headers: { 'app-id': '640739832c9a7937e33517e3' } 
    })
      .then(response => {
        const { firstName, lastName, picture } = response.data;
        this.setState({ user: response.data, firstName, lastName, photo: picture, isLoading: false });
      })
      .catch(error => {
        console.error(error);
        this.setState({ error: 'Failed to fetch user data.', isLoading: false });
      });

    this.setState({ isLoading: true });
  };

  handleUpdate = (event) => {
    event.preventDefault();

    const { user, firstName, lastName, photo } = this.state;
    axios.put(`https://dummyapi.io/data/v1/user/${user.id}`, {
      firstName,
      lastName,
      picture: photo
    }, {
      headers: { 'app-id': '640739832c9a7937e33517e3' } 
    })
      .then(response => {
        this.setState({ success: 'User data updated successfully.' });
      })
      .catch(error => {
        console.error(error);
        this.setState({ error: 'Failed to update user data.' });
      });
  };

  render() {
    const { user, userId, firstName, lastName, photo, isLoading, error, success } = this.state;

    return (
      <div>
        <h1>Update User Data</h1>
        {error && <div>Error: {error}</div>}
        {success && <div>Success: {success}</div>}
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="userId">User ID:</label>
            <input type="text" id="userId" name="userId" value={userId} onChange={this.handleInputChange} />
          </div>
          <button type="submit">Fetch User</button>
        </form>
        {isLoading && <div>Loading...</div>}
        {user.id &&
          <form onSubmit={this.handleUpdate}>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input type="text" id="firstName" name="firstName" value={firstName} onChange={this.handleInputChange} />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" id="lastName" name="lastName" value={lastName} onChange={this.handleInputChange} />
            </div>
            <div>
              <label htmlFor="photo">Photo:</label>
              <input type="text" id="photo" name="photo" value={photo} onChange={this.handleInputChange} />
            </div>
            <button type="submit">Update User</button>
          </form>
        }
      </div>
    );
  }
}

export default UserUpdate;