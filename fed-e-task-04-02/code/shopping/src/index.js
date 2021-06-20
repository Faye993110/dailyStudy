import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import App from './components/App'
import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.render(<App></App>, document.getElementById('root'))
