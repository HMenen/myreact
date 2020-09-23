// import React from 'react';
// import ReactDOM from 'react-dom';
// import React from './MyReact/react';
// import React from './MyReact';
// import ReactDOM from './MyReact/react-dom';
import React from './toy-react/toy-react';
import ReactDOM from './toy-react/toy-react-dom';
import './index.css';

let style = { border: '3px solid red', margin: '5px' }

class MyComponent{

}

let a = (
  <div>
    <span>1</span>
    <span></span>
    <span></span>
  </div>
)


// document.body.appendChild(a);
ReactDOM.render(
  a , 
  document.getElementById('root')
)