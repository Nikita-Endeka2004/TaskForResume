import ConstFuncComponent from "./components/constFuncComponent";
import AdminMenu from "./components/myAdminComponent";
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
              <div className="adminButton">
                <button className="bubbly-button" onClick={handleAddUser}> AdminMenu </button>
              </div>
              <ConstFuncComponent />
            </div>
          )}
          {variable.payload.users.variable && (
          <AdminMenu />
          )}
      </div>
    </Provider>
  );
}

export default App;