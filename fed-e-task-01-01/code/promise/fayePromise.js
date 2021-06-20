const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class FayePromise {
  //是个类，然后传递一个执行器
  //执行器接收两个参数，resolve，reject
  // 立即执行，所以写在构造函数里面
  constructor(executor) {
    executor(this.resolve, this.reject)
  }

  status = PENDING
  value = undefined
  reason = undefined

  successCallback = []

  failCallback = []
  //箭头函数，在调用的时候指向这个实例对象
  //这两个函数就是用来更改状态的
  resolve = (value) => {
    if (this.status !== PENDING) return
    this.status = FULFILLED
    this.value = value
    //this.successCallback && this.successCallback(this.value)
    while (this.successCallback.length) {
      this.successCallback.shift()(this.value)
    }
  }

  reject = (reason) => {
    if (this.status !== PENDING) return
    this.status = REJECTED
    this.reason = reason
    //this.failCallback && this.failCallback(this.reason)
    while (this.failCallback.length) {
      this.failCallback.shift()(this.reason)
    }
  }

  then(successCallback, failCallback) {
    if (this.status === FULFILLED) {
      successCallback(this.value)
    } else if (this.status === REJECTED) {
      failCallback(this.reason)
    } else {
      this.successCallback.push(successCallback)
      this.failCallback.push(failCallback)
    }
  }
}

//遵循common.js 规范

module.exports = FayePromise
