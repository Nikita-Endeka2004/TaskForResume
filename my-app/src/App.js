import React, { Component } from 'react';
import './App.css';
import ClassComponent from './components/ClassComponent';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      currentPage: 1,
      itemsPerPage: 10,
    };
  }

  componentDidMount() {
    const url = 'https://dummyapi.io/data/v1/user';
    const headers = {
      'app-id': '640739832c9a7937e33517e3',
    };
    axios
      .get(url, { headers })
      .then((response) => {
        this.setState({
          isLoaded: true,
          items: response.data.data,
        });
        console.dir(response);
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      });
  }

  render() {
    return (
      <ClassComponent
        error={this.state.error}
        isLoaded={this.state.isLoaded}
        items={this.state.items}
        currentPage={this.state.currentPage}
        itemsPerPage={this.state.itemsPerPage}
      />
    );
  }
}

