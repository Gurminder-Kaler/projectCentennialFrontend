import React from 'react';
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
import { registerPatient } from '../../actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import bloodGroupData from '../../utils/bloodGroup.json';
import provinceData from '../../utils/province.json';
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
  gender: Yup.string().required('Gender is required!')
});

export const AddPatientScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);
  const formObject = {
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    password: '',
    province: '',
    bloodGroup: '',
    role: '',
    createdBy: auth.user.id,
  };
  // const formObject = {
  //   firstName: 'FirstName 2',
  //   lastName: 'lastName 2',
  //   gender: 'male',
  //   email: 'patient2@yopmail.com',
  //   address: 'alskdjas',
  //   city: 'askdjasklj',
  //   postalCode: 'aksljdaskd',
  //   password: '12345678',
  //   province: 'ONTARIO',
  //   bloodGroup: 'A+',
  //   role: 'PATIENT',
  //   createdBy: auth.user.id,
  // };

  let performRegister = async values => {
    let payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      gender: values.gender,
      email: values.email,
      city: values.city,
      postalCode: values.postalCode,
      province: values.province,
      bloodGroup: values.bloodGroup,
      address: values.address,
      password: values.password,
      createdBy: auth.user.id
    };
    await dispatch(registerPatient(payload));
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
                  Enter patient's first name
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
                  Enter patient's last name
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
                  Select patient's gender
                  <RequiredSign />
                </Text>
                <RNPickerSelect
                  style={pickerStyle}
                  onValueChange={value => {
                    if (value !== null) {
                      setFieldValue('gender', value);
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
                  Enter patient's email
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
                  Enter patient's address
                  <RequiredSign />
                </Text>
                <TextInput
                  keyboardType="default"
                  style={styles.input}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  placeholder={'Enter patient\'s address'}
                />
                {touched.address && errors.address ? (
                  <Text style={styles.error}>{errors.address}</Text>
                ) : (
                  ''
                )}
              </View>

              <View style={styles.inputBox}>
                <Text style={styles.label}>
                  Enter patient's city
                  <RequiredSign />
                </Text>
                <TextInput
                  keyboardType="default"
                  style={styles.input}
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                  placeholder={'Enter patient\'s city'}
                />
                {touched.city && errors.city ? (
                  <Text style={styles.error}>{errors.city}</Text>
                ) : (
                  ''
                )}
              </View>

              <View style={styles.inputBox}>
                <Text style={styles.label}>
                  Enter patient's postal code
                  <RequiredSign />
                </Text>
                <TextInput
                  keyboardType="default"
                  style={styles.input}
                  onChangeText={handleChange('postalCode')}
                  onBlur={handleBlur('postalCode')}
                  placeholder={'Enter patient\'s postalCode'}
                />
                {touched.postalCode && errors.postalCode ? (
                  <Text style={styles.error}>{errors.postalCode}</Text>
                ) : (
                  ''
                )}
              </View>

              <View style={styles.inputBox}>
                <Text style={styles.label}>
                  Select patient's province
                  <RequiredSign />
                </Text>
                <RNPickerSelect
                  style={pickerStyle}
                  onValueChange={value => {
                    if (value !== null) {
                      setFieldValue('province', value);
                    }
                  }}
                  items={provinceData}
                />
                {touched.province && errors.province ? (
                  <Text style={styles.error}>{errors.province}</Text>
                ) : (
                  ''
                )}
              </View>

              <View style={styles.inputBox}>
                <Text style={styles.label}>
                  Select patient's blood group
                  <RequiredSign />
                </Text>
                <RNPickerSelect
                  style={pickerStyle}
                  onValueChange={value => {
                    if (value !== null) {
                      setFieldValue('bloodGroup', value);
                    }
                  }}
                  items={bloodGroupData}
                />
                {touched.bloodGroup && errors.bloodGroup ? (
                  <Text style={styles.error}>{errors.bloodGroup}</Text>
                ) : (
                  ''
                )}
              </View>

              <View style={[styles.button, styles.shadowSm]}>
                <TouchableOpacity
                  onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </>
          );
        }}
      </Formik>
    </ScrollView>
  );
};
const pickerStyle = {
  inputIOS: {
    color: 'white',
    paddingHorizontal: 10,
    backgroundColor: '#ff000090',
    borderRadius: 5,
  },
  placeholder: {
    color: 'black',
  },
  inputAndroid: {
    color: 'black',
    paddingHorizontal: 10,
    backgroundColor: '#ff000090',
    borderRadius: 5,
  },
};

const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 16,
  },
  inputBox: {
    margin: 5,
    padding: 10,
  },
  extraInputBox: {
    margin: 35,
  },
  label: {
    color: '#000',
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
    backgroundColor: 'white',
    borderRadius: 2,
    padding: 10,
    color: '#000',
    borderColor: '#00000040',
    borderWidth: 0.5,
  },
  button: {
    marginHorizontal: 15,
    padding: 15,
    backgroundColor: '#ff000090',
    borderRadius: 2,
    marginVertical: 10,
  },
  shadowSm: {
    shadowColor: '#fff',
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
  }
});

export default AddPatientScreen;
