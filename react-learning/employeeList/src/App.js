import React from 'react'

import EmployeeList from './features/employees/EmployeeList'
import AddEmployee from "./features/employees/AddEmployee";

function App() {
  return (
    <div className="App">
          <div>
            <EmployeeList />
          </div>
        <AddEmployee/>
    </div>
  )
}

export default App
