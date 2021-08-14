const fp = require('lodash/fp')

const cars = [
  {
    name: 'a',
    horse: '100',
    value: '200',
    in_stock: true,
  },
  {
    name: 'b',
    horse: '100',
    value: '200',
    in_stock: false,
  },
  {
    name: 'c',
    horse: '100',
    value: '200',
    in_stock: false,
  },
  {
    name: 'd',
    horse: '100',
    value: '200',
    in_stock: false,
  },
  {
    name: 'e',
    horse: '100',
    value: '200',
    in_stock: true,
  },
  {
    name: 'f',
    horse: '100',
    value: '200',
    in_stock: false,
  },
]
let isLastInStock = function (cars) {
  //获取最后一条数据
  let last_car = fp.last(cars)
  //获取最后一条数据的in_stock属性
  return fp.prop('in_stock', last_car)
}

let newIsLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)

console.log(newIsLastInStock(cars))
