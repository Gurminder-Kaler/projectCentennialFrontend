import apiRequest from '../network/api';
import {
  getAllTestsOfAPatientString,
  isLoadingString,
  addATestResultString
} from '../constants/actionStrings';
import EndPoints from '../constants/endPoints';

// ------------------ getAllTestsOfAPatient EndPoints  ----------------------- //
export const getAllTestsOfAPatient = (patientId) => async dispatch => {
  dispatch({ type: isLoadingString, payload: { loader: true } });
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
export const addATestResult = (patientData, navigation) => async dispatch => {
  console.log('NAVIGATIOn 8901923012 93021', navigation);
  dispatch({ type: isLoadingString, payload: { loader: true } });
  const response = await apiRequest(EndPoints.addATestResult + `${patientData.id}/tests`, 'POST', patientData);
  console.log('response', response);
  dispatch({ type: addATestResultString, payload: response.data });
  dispatch({ type: isLoadingString, payload: { loader: false } });
  return response && response.success ? response : false;

};