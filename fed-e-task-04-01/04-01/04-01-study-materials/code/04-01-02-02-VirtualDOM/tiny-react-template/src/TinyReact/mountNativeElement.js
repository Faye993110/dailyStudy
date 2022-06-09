import mountElement from "./mountElement";
import createDOMElement from "./createDOMElement"
import unmountNode from "./unmountNode";

export default function mountNatiiveElement(virtualDOM, container, oldDOM){
  
   let newElement = createDOMElement(virtualDOM);
   
  
   if(oldDOM){
     // newElement 插入到 oldDOM 前面
     container.insertBefore(newElement, oldDOM)
   }else{
    container.appendChild(newElement);
   }
   
   if(oldDOM){
     console.log('oldDOM 存在')
    unmountNode(oldDOM)
   }
   

   let component = virtualDOM.component;
   if(component){
     component.setDOM(newElement);
   }
}