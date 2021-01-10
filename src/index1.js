// import React from 'react';
// import ReactDOM from 'react-dom';
// import React from './MyReact/react';
import React from './MyReact';
import ReactDOM from './MyReact/react-dom';
import './index.css';

let style = { border: '3px solid red', margin: '5px' }

// let element = (
//   <div id='A1' style={style}>
//     A1
//     <div id='B1' style={style}>
//       B1
//       <div id='C1' style={style}>C1</div>
//       <div id='C2' style={style}>C2</div>
//     </div>
//     <div id='B2' style={style}>B2</div>
//   </div>
// )
// console.log(element)
// ReactDOM.render(element, document.getElementById('root'))

// const render2 = document.getElementById('render2');
// render2.addEventListener('click', () => {
//   let element2 = (
//     <div id='A1-new' style={style}>
//       A1-new
//       <div id='B1-new' style={style}>
//         B1-new
//         <div id='C1-new' style={style}>C1-new</div>
//         <div id='C2-new' style={style}>C2-new</div>
//       </div>
//       <div id='B2-new' style={style}>B2-new</div>
//       <div id='B3' style={style}>B3</div>
//     </div>
//   )
//   ReactDOM.render(element2, document.getElementById('root'))

// })

// const render3 = document.getElementById('render3');
// render3.addEventListener('click', () => {
//   let element3 = (
//     <div id='A1-new3' style={style}>
//       A1-new3
//       <div id='B1-new3' style={style}>
//         B1-new3
//         <div id='C1-new3' style={style}>C1-new3</div>
//         <div id='C2-new3' style={style}>C2-new3</div>
//       </div>
//       <div id='B2-new3' style={style}>B2-new3</div>
//     </div>
//   )
//   ReactDOM.render(element3, document.getElementById('root'))
// })

class ClassCounter extends React.Component{
  constructor(props) {
    super(props);
    this.state = { count: 0 }
  }

  handleClick = () => {
    this.setState(state => (
      {
        count: state.count + 1
      }
    ))
  }

  render() {
    return(
      <div id='counter'>
        <span>{this.state.count}</span>
        <button onClick={this.handleClick}>+1</button>
      </div>
    )
  }
}

const ADD = 'ADD';
const reducer = (action, state) => {
  switch(action.type) {
    case ADD:
      return {count: state.count + 1}
    default:
      return state;
  }
}
function FunctionCounter() {
  // const [countState, dispatch] = React.useReducer(reducer, { count: 0 })
  const [numberState, setNumber] = React.useReducer(null, { number: 0 });
  console.log(numberState)
  return(
    <dv>
      {/* <span>{countState.count}</span> */}
      {/* <button onClick={() => dispatch({ type: ADD })}>+1</button> */}
      {/* <button onClick={() => dispatch({ count: countState.count + 1 })}>+1</button> */}
      <span>{numberState.number}</span>
      <button onClick={() => {
        console.log('==1=numberState==', numberState)
        setNumber({number: numberState.number + 1})
      }}>+1hhh</button>
    </dv>
  )
}

ReactDOM.render(<FunctionCounter name='计数器'/> , document.getElementById('root'))