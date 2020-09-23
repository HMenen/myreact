const { render } = require("@testing-library/react");

function render(element, parent) {
  parent.appendChild(element.getDOM());
}

export default {
  render
}