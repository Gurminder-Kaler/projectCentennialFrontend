import apiRequest from '../network/api';
import {
  getAllTestsOfAPatientString,
  isLoadingString,
  addATestResultString,
  getATestResultString
} from '../constants/actionStrings';
import EndPoints from '../constants/endPoints';

// ------------------ getAllTestsOfAPatient EndPoints  ----------------------- //
export const getAllTestsOfAPatient = (patientId) => async dispatch => {
  dispatch({ type: isLoadingString, payload: { loader: true } });
  console.log('PATIENT ID test action file', patientId);
  let response = await apiRequest(EndPoints.getAllTestsOfAPatient + `/${patientId}/tests`, 'GET');
  // console.log('RESPONES quiz action 1 ', response.data);
  if (response && response.success) {
    dispatch({ type: isLoadingString, payload: { loader: true } });
    dispatch({ type: getAllTestsOfAPatientString, payload: response.data });
  }
  dispatch({ type: isLoadingString, payload: { loader: false } });
  return response ? response : false;
};

// ----------------add A Patient--------------------- //
export const addATestResult = (patientData) => async dispatch => {
  // console.log('NAVIGATIOn 8901923012 93021', navigation);
  dispatch({ type: isLoadingString, payload: { loader: true } });
  const response = await apiRequest(EndPoints.addATestResult + `/${patientData.userId}/tests`, 'POST', patientData);
  console.log('response addATestResult ///', response);
  dispatch({ type: addATestResultString, payload: response.data });
  dispatch({ type: isLoadingString, payload: { loader: false } });
  return response && response.success ? response : false;
};

// ----------------add A Patient--------------------- //
export const getATestResult = (patientId, testId) => async dispatch => {
  console.log('NAVIGATIOn 8901923012 93021', patientId, testId);
  dispatch({ type: isLoadingString, payload: { loader: true } });
  const response = await apiRequest(EndPoints.getATestResult + `/${patientId}/tests/${testId}`, 'GET');
  console.log('response getATestResult ///', response);
  dispatch({ type: getATestResultString, payload: response.data });
  dispatch({ type: isLoadingString, payload: { loader: false } });
  return response && response.success ? response : false;
};