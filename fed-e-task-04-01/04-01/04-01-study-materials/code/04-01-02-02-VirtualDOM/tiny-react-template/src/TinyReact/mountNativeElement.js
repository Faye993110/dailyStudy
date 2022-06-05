import mountElement from "./mountElement";
import createDOMElement from "./createDOMElement"

export default function mountNatiiveElement(virtualDOM, container){
  
   let newElement = createDOMElement(virtualDOM);;
   
   container.appendChild(newElement)
}