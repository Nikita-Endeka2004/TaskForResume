import ConstFuncComponent from "./components/constFuncComponent";
import CreateUserComponent from "./components/createUserComponent";
import DelUserComponenet from "./components/DelUserComponent";
import UpdateUserComponent from "./components/UpdateUserComponent";
import React, { useState } from 'react';
import './App.css';
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import { setVariable } from "./store/users";

function App() {

  const variable = useSelector(setVariable);
  const dispatch = useDispatch();

  const handleAddUser = () => {
    dispatch(setVariable(true));
  };
  return (
    <Provider store={store}>
      <div>
          {!variable.payload.users.variable && (
            <div>
              <button onClick={handleAddUser}> For add User </button>
              <ConstFuncComponent />
            </div>
          )}
          {variable.payload.users.variable && (
          <CreateUserComponent />
          )}
      </div>
    </Provider>
  );
}

export default App;