import { takeEvery, put } from 'redux-saga/effects'

import { loadProducts, saveProducts } from '../actions/product.actions'
import axios from 'axios'
//takeEvery 接收action
//put 触发action

//加载商品列表数据
function* handleLoadProducts() {
  const { data } = yield axios.get('http://localhost:3005/goods')
  console.log('123')
  console.log(data)
  yield put(saveProducts(data))
}

export default function* productSaga() {
  //
  yield takeEvery(loadProducts, handleLoadProducts)
}
