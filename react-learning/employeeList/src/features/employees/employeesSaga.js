import { call, delay, takeEvery } from 'redux-saga/effects'
import { client } from '../../api/client'

function* putUserWorkerFunction(argsUserData) {
    console.log("argUserData", argsUserData);
    yield delay(1000);
    const {payload} = argsUserData;
    try {
        // Integration pending
        const response = yield call(client.post("/fakeApi/employees", {employee: payload}))
        console.log(response)
    } catch (e) {
    }

}

export default function* rootSaga() {
    yield takeEvery("PUT_EMPLOYEE_DATA_SAGA", putUserWorkerFunction);
}

export const sagaActions = {
    PUT_EMPLOYEE_DATA_SAGA: "PUT_EMPLOYEE_DATA_SAGA"
};
