let rootFiber = require('./element');
let nextUnitOfWork = null; //下一个执行单元 

function workLoop() {
  // while (nextUnitOfWork) { //如果有待执行待执行单元就执行，返回下一个执行单元
  while((deadline.timeRemaining() > 1 || deadline.didTimeout) && works.length > 0) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (!nextUnitOfWork) {
    console.log('render 结束')
  } else {
    requestIdleCallback(workLoop, {timeout: 1000});
  }
}

function performUnitOfWork(fiber) {
  beginWork(fiber);
  if (fiber.child) {
    return fiber.child;
  }
  while (fiber) {
    completeUnitOfWork(fiber);
    if (fiber.sibling) {
      return fiber.sibling;
    }
    fiber = fiber.return;
  }
}

function completeUnitOfWork(fiber) {
  console.log("=结束==", fiber.key)
}

function beginWork(fiber) {
  if (fiber) {
    console.log("=开始==", fiber.key)
  }
}
  

nextUnitOfWork = rootFiber;

requestIdleCallback(workLoop, {timeout: 1000})