function createElement(tag, attrs, ...children){
  return {
      tag,
      attrs,
      children
  }
}

function render(vnode, container) {
  //当vnode为字符串时，渲染结果是一段文本
  if (typeof vnode === "string") {
    const textNode = document.createTextNode(vnode)
    return container.appendChild(textNode)
  }

  const dom = document.createElement(vnode.tag)

  //设置属性
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      const value = vnode.attrs[key]
      dom.setAttribute(key, value)
    })
  }

  //递归渲染子节点
  vnode.children.forEach(child=> render(child, dom))

  return container.appendChild(dom)
}