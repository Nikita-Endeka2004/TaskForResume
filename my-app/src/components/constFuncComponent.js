import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, setRender, setIsLoaded } from '../store/users';

const ConstFuncComponent = () => {

  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const {list: items} = useSelector(state => state.users);
  const render = useSelector(setRender);
  const isLoaded = useSelector(setIsLoaded);

  const dispatch = useDispatch();

  useEffect(() => {
    if(!render.payload.users.render){
    const url = 'https://dummyapi.io/data/v1/user';
    const headers = {
      'app-id': '640739832c9a7937e33517e3',
    };
    axios
      .get(url, { headers })
      .then((response) => {
        dispatch(setIsLoaded(true));
        dispatch(setUsers(response.data.data));
        setFilteredItems(response.data.data);
      })
      .catch((error) => {
        dispatch(setIsLoaded(true));
        setError(error);
      });
      dispatch(setRender(true));
    }
  }, []);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const handleFilter = () => {
    const filteredItem = [...items].sort((a, b) =>
      a.firstName > b.firstName ? 1 : -1
    );
    setFilteredItems(filteredItem);
    setIsFiltered(true);
    setCurrentPage(1);
    console.log('Before', filteredItems);
  };

  const handleResetFilter = () => {
    setFilteredItems(items);
    setCurrentPage(1);
    setIsFiltered(false);
    console.log('After', filteredItems);
  };

  console.log('Before all', items);

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
        onClick={handleClick}
        className={currentPage === number ? 'active' : ''}
      >
        {number}
      </a>
    );
  });

  if (error) {
    return <h3>Error {error.message}</h3>;
  } 

  if (!isLoaded.payload.users.isLoaded) {
    return <h3>Has been loading...</h3>;
  } 
  
  return (
    <div>
      <div className='filter-buttons'>
        {!isFiltered && (
          <button onClick={handleFilter}>
            Filter A to Z
            <span className='first'></span>
            <span className='second'></span>
            <span className='third'></span>
            <span className='fourth'></span>
          </button>
        )}
        {isFiltered && (
          <button onClick={handleResetFilter}>Reset Filter</button>
        )}
      </div>
      <div className='container'>
        <div className='unit'>
          {currentItems.map((item) => (
            <div className='pod_unit' key={item.id}>
              <div className='img_in_unit'>
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

  export default ConstFuncComponent;
  

