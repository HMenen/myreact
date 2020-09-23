function createElement(type, attributes, ...children) {
  let element;

  let result = []

  const visit = children => {
    for (let child of children) {
      if (child === null) void 0;
      else if (typeof child === 'string') {
        result.push(new TextWrapper(child)); 
      }
      else if (typeof child === 'number') {
        result.push(new TextWrapper(child.toString())); 
      }
      else if (typeof child === 'object' && child instanceof Array) {
        visit(child)
      } else {
        result.push(child);
      }
    }
  }
  visit(children);

  if (typeof type === 'string') {
    element = new ElementWrapper(type, attributes)
  } else {
    element = new type(attributes, children);
  }

  for(let name in attributes) {
    element.setAttribute(name, attributes[name]);
  }

  return element;
}

export class Component{
  constructor(attributes, children) {
    this.props = attributes;
    this.children = children;
    this.root = null
  }

  setState(state) {
    this.state = state;
    let newRoot = this.render().getDOM()
    if (this.root) {
      this.root.parent.replaceChild(newRoot, this.root)
    }
  }

  getDOM() {
    this.root = this.render().getDOM()
    return this.root;
  }
}


class ElementWrapper{
  constructor(type, attributes) {
    this.root = document.createElement(type)
    for(let name in attributes) {
      if (name.match(/^on/)) {
        this.root.addEvemtListerer(name.replace(/^on/, '').toLowerCase().attribute())
      }
      if (name === 'className') {
        this.root.setAttribute('class', attributes[name]);
      } else {
        this.root.setAttribute(name, attributes[name]);
      }
    }
    // for (let child of children) {
    //   if(typeof child === 'string') {
    //     child = document.createTextNode(child);
    //   }
    // }
  }

  appendChild() {
    // this.root.appendChild(child.getDOM())
  }
  
  getDOM() {
    return this.root;
  }
}

class TextWrapper{
  constructor(content) {
    this.root = document.createTextNode(content)
    // for(let name in attributes) {
    //   this.root.setAttribute(name, attributes[name]);
    // }
  }
  
  getDOM() {
    return this.root;
  }
}

export default {
  createElement,
}
