import apiRequest from '../network/api';
import {
  getAllTestsOfAPatientString,
} from '../constants/actionStrings';
import EndPoints from '../constants/endPoints';

// ------------------ getAllTestsOfAPatient EndPoints  ----------------------- //
export const getAllTestsOfAPatient = () => async dispatch => {
  dispatch({ type: isLoadingString, payload: { loader: true } });
  let response = await apiRequest(EndPoints.getAllTestsOfAPatient+`/${patientId}`, 'GET');
  // console.log('RESPONES quiz action 1 ', response.data);
  if (response && response.success) {
    dispatch({ type: isLoadingString, payload: { loader: true } });
    dispatch({ type: getAllTestsOfAPatientString, payload: response.data });
  }
  dispatch({ type: isLoadingString, payload: { loader: false } });
  return response ? response : false;
}; 