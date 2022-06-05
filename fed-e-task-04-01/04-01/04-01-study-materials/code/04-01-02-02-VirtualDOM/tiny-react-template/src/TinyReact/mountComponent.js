import isFunction from "./isFunction";
import isFunctionComponent from "./isFunctionComponent";
import mountNatiiveElement from "./mountNativeElement";

export default function mountComponent(virtualDOM, container){
  let nextVirtualDOM = null
  //判断组建是类组建还是函数组件
  if(isFunctionComponent(virtualDOM)){
    //函数组件
    console.log("函数组件");
    nextVirtualDOM =  buildFunctionComponent(virtualDOM);
    console.log(nextVirtualDOM)
  }else{
    //类组建
    nextVirtualDOM = buildClassComponent(virtualDOM);
  }

  if(isFunction(nextVirtualDOM)){
    mountComponent(nextVirtualDOM, container)
  }else{
    mountNatiiveElement(nextVirtualDOM, container)
  }
}

function buildFunctionComponent (virtualDOM) {
  return virtualDOM.type(virtualDOM.props || {})
}

function buildClassComponent (virtualDOM) {
  //virtualDOM的 type 属性中存储的就是 这个组件的构造函数
  const component = new virtualDOM.type(virtualDOM.props || {});
  const nextVirtualDOM = component.render();
  return nextVirtualDOM;
}