import createDOMElement from './createDOMElement';
import mountElement from './mountElement';
import updateNodeElement from './updateNodeElement';
import updateTextNode from './updateTextNode';
import unmountNode from './unmountNode';

export default function diff(virtualDOM, container,oldDOM){
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
   //判断oldDom 是否存在
   if(!oldDOM){
     mountElement(virtualDOM, container)
   }else if(virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM.type !== 'function'){
      const newElement = createDOMElement(virtualDOM);
      oldDOM.parentNode.replaceChild(newElement, oldDOM)
   }else if(oldVirtualDOM && oldVirtualDOM.type === oldVirtualDOM.type){
     // 对比节点类型是否一致，如果一致，判断是文本还是属性发生变化
     if(virtualDOM.type === 'text'){
       //更新内容
       updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
     }else{
      //更新元素节点属性
      updateNodeElement(oldDOM,virtualDOM,oldVirtualDOM)

     }
     virtualDOM.children.forEach((child,i) => {
       diff(child, oldDOM, oldDOM.childNodes[i])
     })

     //删除节点
     let oldChildNodes = oldDOM.childNodes;
     if(oldChildNodes.length > virtualDOM.children.length){
       for(let i = oldChildNodes.length -1; i > virtualDOM.children.length-1; i--){
         unmountNode(oldChildNodes[i])
       }
     }
   }
}