import ClassComponent from "./components/ClassComponent";
import UserFormComponenet from "./components/UserFormComponenet";
import DelUserComponenet from "./components/DelUserComponent";
import UpdateUserComponent from "./components/UpdateUserComponent";
import React, { useState } from 'react';
import './App.css';

function App() {
  const [variable, setVariable] = useState(false);
  return (
    <DelUserComponenet />  
    // <div>
    //     {!variable && (
    //       <div>
    //         <button onClick={() => setVariable(true)}> For add User </button>
    //         <ClassComponent />
    //       </div>
    //     )}
    //     {variable && (
    //     <UserFormComponenet />
    //     )}
    // </div>
  );
}

export default App;