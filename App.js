/**
 * Project React Native by Himanshu and Gurminder(301294300)
 * 
 */
import React, { useEffect } from 'react';
import isEmpty from './app/validations/isEmpty';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './app/screens/WelcomeScreen';
import ProfileScreen from './app/screens/profile/ProfileScreen';
import UpdatePasswordScreen from './app/screens/password/UpdatePasswordScreen';
import ForgotPasswordScreen from './app/screens/password/ForgotPasswordScreen';
import VerifyForgotPasswordOtpScreen from './app/screens/password/VerifyForgotPasswordOtpScreen';
import LoginScreen from './app/screens/auth/LoginScreen';
import RegisterScreen from './app/screens/auth/RegisterScreen';
import AddAPatientScreen from './app/screens/patient/AddAPatientScreen';
import ViewAllPatientsScreen from './app/screens/patient/ViewAllPatientsScreen';
import ViewAPatientScreen from './app/screens/patient/ViewAPatientScreen';
import HomeScreen from './app/screens/HomeScreen';
import ViewAllTestResultsScreen from './app/screens/test/ViewAllTestResultsScreen';
import AddATestResultScreen from './app/screens/test/AddATestResultScreen';
// import PracticeScreen from './app/screens/practiceScreen';

const App = () => {
  let auth = useSelector(state => state.auth);
  let Stack = createNativeStackNavigator();
  let isLoggedIn = isEmpty(auth) ? false : true;

  let helper = {
    "loginScreen": {
      "loggedInTitle": "Home",
      "loggedOutTitle": "Login"
    },
    "homeScreen": {
      "loggedInTitle": "Home",
      "loggedOutTitle": "Login"
    },

  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="loginScreen"
          options={isLoggedIn ? { title: helper.loginScreen.loggedInTitle } : { title: helper.loginScreen.loggedOutTitle }}
          component={isLoggedIn ? HomeScreen : LoginScreen}
        />
        <Stack.Screen
          name="homeScreen"
          options={isLoggedIn ? { title: helper.loginScreen.loggedInTitle } : { title: helper.loginScreen.loggedOutTitle }}
          component={isLoggedIn ? HomeScreen : LoginScreen}
        />
        <Stack.Screen
          name="registerScreen"
          options={isLoggedIn ? { title: 'Home' } : { title: 'Register' }}
          component={isLoggedIn ? HomeScreen : RegisterScreen}
        />
        <Stack.Screen
          name="forgotPasswordScreen"
          options={isLoggedIn ? { title: helper.loginScreen.loggedInTitle } : { title: 'Forgot Password' }}
          component={isLoggedIn ? HomeScreen : ForgotPasswordScreen}
        />
        <Stack.Screen
          name="verifyForgotPasswordOtpScreen"
          options={isLoggedIn ? { title: 'Home' } : { title: 'Verify OTP' }}
          component={isLoggedIn ? HomeScreen : VerifyForgotPasswordOtpScreen}
        />
        <Stack.Screen
          name="updatePasswordScreen"
          options={{ title: 'Update Password' }}
          component={UpdatePasswordScreen}
        />
        <Stack.Screen
          name="welcomeScreen"
          options={isLoggedIn ? { title: 'Welcome' } : { title: 'Login' }}
          component={isLoggedIn ? WelcomeScreen : LoginScreen}
        />
        <Stack.Screen
          name="profileScreen"
          options={isLoggedIn ? { title: 'My Profile' } : { title: 'Login' }}
          component={isLoggedIn ? ProfileScreen : LoginScreen}
        />

        <Stack.Screen
          name="addPatientScreen"
          options={isLoggedIn ? { title: 'Add Patient' } : { title: 'Login' }}
          component={isLoggedIn ? AddAPatientScreen : LoginScreen}
        />
        <Stack.Screen
          name="viewAllPatients"
          options={isLoggedIn ? { title: 'Your all patients' } : { title: 'Login' }}
          component={isLoggedIn ? ViewAllPatientsScreen : LoginScreen}
        />
        <Stack.Screen
          name="viewAPatientScreen"
          options={isLoggedIn ? { title: 'Patient\'s information' } : { title: 'Login' }}
          component={isLoggedIn ? ViewAPatientScreen : LoginScreen}
        />
        <Stack.Screen
          name="viewAllTestResultsScreen"
          options={isLoggedIn ? { title: 'Patient\'s All tests' } : { title: 'Login' }}
          component={isLoggedIn ? ViewAllTestResultsScreen : LoginScreen}
        />
        <Stack.Screen
          name="addATestResultScreen"
          options={isLoggedIn ? { title: 'Add a test result' } : { title: 'Login' }}
          component={isLoggedIn ? AddATestResultScreen : LoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
