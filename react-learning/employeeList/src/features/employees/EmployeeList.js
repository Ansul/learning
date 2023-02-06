import React from 'react'
import { useSelector } from 'react-redux'
import EmployeeListItem from './EmployeeListItem'

import { selectFilteredEmployeeIds } from './employeesSlice'

const EmployeeList = () => {
  const employeeIds = useSelector(selectFilteredEmployeeIds)
  const loadingStatus = useSelector((state) => state.employees.status)

  if (loadingStatus === 'loading') {
    return (
      <div className="employee-list">
        <div className="loader" />
      </div>
    )
  }

  const renderedListItems = employeeIds.map((employeeId) => {
    return <EmployeeListItem key={employeeId} id={employeeId} />
  })

  return <table className="employee-list">
    <thead>
      <tr>
        <th></th>
        <th>Employee Id</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Age</th>
      </tr>
    </thead>
    <tbody>
      {renderedListItems}
    </tbody>
  </table>
}

export default EmployeeList
