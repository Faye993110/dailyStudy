import React from 'react'
import Cart from './cart'
import Product from './product'
import moment from 'moment'
import DatePicker from 'react-datepicker'

function App() {
  const val = moment().utcOffset()
  const rr = moment.utc(1618217620100).toDate()
  const value = moment(new Date(1618217620100))
  const res = moment(1618217620100).format('YYYY-MM-DD HH:mm:ss')
  return <div>{res}</div>
}

export default App
