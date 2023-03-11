import React from 'react';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email
    };
    fetch('https://dummyapi.io/data/v1/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'app-id': '640739832c9a7937e33517e3' 
      },
      body: JSON.stringify(newUser)
    })
      .then(response => response.json())
      .then(data => {
        this.props.onAdd(data);
        this.setState({
          firstName: '',
          lastName: '',
          email: ''
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleInputChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} />
        </div>
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default UserForm;