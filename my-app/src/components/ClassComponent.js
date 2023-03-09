import React, { Component } from 'react';
export default class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: this.props.currentPage,
    };
    
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id),
    });
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