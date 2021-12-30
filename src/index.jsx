import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <button className="btn my-first-step">first</button>
    <button className="btn my-second-step">second</button>
    <button className="btn my-third-step">third</button>
  </React.StrictMode>,
  document.getElementById('root')
);
