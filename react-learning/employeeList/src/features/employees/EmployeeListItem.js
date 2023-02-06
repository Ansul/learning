import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
    employeeDeleted,
  selectEmployeeById,
} from './employeesSlice'

const EmployeeListItem = ({ id }) => {
  const employee = useSelector((state) => selectEmployeeById(state, id))
  const {firstName, lastName, age } = employee

  const dispatch = useDispatch()

  const onDelete = () => {
    dispatch(employeeDeleted(employee.id))
  }

  return (
      <tr className={`employee-data-${employee.id}`}>
        <td id={`employee-remove-${employee.id}`}>
          <input
            className="toggle"
            type="checkbox"
            onChange={onDelete}
          />
        </td>
        <td id={`employee-id-${employee.id}`}>{employee.id}</td>
        <td id={`employee-firstName-${employee.id}`}>{firstName}</td>
        <td id={`employee-lastName-${employee.id}`}>{lastName}</td>
        <td id={`employee-age-${employee.id}`}>{age}</td>
      </tr>
  )
}

export default EmployeeListItem
