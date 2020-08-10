import React, { useState, useEffect } from 'react';
import { createStore } from 'redux';

const reducer = (initState = 0, action) => {
  switch(action.type) {
    case 'LIKE':
      return initState + 1;
    case 'DISLIKE':
      return initState - 1;
    default:
      return initState;
  }
}

const store = createStore(reducer);

const Demo1 = props => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    store.subscribe(() => {
      let newState = store.getState();
      setCount(newState);   
    });
  }, [])

  const handleLike = () => {
    store.dispatch({type: 'LIKE'});
  }

  return(
    <div>
      <button onClick={handleLike}>like</button>
      <div>
        {store.getState()}
      </div>
    </div>
  )
}


class ClassDemo1 extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  componentDidMount() {
    store.subscribe(() => {
      let newState = store.getState();
      this.setState({count: newState});   
    });
  }

  handleLike = () => {
    store.dispatch({type: 'LIKE'});
  }

  render() {
    return(
      <div>
      <button onClick={this.handleLike}>like</button>
      <div>
        {this.state.count}
      </div>
    </div>
    )
  }
}

// store.subscribe(() => {
//   console.log(store.getState())
//   Demo1()
// });
export default Demo1;

