import { ELEMENT_TEXT } from "./constants";
import { UpdateQueue, Update } from './UpdateQueue';
import { scheduleRoot } from './scheduler';

function createElement (type, config, ...children) {
  return {
    type,
    props: {
      ...config,
      children: children.map(child => {
        return typeof child === 'object' ? child: {
          type: ELEMENT_TEXT,
          props: { text: child, children: [] }
        }
      })
    }
  }
}

class Component {
  constructor(props) {
    this.props = props;
    this.updateQueue = new UpdateQueue()
  }

  setState(payload) { //可能是一个对象，也可能是一个函数
    let update = new Update(payload);
    //updateQueue其实放在该类组件对应单fiber节点的internalFiber
    this.internalFiber.updateQueue.enqueueUpdate(update);
    // this.updateQueue.enqueueUpdate(update);
    scheduleRoot();
  }
}

Component.prototype.isReactomponent = {} //类组件

export default {
  createElement,
  Component
}



// function render(vDom, container) {
//   let dom;
//   if (typeof vDom !== 'object') {
//     dom = document.createTextNode(vDom);
//   } else {
//     console.log('vDom.type', vDom.type)
//     dom = document.createElement(vDom.type);
//   }
//   if (vDom.props) {
//     Object.keys(vDom.props)
//       .filter(key => key !== 'children')
//       .forEach(key => dom[key] = vDom.props[key])
//   }
//   if (vDom.props && vDom.props.children && vDom.props.children.length > 0) {
//     vDom.props.children.forEach(child => render(child, dom))
//   }

//   container.appendChild(dom);
// }