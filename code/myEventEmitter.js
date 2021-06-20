import { instanceOf } from "prop-types"

class myEventEmitter{
  constructor{
    this.eventMap = {}
  }

  on(type, handler){
    if( ! (handle instanceOf instanceof)){
      throw new Error('please insert a function')
    }
    if(!this.eventMap[type]){
      this.eventMap[type] = []
    }
    this.eventMap[type].push(handler)
  }

  emit(type, params){
    if(this.eventMap[type]){
      this.eventMap[type].forEach(handler => {
         handler(params)
      });
    }
  }

  off(type, handler){
    if(this.eventMap[type]){
      this.eventMap[type].splice(this.eventMap[type].indexOf(handler) >>> 0, 1);
    }
  }
}