import apiRequest from '../network/api';
import axios from 'axios';
import {
  loginString,
  isLoadingString,
  updateProfileString,
  getAllPatientsOfAUserString,
  getAPatientsInfoString,
  logOutString,
  registerPatientString,
  updateAuthUserString,
} from '../constants/actionStrings';
// import {
//   AsyncStorage
// } from 'react-native';
import EndPoints from '../constants/endPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

// -------------  set user details ------- //
export const setUserDetails = () => async dispatch => {
  const user = await AsyncStorage.getItem('user');
  if (user) {
    dispatch({ type: loginString, payload: { user: JSON.parse(user) } });
  }
};
// ------------------ Login User  ----------------------- //
export const loginUser = loginData => async dispatch => {
  console.log('LOGIN DATA 123', loginData);
  // dispatch({ type: isLoadingString, payload: { loader: true } });
  // let response = await apiRequest(EndPoints.signIn, 'POST', loginData);
  console.log('EndPoints.signIn', EndPoints.signIn);
  axios.post('http://localhost:8001/' + EndPoints.signIn, loginData)
    .then(function (response) {
      if (response && response.data.success) {
        console.log('response22', response);
        AsyncStorage.setItem('userToken', response.data.token);
        AsyncStorage.setItem('user', JSON.stringify(response.data.data));
        dispatch({ type: loginString, payload: response.data });
      }
      dispatch({ type: isLoadingString, payload: { loader: false } });
      console.log('response.data line 38 authAction', response.data);
      return response ? response.data : false;
    }).catch(function (error) {
      // handle error
    })

};

// ------------------ Google Login  ----------------------- //
export const handleGoogleLogIn = googleloginData => async dispatch => {
  dispatch({ type: isLoadingString, payload: { loader: true } });
  const response = await apiRequest(
    EndPoints.googleLogin,
    'POST',
    googleloginData,
  );
  if (response && response.success) {
    AsyncStorage.setItem('userToken', response.token);
    AsyncStorage.setItem('user', JSON.stringify(response));
    dispatch({ type: loginString, payload: { user: response } });
  }
  dispatch({ type: isLoadingString, payload: { loader: false } });
  //return response ? response : false;
};

// ----------------Register User--------------------- //
export const registerUser = (signUpData) => async dispatch => {

  dispatch({ type: isLoadingString, payload: { loader: true } });
  const response = await apiRequest(EndPoints.signUp, 'POST', signUpData);
  if (response && response.success) {
    AsyncStorage.setItem('userToken', response.token);
    AsyncStorage.setItem('user', JSON.stringify(response.data));
    console.log('RESPONSE', AsyncStorage.getItem('userToken'));
    dispatch({ type: loginString, payload: response.data });
  }
  dispatch({ type: isLoadingString, payload: { loader: false } });
};

// ----------------Register Patient--------------------- //
export const registerPatient = (patientData, navigator) => async dispatch => {
  console.log('navigator', navigator);
  dispatch({ type: isLoadingString, payload: { loader: true } });
  const response = await apiRequest(EndPoints.addPatient, 'POST', patientData);

  dispatch({ type: isLoadingString, payload: { loader: false } });
  dispatch({ type: registerPatientString, payload: response.data });
  return response && response.success ? response : false;

};

// ------------------ getAllPatients EndPoint  ----------------------- //
export const getAllPatientsOfAUser = (userId) => async dispatch => {
  dispatch({ type: isLoadingString, payload: { loader: true } });
  let response = await apiRequest(`users/${userId}/patients`, 'GET');
  if (response && response.success) {
    dispatch({ type: isLoadingString, payload: { loader: true } });
    dispatch({ type: getAllPatientsOfAUserString, payload: response.patients });
  }
  dispatch({ type: isLoadingString, payload: { loader: false } });
  return response ? response : false;
};

// ------------------ get info of a patient EndPoint  ----------------------- //
export const getAPatientsInfo = (patientId) => async dispatch => {
  console.log("PATIENT ID", patientId);
  dispatch({ type: isLoadingString, payload: { loader: true } });
  let response = await apiRequest(EndPoints.getAPatientsInfo + `/${patientId}`, 'GET');
  console.log("RESPONSER 90123809128029183 ", response);
  if (response && response.success) {
    dispatch({ type: isLoadingString, payload: { loader: true } });
    dispatch({ type: getAPatientsInfoString, payload: response.data });
  }
  dispatch({ type: isLoadingString, payload: { loader: false } });
  return response ? response : false;
};

// ----------------Otp password API--------------------- //
export const sendForgotPasswordOTPEmail = data => async dispatch => {
  dispatch({ type: isLoadingString, payload: { loader: true } });
  const response = await apiRequest(
    EndPoints.sendForgotPasswordOTPEmail,
    'POST',
    data,
  );
  dispatch({ type: isLoadingString, payload: { loader: false } });
  return response && response.success ? response : false;
};

// -------------- Update User's Profile ---------------//
export const updateProfile = data => async dispatch => {
  dispatch({ type: isLoadingString, payload: { loader: true } });
  const response = await apiRequest(EndPoints.updateProfile, 'POST', data);
  if (response && response.success) {
    // 
    dispatch({ type: updateProfileString, payload: response });
    dispatch({ type: updateAuthUserString, payload: response.data });
  }
  dispatch({ type: isLoadingString, payload: { loader: false } });
  return response && response.success ? response : false;
};

// ----------------Verify OTP--------------------- //
export const verifyForgotPasswordOTP = payload => async dispatch => {
  dispatch({ type: isLoadingString, payload: { loader: true } });
  const response = await apiRequest(EndPoints.verifyOtp, 'POST', payload);
  dispatch({ type: isLoadingString, payload: { loader: false } });
  return response && response.success ? response : false;
};

// ----------------Update User Password--------------------- //
export const updatePassword = payload => async dispatch => {
  dispatch({ type: isLoadingString, payload: { loader: true } });
  const response = await apiRequest(EndPoints.updatePassword, 'POST', payload);
  dispatch({ type: isLoadingString, payload: { loader: false } });
  return response && response.success ? response : false;
};

// -------------Logout User----------------- //
export const logoutUser = logOutData => async dispatch => {

  dispatch({ type: isLoadingString, payload: { loader: true } });
  dispatch({ type: logOutString, payload: {} });
  dispatch({ type: isLoadingString, payload: { loader: false } });
  return true;
};
