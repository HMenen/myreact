
function createElement (type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children
    }
  }
}

function render(vDom, container) {
  let dom;
  if (typeof vDom !== 'object') {
    dom = document.createTextNode(vDom);
  } else {
    console.log('vDom.type', vDom.type)
    dom = document.createElement(vDom.type);
  }
  if (vDom.props) {
    Object.keys(vDom.props)
      .filter(key => key !== 'children')
      .forEach(key => dom[key] = vDom.props[key])
  }
  if (vDom.props && vDom.props.children && vDom.props.children.length > 0) {
    vDom.props.children.forEach(child => render(child, dom))
  }

  container.appendChild(dom);
}


// function performUnitOfWork(fiber) {
//   if (!fiber.dom) {
//     fiber.dom = createDom();
//   }

//   if (fiber.return) {
//     fiber.return.dom.appendChild(fiber.dom);
//   }

// }


export default {
  createElement,
  render,
}