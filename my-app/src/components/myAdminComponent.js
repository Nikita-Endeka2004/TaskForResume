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
            <div>
                <button onClick={handleAddUser}>Add User</button>
                <button onClick={handleDeleteUser}>Delete User</button>
                <button onClick={handleUpdateUser}>Update User</button>
                <button onClick={handleVariable}>Go to the const page</button>
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