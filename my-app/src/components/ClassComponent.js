import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchDataSuccess, fetchDataFailure, changePage } from './store';

class ClassComponent extends Component {
  componentDidMount() {
    const url = 'https://dummyapi.io/data/v1/user';
    const headers = {
      'app-id': '640739832c9a7937e33517e3',
    };
    axios
      .get(url, { headers })
      .then((response) => {
        this.props.fetchDataSuccess(response.data);
      })
      .catch((error) => {
        this.props.fetchDataFailure(error);
      });
  }

  handleClick = (event) => {
    this.props.changePage(Number(event.target.id));
  };

  render() {
    const { error, isLoaded, items, currentPage, itemsPerPage } = this.props;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

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
          <div className='container'>
            <div className='unit'>
              {currentItems.map((item) => (
                <div className='pod_unit' key={item.id}>
                  <div className='img_in_unit'>
                    <img src={item.picture} alt={item.id} />
                  </div>
                  <p>{item.id}</p>
                  <h3>{`${item.title}. ${item.firstName} ${item.lastName}`}</h3>
                  <p>{`Email: ${item.email}`}</p>
                </div>
              ))}
            </div>
          </div>
          <div className='pagination'>{renderPageNumbers}</div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    currentPage: state.currentPage,
    itemsPerPage: state.itemsPerPage,
    error: state.error,
    isLoaded: state.isLoaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDataSuccess: (items) => dispatch(fetchDataSuccess(items)),
    fetchDataFailure: (error) => dispatch(fetchDataFailure(error)),
    changePage: (pageNumber) => dispatch(changePage(pageNumber)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassComponent);