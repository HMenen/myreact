import React, { useState, useEffect } from 'react';

const Demo1 = props => {

  const [count, setCount] = useState([{count: 0}])

  const handleClick = () => {
    // console.log('=====0=============')
    // console.log('--click---');
    // console.log('=====2=============')
    // setTimeout(function () {
    //   console.log("timeout");
    // }, 0);
    // console.log('=====1=============')
    // Promise.resolve().then(function () {
    //   console.log("promise");
    // });
   
    count.map(c => {
      console.log('-----', c.count);
      return
    })
    setCount({count: new Date().getTime()});
    setTimeout(handleClick, 2000);
  }

  useEffect(() => {
    console.log('====', count)
  }, [count])

  return (
    <div className="outer" onClick={handleClick}>
      outer
      {JSON.stringify(count)}
      <div className="inner" onClick={handleClick}>inner</div>
    </div>
  )
}

export default Demo1;