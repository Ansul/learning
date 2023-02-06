import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'

import './api/server'

import store from './store'
import { fetchEmployees } from './features/employees/employeesSlice'

store.dispatch(fetchEmployees())

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
)
