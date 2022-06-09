import mountElement from "./mountElement";
import updateComponent from "./updateComponent";

export default function diffComponent(virtualDOM, oldComponent, oldDOM, container){
  if(isSameComponent(virtualDOM, oldComponent)){
    //同一个组件，做组件更新
    console.log('text');
    updateComponent(virtualDOM, oldComponent, oldDOM, container);
  }else{
    // 不是同一个组件
    console.log('不是同一个组件')
   mountElement(virtualDOM, container, oldDOM)
  }
}


//判断是否是同一个组件
function isSameComponent(virtualDOM, oldComponent){

  //判断是否是同一个构造函数
  return oldComponent && virtualDOM.type === oldComponent.constructor

}