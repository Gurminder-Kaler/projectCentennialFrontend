import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import RequiredSign from '../../utils/RequiredSign';
import RNPickerSelect from 'react-native-picker-select';
import { registerUser } from '../../actions/authAction';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .min(4, 'More than 3 characters only!')
    .required('First Name is required!'),
  lastName: Yup.string()
    .trim()
    .min(3, 'Invalid last name!')
    .required('Last Name is required!'),
  email: Yup.string().email('Invalid email!').required('Email is required!'),
  gender: Yup.string().required('Gender is required!'),
  password: Yup.string()
    .trim()
    .min(8, 'Password is too short!')
    .required('Password is required!'),
  confirmPassword: Yup.string()
    .trim()
    .required('Confirm password is required!')
    .equals([Yup.ref('password'), null], 'Passwords do not match eachother!'),
});

export const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const formObject = {
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    role: '',
    password: '',
  };

  let performRegister = async values => {
    let payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      gender: values.gender,
      email: values.email,
      password: values.password,
      role: values.role
    };
    console.log('Payload being sent', payload);
    await dispatch(registerUser(payload));
  };

  return (
    <ScrollView contentContainerStyle={styles.body}>
      <Formik
        initialValues={formObject}
        validationSchema={validationSchema}
        onSubmit={(values, formikActions) => {
          performRegister(values);
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => {
          return (
            <>
              <View style={styles.inputBox}>
                <Text style={styles.label}>
                  Enter your first name
                  <RequiredSign />
                </Text>
                <TextInput
                  keyboardType="default"
                  style={styles.input}
                  onBlur={handleBlur('firstName')}
                  onChangeText={handleChange('firstName')}
                  placeholder={'Enter your first name'}
                />
                {touched.firstName && errors.firstName ? (
                  <Text style={styles.error}>{errors.firstName}</Text>
                ) : (
                  ''
                )}
              </View>

              <View style={styles.inputBox}>
                <Text style={styles.label}>
                  Enter your last name
                  <RequiredSign />
                </Text>
                <TextInput
                  keyboardType="default"
                  style={styles.input}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  placeholder={'Enter your last name'}
                />
                {touched.lastName && errors.lastName ? (
                  <Text style={styles.error}>{errors.lastName}</Text>
                ) : (
                  ''
                )}
              </View>

              <View style={styles.inputBox}>
                <Text style={styles.label}>
                  Select your gender
                  <RequiredSign />
                </Text>
                <RNPickerSelect
                  style={styles.input}
                  onValueChange={value => {
                    console.log('value RNPickerSelect', value);
                    if (value !== null) {
                      setFieldValue('gender', value);
                      console.log('INNER INNDER qweqwewq');
                    }
                  }}
                  items={[
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' },
                    { label: 'Other', value: 'other' },
                  ]}
                />
                {touched.gender && errors.gender ? (
                  <Text style={styles.error}>{errors.gender}</Text>
                ) : (
                  ''
                )}
              </View>


              <View style={styles.inputBox}>
                <Text style={styles.label}>
                  Select your role
                  <RequiredSign />
                </Text>
                <RNPickerSelect
                  style={styles.input}
                  onValueChange={value => {
                    console.log('value RNPickerSelect', value);
                    if (value !== null) {
                      setFieldValue('role', value);
                      console.log('INNER INNDER qweqwewq');
                    }
                  }}
                  items={[
                    { label: 'Nurse', value: 'NURSE' },
                    { label: 'Doctor', value: 'DOCTOR' }
                  ]}
                />
                {touched.role && errors.role ? (
                  <Text style={styles.error}>{errors.role}</Text>
                ) : (
                  ''
                )}
              </View>

              <View style={styles.inputBox}>
                <Text style={styles.label}>
                  Enter your email
                  <RequiredSign />
                </Text>
                <TextInput
                  keyboardType="default"
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  placeholder={'Enter your email'}
                  onBlur={handleBlur('email')}
                  autoCapitalize="none"
                />

                {touched.email && errors.email ? (
                  <Text style={styles.error}>{errors.email}</Text>
                ) : (
                  ''
                )}
              </View>

              <View style={styles.inputBox}>
                <Text style={styles.label}>
                  Create your password
                  <RequiredSign />
                </Text>
                <TextInput
                  keyboardType="default"
                  style={styles.input}
                  autoCapitalize="none"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder={'Create your password'}
                  secureTextEntry={true}
                />
                {touched.password && errors.password ? (
                  <Text style={styles.error}>{errors.password}</Text>
                ) : (
                  ''
                )}
              </View>

              <View style={styles.inputBox}>
                <Text style={styles.label}>
                  Confirm your password
                  <RequiredSign />
                </Text>
                <TextInput
                  keyboardType="default"
                  style={styles.input}
                  autoCapitalize="none"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  placeholder={'Confirm your password'}
                  secureTextEntry={true}
                />
                {touched.confirmPassword && errors.confirmPassword ? (
                  <Text style={styles.error}>{errors.confirmPassword}</Text>
                ) : (
                  ''
                )}
              </View>

              <View style={[styles.button, styles.shadowSm]}>
                <TouchableOpacity
                  onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
              </View>
            </>
          );
        }}
      </Formik>

      <View style={styles.extraInputBox}>
        <TouchableOpacity onPress={() => navigation.navigate('loginScreen')}>
          <Text style={styles.bottomText}>Already a member? Login now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#2a2a2a02',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 16,
    backgroundColor: 'white',
  },
  imageView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    backgroundColor: 'teal',
    height: 150,
    width: 150,
  },
  brandView: {
    padding: 2,
  },
  brandText: {
    fontSize: 48,
    textAlign: 'center',
    letterSpacing: 4,
    color: '#008B8B',
  },
  welcomeView: {
    margin: 4,
    padding: 4,
  },
  welcomeText: {
    color: '#7F8487',
    textAlign: 'center',
  },
  inputBox: {
    margin: 5,
    padding: 10,
  },
  extraInputBox: {
    margin: 35,
  },
  error: {
    color: 'tomato',
    fontSize: 14,
    padding: 5,
    marginTop: 4,
  },
  input: {
    textAlign: 'left',
    fontSize: 20,
    borderRadius: 2,
    padding: 10,
    color: '#413F42',
    borderColor: '#413F42',
    borderWidth: 0.5,
  },
  button: {
    marginHorizontal: 15,
    padding: 15,
    backgroundColor: '#008B8B',
    borderRadius: 2,
    marginVertical: 10,
  },
  shadowSm: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 16,
    letterSpacing: 0.5,
    fontWeight: '500',
  },
  bottomText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#7F8487',
  },
  signUp: {
    fontWeight: '700',
    color: '#008B8B',
    marginLeft: 4,
  },
  signUpView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'tomato',
  },
});

export default RegisterScreen;
