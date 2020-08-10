import React from 'react';
import ReactDOM from 'react-dom';
// import React from './MyReact';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Demo1 from './Demo1';
import ReduxDemo1 from './ReduxDemo1';

// const ReactDOM = React;
// ReactDOM.render(Demo1 , document.getElementById('root'));

ReactDOM.render(
    <ReduxDemo1 />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
