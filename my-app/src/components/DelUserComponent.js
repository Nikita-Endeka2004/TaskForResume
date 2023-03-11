import React, { Component } from 'react';
import axios from 'axios';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      inputUserId: '',
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const response = await axios.get('https://dummyapi.io/data/v1/user', {
        headers: { 'app-id': '640739832c9a7937e33517e3' }, 
      });
      this.setState({ users: response.data.data });
    } catch (error) {
      console.error(error);
    }
  };

  handleDeleteUser = async () => {
    const { inputUserId, users } = this.state;
    try {
      await axios.delete(`https://dummyapi.io/data/v1/user/${inputUserId}`, {
        headers: { 'app-id': '640739832c9a7937e33517e3' }, 
      });
      const filteredUsers = users.filter((user) => user.id !== inputUserId);
      this.setState({ users: filteredUsers, inputUserId: '' });
    } catch (error) {
      console.error(error);
    }
  };

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({ inputUserId: value });
  };

  render() {
    const { users, inputUserId } = this.state;
    console.log(users);
    return (
      <div>
        <h1>User List</h1>
        <p>Enter user ID to delete:</p>
        <input type="text" value={inputUserId} onChange={this.handleInputChange} />
        <button onClick={this.handleDeleteUser}>Delete</button>
        {users.map((user) => (
          <div key={user.id}>
            <h2>{user.firstName} {user.lastName}</h2>
            <p>Id: {user.id}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default UserList;