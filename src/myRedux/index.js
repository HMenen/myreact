const createStore = (reducer, preloadedState, enhancer) => {
  let state = preloadedState;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(cb => cb())
  }

  const subscribe = (cb) => {
    listeners.push(cb);
    return () => listeners.filter(item => item !== cb)
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }
    return enhancer(createStore)(reducer, preloadedState);
  }

  return { getState, dispatch, subscribe };
}

export const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](state[key], action);
        return nextState;
      }, {}
    )
  }
}

const compose = (...funcs) => {
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

export const applyMiddleware = ( ...middlewares) => (createStore) => {
  return (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState);
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => store.dispatch(action, ...args)
    }
    const chins = middlewares.map(middleware => middleware(middlewareAPI))
    const dispatch = compose(...chins)(store.dispatch);
    return {
      ...store,
      dispatch
    } 
  }
}



// export const addLoggingToDispatch = (store) => {
//   const rawDiapatch = store.dispatch;
//   return (action) => {
//     console.group(action.type);
//     console.log('%c previous state', 'color: red', store.getState());
//     const returnValue = rawDiapatch(action);
//     console.log('%c next state', 'color: blue',store.getState());
//     console.group(action.type);
//     return returnValue;
//   }
// }

// export const addPromiseSupportToDispatch = (store) => {
//   const next = store.dispatch;
//   return (action) => {
//     if (typeof action.then === 'function') {
//       return action.then(next);
//     }
//     return next(action);
//   }
// }

export default createStore;




// const plugin1Middle = ({ getState, dispatch }) => next => action => {
//   console.log('plugin1-start');
//   next(action);
//   console.log(action);
//   console.log('plugin1-end');
// }

// const plugin1 = plugin1Middle({
//   getState: () => {},
//   dispath: () => {}
// });
 
// const plugin2Middle = ({ getState, dispatch }) => next => action => {
//   console.log('plugin2-start');

//   if (action.type === 'xxxxx') {
//     return;
//   }


//   next(action);
//   console.log(action);
//   console.log('plugin2-end');
// }

// const plugin2 = plugin2Middle({
//   getState: () => {},
//   dispath: () => {}
// });

// dispatch = compose([plugin1, plugin2])(store.dispatch)