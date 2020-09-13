import React, { useState, useEffect } from 'react';
// import watermark from 'watermark-dom';
// import watermark from 'water-mark-oc'
import watermark from 'watermarkjs';

class Demo2 extends React.Component{
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
    console.log(watermark)
    // watermark.init({ watermark_txt: "测试水印，1021002301，测试水印，100101010111101" , watermark_width: 200});
    // /*添加水印*/
    // watermark.load({ watermark_parent_node: "watermark-parent", watermark_txt: "saucxs，1021002301，测试水印，100101010111101" });
    // watermark.init({ watermark_txt: 'qinglinn' })//用来初始化水印
    // watermark.load({ watermark_txt: 'qinglinn' })//用来加载水印
    // console.log(watermark);
    // watermark({
    //   content: 'user',
    // });
    watermark(['../../public/favicon.ico', '../../public/logo192.png'])
      .image(watermark.image.lowerRight(0.5))
      .then(img => {
        debugger
        document.getElementById('add-watermark').appendChild(img)
      });
  }

  render() {
    return(
      <div id='add-watermark'>
        <button onClick={this.props.onIncrement}>like</button>
        {/* <div>
          {this.props.count}
        </div> */}
    </div>
    )
  }
}

export default Demo2;

