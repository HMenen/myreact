import React, { useState, useEffect } from 'react';
// import createStore, { combineReducers, addLoggingToDispatch, applyMiddleware } from './myRedux';
import createStore, { combineReducers, applyMiddleware } from './myRedux';
// import { createStore, combineReducers, applyMiddleware } from 'redux';

export const logger = ({getState, dispatch}) => next => action => {
  console.log('logger-start');
  console.group(action.type);
  console.log('%c previous state', 'color: red', store.getState());
  const returnValue = next(action);
  console.log('%c next state', 'color: blue',store.getState());
  console.group(action.type);
  console.log('logger-end');
  return returnValue;
}

export const logger2 = ({getState, dispatch}) => next => (action) => {
  console.log('logger2-start');
  console.group(action.type);
  const returnValue = next(action);
  console.group(action.type);
  console.log('logger2-end');
  return returnValue;
}

export const thunk = ({getState, dispatch}) => next => action => {
  if (typeof action === 'function') {
    action({getState, dispatch})(action);
  }
  return next(action);
}

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const showVisible = (state = false, action) => {
  switch (action.type) {
    case 'SHOWBUTTON':
      return true;
    case 'HIDDENBUTTON':
      return false;
    default:
      return state;
  }
}

// const store = createStore(counter);
const store = createStore(combineReducers({
  counter: counter,
  showVisible
}), {}, applyMiddleware(logger, logger2));



const Demo = () => {
  const [count, setCount] = useState(0);
  const [btnVisible, setBtnVisible] = useState(false);

  useEffect(() => {
    store.subscribe(() => {
      let newState = store.getState();
      setCount(newState.counter);
      setBtnVisible(newState.showVisible);
    });
  }, [])
  
  const add = () => {
    store.dispatch({ type: 'INCREMENT'});
    // addLoggingToDispatch(store)({ type: 'INCREMENT'});
  }

  const handleBtnVisible = () => {
    store.dispatch({ type: 'SHOWBUTTON'});
    // addLoggingToDispatch(store)({ type: 'SHOWBUTTON'})
  }

  return (
    <div>
      {count}
      <button onClick={add}>+1</button>
      <div>
        <button onClick={handleBtnVisible}>点击右方按钮置灰</button>
        <button disabled={btnVisible}>显示测试按钮</button>
      </div>
    </div>
  )
}

export default Demo;