import React from 'react';
import ReactDOM from 'react-dom';
import watermark from 'watermark-dom'
// import React from './MyReact';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Demo1 from './Demo1';
import ReduxDemo1 from './ReduxDemo1';
import ReduxDemo2 from './ReduxDemo2';

import { createStore } from 'redux';
import { connect, Provider} from 'react-redux';
import Demo2 from './ReduxDemo1/Demo2';
import counter from './reducers/demo1';

import EventDemo1 from './EventLoopDemo/Demo1';

const store = createStore(counter);
const mapStateToProps = state => {
  return {
    count: state
  }
}

const mapDispatchToProps = state => {
  return {
    onIncrement: () => {
      store.dispatch(
        {
          type: 'INCREMENT'
        }
      )
    },
    onDecrement: () => {
      store.dispatch(
        {
          type: 'DECREMENT'
        }
      )
    }
  }
}

// const ReactDOM = React;
// ReactDOM.render(Demo1 , document.getElementById('root'));

// ReactDOM.render(
//   <ReduxDemo2 />,
//   document.getElementById('root')
// );

ReactDOM.render(
  <ReduxDemo2 />,
  document.getElementById('root')
);

// ReactDOM.render(
//   <EventDemo1 />,
//   document.getElementById('root')
// );

// const ReduxDemo2 = connect(mapStateToProps, mapDispatchToProps)(Demo2);
// ReactDOM.render(
//   <Provider store={store}>
//     <ReduxDemo2 />
//   </Provider>
//   ,
//   document.getElementById('root')
// );

serviceWorker.unregister();
