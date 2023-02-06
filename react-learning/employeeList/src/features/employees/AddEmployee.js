import React from 'react'
import {useDispatch} from 'react-redux'
import {saveNewEmployee} from "./employeesSlice";
import {sagaActions} from "./employeesSaga";

const AddEmployee = () => {
    const dispatch = useDispatch()
    let inputFirstName, inputLastName, inputAge

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                const firstName = inputFirstName.value.trim()
                const lastName = inputLastName.value.trim()
                const age = inputAge.value.trim()
                if (!firstName || !lastName || !age) {
                    return
                }
                dispatch(saveNewEmployee(firstName+','+lastName+','+age))
                inputFirstName.value = ''
                inputLastName.value = ''
                inputAge.value = ''

            }}>
                <input type="text" name="inputFirstName" placeholder="First Name" ref={node => inputFirstName = node} />
                <input type="text" name="inputLastName" placeholder="Last Name" ref={node => inputLastName = node} />
                <input type="text" name="inputAge" placeholder="Age" ref={node => inputAge = node} />
                <button type="submit" onClick={() => dispatch({ type: sagaActions.PUT_EMPLOYEE_DATA_SAGA, payload: inputFirstName.value.trim()+','+inputLastName.value.trim()+','+inputAge.value.trim()})}>
                    Add Employee
                </button>
            </form>
        </div>
    )
}

export default AddEmployee
