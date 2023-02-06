import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'

const employeeListAdapter = createEntityAdapter()
let employeeCount = 0;

const initialState = employeeListAdapter.getInitialState({
  status: 'idle'
})

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await client.get('/fakeApi/employees')
  employeeCount = response.employees.length;
  return response.employees
})

export const saveNewEmployee = createAsyncThunk('employees/saveNewEmployee', async (employeeDetails) => {
  const employeeDetailsArray = employeeDetails.split(",")
  ++employeeCount

  // Add server post call here if needed

  const mockResponse = {id: employeeCount, firstName: employeeDetailsArray[0], lastName: employeeDetailsArray[1], age: parseInt(employeeDetailsArray[2])}
  return mockResponse
})

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    employeeDeleted: employeeListAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        employeeListAdapter.setAll(state, action.payload)
        state.status = 'idle'
      })
      .addCase(saveNewEmployee.fulfilled, employeeListAdapter.addOne)
  },
})

export const {
  employeeDeleted,
} = employeesSlice.actions

export default employeesSlice.reducer

export const {
  selectAll: selectEmployees,
  selectById: selectEmployeeById,
} = employeeListAdapter.getSelectors((state) => state.employees)

export const selectFilteredEmployees = createSelector(
  selectEmployees,
  (state) => state.filters,
  (employees) => employees
)

export const selectFilteredEmployeeIds = createSelector(
    selectFilteredEmployees,
  (filteredEmployees) => filteredEmployees.map((employee) => employee.id)
)
