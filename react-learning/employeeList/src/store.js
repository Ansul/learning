import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSaga from "redux-saga";

import employeeListReducer from './features/employees/employeesSlice'
import employeesSaga from './features/employees/employeesSaga'

let sagaMiddleware = createSaga();
const middleware = [...getDefaultMiddleware({ thunk: true }), sagaMiddleware];

const store = configureStore({
  reducer: {
    employees: employeeListReducer
  },
  middleware
})

sagaMiddleware.run(employeesSaga);

export default store
