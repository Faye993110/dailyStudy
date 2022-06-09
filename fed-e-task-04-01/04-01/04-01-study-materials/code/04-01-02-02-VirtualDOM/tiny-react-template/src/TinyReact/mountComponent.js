import isFunction from "./isFunction";
import isFunctionComponent from "./isFunctionComponent";
import mountNatiiveElement from "./mountNativeElement";

export default function mountComponent(virtualDOM, container, oldDOM){
  let nextVirtualDOM = null;
  let component = null;
  //判断组建是类组建还是函数组件
  if(isFunctionComponent(virtualDOM)){
    //函数组件
    console.log("函数组件");
    nextVirtualDOM =  buildFunctionComponent(virtualDOM);
    console.log(nextVirtualDOM)
  }else{
    //类组建
    nextVirtualDOM = buildClassComponent(virtualDOM);
    component = nextVirtualDOM.component;
  }

  if(isFunction(nextVirtualDOM)){
    mountComponent(nextVirtualDOM, container, oldDOM)
  }else{
    mountNatiiveElement(nextVirtualDOM, container, oldDOM)
  }

  if(component){
    component.componentDidMount()
    if(component.props && component.props.ref){
      component.props.ref(component)
    }
  }
}

function buildFunctionComponent (virtualDOM) {
  return virtualDOM.type(virtualDOM.props || {})
}

function buildClassComponent (virtualDOM) {
  //virtualDOM的 type 属性中存储的就是 这个组件的构造函数
  const component = new virtualDOM.type(virtualDOM.props || {});
  const nextVirtualDOM = component.render();

  //组件的实例对象挂在到返回的virtualDOM 上
  nextVirtualDOM.component = component;
  return nextVirtualDOM;
}