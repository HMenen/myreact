import React, { useState, useEffect } from 'react';
// import createStore, { combineReducers, addLoggingToDispatch, applyMiddleware } from './myRedux';
import createStore, { combineReducers, applyMiddleware } from './myRedux';
// import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  fetchPosts
} from './acions/async';


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

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_POSTS:
      console.log('--REQUEST_POSTS---')
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      console.log('--RECEIVE_POSTS---', state)
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      })
    default:
      return state
  }
}


export const logger = ({getState, dispatch}) => next => action => {
  console.log('logger-start');
  console.group(action.type);
  console.log('%c previous state', 'color: red', store.getState());
  const returnValue = next(action);
  console.log('%c next state', 'color: blue',store.getState());
  console.group(action.type);
  console.log('logger-end');
  // console.log('=logger======', returnValue);
  // return returnValue;
}

export const logger2 = ({getState, dispatch}) => next => (action) => {
  console.log('logger2-start');
  console.group(action.type);
  const returnValue = next(action);
  console.group(action.type);
  console.log('logger2-end');
  // console.log('=logger2======', returnValue);
  // return returnValue;
}

function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => (next) => (action) => {
    console.log('createThunkMiddleware-start');
    if (typeof action === 'function') {
      console.log('-extraArgument', extraArgument)
      return action(dispatch, getState, extraArgument);
    }
    console.log('createThunkMiddleware-end');
    return next(action);
  };
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
  showVisible,
  postsBySubreddit
}), {}, applyMiddleware(
  logger, logger2, 
  createThunkMiddleware('sasa')
  // thunk
  ));


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
    // store.dispatch({ type: 'INCREMENT'});
    store.dispatch(fetchPosts(121));
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