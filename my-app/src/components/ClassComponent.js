import React, { Component } from 'react';
import axios from 'axios';

export default class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      currentPage: 1,
      itemsPerPage: 10,
      filteredItems: [], 
      isFiltered: false, 
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
        filteredItems: response.data.data,
      });
      console.dir(response);
    })
    .catch((error) => {
      this.setState({
        isLoaded: true,
        error,
      });
    });
  };

  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id),
    });
  };

  handleFilter = () => {
    const { items } = this.state;
    const filteredItem = [...items].sort((a, b) => (a.firstName > b.firstName ? 1 : -1)); 
    this.setState({
      filteredItems: filteredItem,
      isFiltered: true, 
      currentPage: 1,
    });
    console.log('Before', this.state);
  };

  handleResetFilter = () => {
    const { items } = this.state;
    this.setState({
      filteredItems: items,
      currentPage: 1,
      isFiltered: false,
    });
    console.log('After', this.state);
  };

  render() {
    console.log('Before all', this.state);
    const { error,
            isLoaded,
            items,
            currentPage,
            itemsPerPage, 
            filteredItems, 
            isFiltered } = this.state;
    const itemsToRender = isFiltered ? filteredItems : items;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = itemsToRender.slice(indexOfFirstItem, indexOfLastItem);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <a
          key={number}
          id={number}
          onClick={this.handleClick}
          className={currentPage === number ? 'active' : ''}
        >
          {number}
        </a>
      );
    });
    if (error) {
      return <h3>Error {error.message}</h3>;
    } else if (!isLoaded) {
      return <h3>Has been loading...</h3>;
    } else {
      return (
        <div>
          <div className='filter-buttons'>
            {!isFiltered && (
              <button onClick={this.handleFilter}>
                Filter A to Z
                <span className="first"></span>
                <span className="second"></span>
                <span className="third"></span>
                <span className="fourth"></span>
              </button>
            )}
            {isFiltered && (
              <button onClick={this.handleResetFilter}>Reset Filter</button>
            )}
          </div>
            <div className='container'>
                <div className="unit">
                {currentItems.map((item) => (
                    <div className="pod_unit" key={item.id}>
                    <div className="img_in_unit">
                        <img src={item.picture} alt={item.id} />
                    </div>
                    <p>{item.id}</p>
                    <h3>{`${item.title}. ${item.firstName} ${item.lastName}`}</h3>
                    </div>
                ))}
                </div>
            </div>
            <div className='pagination'>
                {renderPageNumbers}
            </div>
        </div>
      );
    }
  }
}