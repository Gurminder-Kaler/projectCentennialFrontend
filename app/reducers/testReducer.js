import { addATestResult } from '../actions/testAction';
import { loginString, updateTestUserString, getAllTestsOfAPatientString, getAllPatientsOfAUserString, logOutString, getAPatientsInfoString } from '../constants/testActions';

export default (state = {}, action) => {
  console.log('Test reducer', action);
  switch (action.type) { 
    case updateTestUserString:
      return {
        ...state,
        user: action.payload,
      }; 
    case getAllTestsOfAPatientString:
      return {
        ...state,
        tests: action.payload,
      };
    case addATestResult:
      return {
        ...state,
        tests: {..., action.payload,
      };
    default:
      return state;
  }
};
