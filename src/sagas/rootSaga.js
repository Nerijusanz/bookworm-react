import { call, put, takeLatest } from "redux-saga/effects";

// ---------------------types------------------------------
export const CREATE_USER_REQUEST = "CREATE_USER_REQUEST";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";
// --------------------------------------------------------

// ----------------dispatch to redux------------------------
export const createUserRequest = user => ({
  type: CREATE_USER_REQUEST,
  payload: user
});

export const createUserSuccess = user => ({
  type: CREATE_USER_SUCCESS,
  payload: user
});

export const createUserFailure = error => ({
  type: CREATE_USER_FAILURE,
  payload: error
});

// ---------------sagas actions-----------------------------------
export function* createUserSaga(action) {
  try {
    const user = yield call("API request to server here...", action.payload);

    yield put(createUserSuccess(user));
  } catch (err) {
    yield put(createUserFailure(err)); // got errors from server
  }
}

// ---------------------------------------------------------

// --------------------ROOT SAGA----------------------------
export default function* rootSaga() {
  yield takeLatest(CREATE_USER_REQUEST, createUserSaga);
}
