export default function updateNodeElement(
  newElement, 
  virtualDOM, 
  oldVirtualDOM={}
  ) {
  
  const newProps = virtualDOM.props || {};
  const oldProps = oldVirtualDOM.props || {};

  Object.keys(newProps).forEach(propName => {

    //同一个属性所对应的值
    const newPropsValue = newProps[propName];
    const oldPropsValue = oldProps[propName];
    if(newPropsValue!== oldPropsValue){
      //判断属性是否是事件属性
      if(propName.slice(0,2) === 'on'){
        //事件名称
        const eventName = propName.toLocaleLowerCase().slice(2);
        //为元素添加事件
        newElement.addEventListener(eventName, newPropsValue);

        //删除原来的事件处理函数
        if(oldPropsValue){
          newElement.removeEventListener(eventName, oldPropsValue)
        }
      }else if(propName === 'value' || propName === 'checked'){
        newElement[propName] = newPropsValue
      }else if(propName !== 'children'){
        if(propName === 'className'){
          newElement.setAttribute('class', newPropsValue)
        }else{
          newElement.setAttribute(propName, newPropsValue)
        }
      }
    }
    
  })

  //判断属性被删除的情况
  Object.keys(oldProps).forEach(propName => {
    const newPropsValue = newProps[propName];
    const oldPropsValue = oldProps[propName];
    if(!newPropsValue){
      //属性被删除了
      if(propName.slice(0,2) ==='on'){
        const eventName = propName.toLowerCase().slice(2);
        newElement.removeEventListener(eventName, oldPropsValue)
      }else if(propName !== 'children'){
        newElement.removeAtrribute(propName)
      }
    }
  })

}