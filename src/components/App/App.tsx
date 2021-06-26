import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import {useDispatch} from "react-redux";
import {testAction} from "../../redux/actions";

function App() {
  const dispatch = useDispatch();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div
          className="App-link"
          onClick={() => {
            console.log('clicked');
            dispatch(testAction);
          }}
        >
          Learn React
        </div>
      </header>
    </div>
  );
}

export default App;
