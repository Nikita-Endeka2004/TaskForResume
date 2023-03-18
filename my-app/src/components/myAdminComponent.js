import { useDispatch } from "react-redux";
import { setVariable } from "../store/users";
import CreateUserComponent from "./createUserComponent";
import DelUserComponenet from "./DelUserComponent";
import UpdateUserComponent from "./UpdateUserComponent";
import React, { useState } from 'react';

const AdminMenu = () => {

  const dispatch = useDispatch();
  const [displayComponent, setDisplayComponent] = useState(null);
  const [newVariable, setNewVariable] = useState(false);

  const handleVariable = () => {
    dispatch(setVariable(false));
  };

  const handleAddUser = () => {
    setDisplayComponent('createUser');
    setNewVariable(true);
  };

  const handleDeleteUser = () => {
    setDisplayComponent('deleteUser');
    setNewVariable(true);
  };

  const handleUpdateUser = () => {
    setDisplayComponent('updateUser');
    setNewVariable(true);
  };

  let componentToDisplay;
  if (displayComponent === 'createUser') {
    componentToDisplay = <CreateUserComponent />;
  } else if (displayComponent === 'deleteUser') {
    componentToDisplay = <DelUserComponenet />;
  } else if (displayComponent === 'updateUser') {
    componentToDisplay = <UpdateUserComponent />;
  } 

  return (
    <div>
        {!newVariable && (
            <div className="btnClass">
              <div className="wrap">
                <button className="button" onClick={handleAddUser}>Add User</button>
              </div>
              <div className="wrap">
                <button className="button" onClick={handleDeleteUser}>Delete User</button>
              </div>
                <div className="wrap">
                <button className="button" onClick={handleUpdateUser}>Update User</button>
              </div>
                <div className="wrap">
                <button className="button" onClick={handleVariable}>Go to the const page</button>
              </div>
            </div>
        )}
        {newVariable && (
            <div>
            {componentToDisplay}
            </div>
        )}
    </div>
  );
};

export default AdminMenu;