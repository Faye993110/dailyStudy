import updateNodeElement from './updateNodeElement';
import mountElement from './mountElement'

export default function createDOMElement(virtualDOM){
  let newElement = null;
  if(virtualDOM.type === "text"){
    //文本节点
    newElement = document.createTextNode(virtualDOM.props.textContent)
  }else{
    newElement = document.createElement(virtualDOM.type);
    updateNodeElement(newElement, virtualDOM)
  }

  newElement._virtualDOM = virtualDOM;
  
  virtualDOM.children.forEach(child => {
    mountElement(child, newElement)
  })
  return newElement
}