import mountNativeElement from './mountNativeElement';
import isFunction from './isFunction';
import mountComponent from './mountComponent'

export default function mountElement(virtualDOM, container, oldDOM){
  

  if(isFunction(virtualDOM)){
    console.log('jjjjj');
    // Component
     mountComponent(virtualDOM,container,oldDOM);
  }else{
    //普通元素 NativeElement
     mountNativeElement(virtualDOM, container,oldDOM)
  }
  
  

}