import { configureStore } from '@reduxjs/toolkit'

import employeeListReducer from './features/employees/employeesSlice'

const store = configureStore({
  reducer: {
    employees: employeeListReducer
  },
})

export default store
