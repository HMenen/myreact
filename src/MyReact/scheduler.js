import { setProps } from './utils';
import { Update, UpdateQueue } from './UpdateQueue';
const { TAG_ROOT, TAG_TEXT, TAG_HOST, TAG_CLASS, TAG_FUNCTION_COMPONENT, PLACEMENT, DELETION, UPDATE, ELEMENT_TEXT } = require("./constants");

let nextUnitWork = null;
let workInProgressRoot = null; //正在渲染的根Root
let currentRoot = null; //渲染成功后的当前根Root
let deletions = [] //删除的节点并不放在effectlist中，所以需要单独记录
let workInProgressFiber = null;//正在工作中的fiber
let hookIndex = 0; //hook索引

export function scheduleRoot(rootFiber) {
  //第2次之后第更新，使用双缓冲机制，每次只有2个树
  if (currentRoot && currentRoot.alternate) {
    workInProgressRoot = currentRoot.alternate;
    workInProgressRoot.alternate = currentRoot;
    if (rootFiber) {
      workInProgressRoot.props = rootFiber.props;
    }
  } else if (currentRoot) {
    //不是第一次渲染，第一次更新
    if (rootFiber) {
      rootFiber.alternate = currentRoot;
      workInProgressRoot = rootFiber;
    } else {
      workInProgressRoot = {
        ...currentRoot,
        alternate: currentRoot
      }
    }
  } else {
    //第一次渲染
    workInProgressRoot = rootFiber;
  }
  workInProgressRoot.firstEffect = workInProgressRoot.lastEffect = workInProgressRoot.nextEffect = null;
  // nextUnitWork = rootFiber;
  // workInProgressRoot = rootFiber;
  nextUnitWork = workInProgressRoot;
}

function workLoop(deadine) {
  let shouldYield = false;
  while (nextUnitWork && !shouldYield) {
    nextUnitWork = performUnitWork(nextUnitWork);
    shouldYield = deadine.timeRemaining() < 1
  }
  if (!nextUnitWork && workInProgressRoot) {
    console.log('结束');
    commitRoot();
  }
  requestIdleCallback(workLoop, { timeout: 500 });
}

function performUnitWork(currentFiber) {
  beginWork(currentFiber);
  if (currentFiber.child) {
    return currentFiber.child;
  }
  while(currentFiber) {
    completeUnitOfWork(currentFiber);
    if (currentFiber.sibling) {
      return currentFiber.sibling
    }
    currentFiber = currentFiber.return;
  }
}

function beginWork(currentFiber) {
  if (currentFiber.tag === TAG_ROOT) {
    updateHostRoot(currentFiber)
  } else if (currentFiber.tag === TAG_TEXT) {
    updateHostText(currentFiber)
  } else if (currentFiber.tag === TAG_HOST) {
    updateHost(currentFiber)
  } else if (currentFiber.tag === TAG_CLASS) {
    updateClassComponent(currentFiber)
  } else if (currentFiber.tag === TAG_FUNCTION_COMPONENT) {
    updateFunctionComponent(currentFiber)
  }
}

function completeUnitOfWork(currentFiber) {
  let returnFiber = currentFiber.return;
  if (returnFiber) {
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = currentFiber.firstEffect;
    }
    if (!!currentFiber.lastEffect) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber.firstEffect;
      }
      returnFiber.lastEffect = currentFiber.lastEffect;
    }

  }
  const effectTag = currentFiber.effectTag;
  if (effectTag) {
    if (!!returnFiber.lastEffect) {
      returnFiber.lastEffect.nextEffect = currentFiber;
    } else {
      returnFiber.firstEffect = currentFiber;
    }
    returnFiber.lastEffect = currentFiber;
  }
}


function updateHostRoot(currentFiber) { 
  let newChildren = currentFiber.props.children; //[element]
  reconcileChildren(currentFiber, newChildren)
}

function updateFunctionComponent(currentFiber) {
  workInProgressFiber = currentFiber;
  hookIndex = 0;
  workInProgressFiber.hooks = [];
  const newChildren = [currentFiber.type(currentFiber.props)];
  reconcileChildren(currentFiber, newChildren);
}

function updateClassComponent(currentFiber) {
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = new currentFiber.type(currentFiber.props);
    currentFiber.stateNode.internalFiber = currentFiber;
    currentFiber.updateQueue = new UpdateQueue();
  }
  currentFiber.stateNode.state = currentFiber.updateQueue.fourceUpdate(currentFiber.stateNode.state);
  let newElement = currentFiber.stateNode.render();
  const newChildren = [newElement];
  reconcileChildren(currentFiber, newChildren);
}

function updateHost(currentFiber) {
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = createDom(currentFiber);
  }
  let newChildren = currentFiber.props.children; //[element]
  reconcileChildren(currentFiber, newChildren)
}

function updateHostText(currentFiber) {
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = createDom(currentFiber);
  }
}

function reconcileChildren(currentFiber, newChildren) {
  let newChildIndex = 0;
  let prevSibling;
  let oldiber = currentFiber.alternate && currentFiber.alternate.child;
  if (oldiber) {
    oldiber.firstEffect = oldiber.lastEffect = oldiber.nextEffect = null;
  }
  while(newChildIndex < newChildren.length || oldiber) {
    let newChild = newChildren[newChildIndex];
    let tag;
    let newFiber;
    const sameType = oldiber && newChild && oldiber.type === newChild.type
    // console.log('==a1oldiber===', oldiber, 'newChild==', newChild)
    if (newChild && newChild.type === ELEMENT_TEXT) {
      tag = TAG_TEXT;
    } else if (newChild && typeof newChild.type === 'string') {
      tag = TAG_HOST;
    } else if (newChild && typeof newChild.type === 'function' && newChild.type.prototype.isReactomponent) { // 类组件
      tag = TAG_CLASS;
    } else if (newChild && typeof newChild.type === 'function' ) {
      tag = TAG_FUNCTION_COMPONENT;
    }
    if (sameType) {
      if (oldiber.alternate) {
        newFiber = oldiber.alternate;
        newFiber.alternate = oldiber;
        newFiber.props = newChild.props;
        newFiber.effectTag = UPDATE;
        newFiber.updateQueue = oldiber.updateQueue || new UpdateQueue();
        newFiber.nextEffect = null;
      } else {
        newFiber = {
          tag: oldiber.tag,
          type: oldiber.type,
          props: newChild.props,
          stateNode: oldiber.stateNode,
          alternate: oldiber,
          return: currentFiber,
          effectTag: UPDATE,
          nextEffect: null,
          updateQueue: oldiber.updateQueue || new UpdateQueue()
        }
      }
    } else {
      if (newChild) {
        newFiber = {
          tag,
          type: newChild.type,
          props: newChild.props,
          stateNode: null,
          return: currentFiber,
          effectTag: PLACEMENT,
          nextEffect: null,
          updateQueue: new UpdateQueue()
        }
      }
      if (oldiber) {
        oldiber.effectTag = DELETION
        deletions.push(oldiber);
      }
    }

    if (oldiber) {
      oldiber = oldiber.sibling;
    }

    if (newFiber) {
      if (newChildIndex === 0) {
        currentFiber.child = newFiber;
      } else {
        prevSibling.sibling = newFiber;
      }
      prevSibling = newFiber;
    }
    newChildIndex++;
  }
}

function commitRoot() {
  deletions.forEach(commitWork) //执行effectlist之前先删除无效节点
  let currentFiber = workInProgressRoot.firstEffect;
  while(currentFiber) {
    // console.log('commitRoot===', currentFiber.stateNode)
    commitWork(currentFiber);
    currentFiber = currentFiber.nextEffect;
  }
  deletions.length = 0 //提交之后清空deletions
  currentRoot = workInProgressRoot;
  workInProgressRoot = null;
}

function commitWork(currentFiber) {
  if (!currentFiber) return;
  let returnFiber = currentFiber.return;
  while(returnFiber.tag !== TAG_ROOT && returnFiber.tag !== TAG_HOST && returnFiber.tag !== TAG_TEXT) {
    returnFiber = returnFiber.return;
  }
  let domReturn = returnFiber.stateNode;
  if (currentFiber.effectTag === PLACEMENT) {
    let nextFiber = currentFiber;
    if (nextFiber.tag === TAG_CLASS) return;
    while(nextFiber.tag !== TAG_HOST && nextFiber.tag !== TAG_TEXT) {
      nextFiber = nextFiber.child;
    }
    // console.log('====', currentFiber.stateNode)
    domReturn.appendChild(nextFiber.stateNode);
  } else if (currentFiber.effectTag === DELETION) {
    // domReturn.removeChild(currentFiber.stateNode)
    return commitDeletion(currentFiber, domReturn);
  } else if (currentFiber.effectTag === UPDATE) {
    if (currentFiber.type === ELEMENT_TEXT) {
      if (currentFiber.alternate.props.text !== currentFiber.props.text) {
        currentFiber.stateNode.textContent = currentFiber.props.text
      } else {
        updateDom(currentFiber.stateNode, currentFiber.alternate.props, currentFiber.props)
      }
    }
  }
  currentFiber.effectTag = null;
}

function commitDeletion(currentFiber, domReturn) {
  if (currentFiber.tag === TAG_HOST || currentFiber.tag === TAG_TEXT) {
    domReturn.removeChild(currentFiber.stateNode)
  } else {
    commitDeletion(currentFiber.child, domReturn)
  }
}

function createDom(currentFiber) {
  if (currentFiber.tag === TAG_TEXT) {
    return document.createTextNode(currentFiber.props.text);
  } else if (currentFiber.tag === TAG_HOST) {
    let stateNode = document.createElement(currentFiber.type);
    updateDom(stateNode, {}, currentFiber.props);
    return stateNode;
  }
}

function updateDom(stateNode, oldProps, newProps) {
  if (stateNode && stateNode.setAttribute) {
    setProps(stateNode, oldProps, newProps)
  }
}

export function useReducer(reducer, initialValue) {
  const oldHook = workInProgressFiber.alternate && workInProgressFiber.alternate.hooks 
    && workInProgressFiber.alternate.hooks[hookIndex];
  let newHook = oldHook;
  if (oldHook) {
    //第二次渲染 TODO
    oldHook.state = oldHook.updateQueue.fourceUpdate(oldHook.state)
    console.log('oldHook===', oldHook)
  } else {
    newHook = {
      state: initialValue,
      updateQueue: new UpdateQueue()
    }
  }
  const dispatch = action => {
    let payload = reducer ? reducer(action, newHook.state) : {number: action.number + 1};
    newHook.updateQueue.enqueueUpdate(
      new Update(payload)
    )
    console.log('newHook.updateQueue===', newHook.updateQueue, payload)
    scheduleRoot();
  }
  
  workInProgressFiber.hooks[hookIndex++] = newHook;
  console.log('workInProgressFiber.hooks[hookIndex++]===', newHook)
  // hookIndex++;
  return [newHook.state, dispatch]
}

export function useState(initialValue) {
  return useReducer(null, initialValue)
}

requestIdleCallback(workLoop, { timeout: 500 });


new Promise((res) => {throw Error}).then(() => console.log('==hahah==='), () => console.log('==hahah=2=='))
.then(()=> {console.log('--1---')}, ()=> {console.log('--2---')})
.catch(()=> {console.log('--3---')})