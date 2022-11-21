import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { getAPatientsInfo } from '../../actions/authAction';
import { useDispatch, useSelector } from 'react-redux';

export const ViewAPatientScreen = ({ navigation, route }) => {

  const dispatch = useDispatch();
  [showAddress, setShowAddress] = useState(false);
  useEffect(() => {
    dispatch(getAPatientsInfo(route.params.patientId));
  }, []);

  // const state = useSelector((state) => console.log("PAORTALDJ LS jasdlaskajhjkahsdkjah state", state));

  const { patient } = useSelector(state => state.auth);
  return (
    <ScrollView contentContainerStyle={styles.body}>
      <View style={styles.body}>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Email:  <Text style={styles.boldText}>{patient ? patient.email : ''}</ Text></Text>
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>First name:  <Text style={styles.boldText}>{patient ? patient.firstName : ''}</ Text></Text>
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Last name:  <Text style={styles.boldText}>{patient ? patient.lastName : ''}</ Text></Text>
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Blood Group:  <Text style={styles.boldText}>{patient ? patient.bloodGroup : ''}</ Text></Text>
        </View>
        {showAddress ? (
          <View>
            <View style={styles.inputBox}>
              <Text style={styles.label}>Address:  <Text style={styles.boldText}>{patient ? patient.address : ''}</ Text></Text>
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.label}>City:  <Text style={styles.boldText}>{patient ? patient.city : ''}</ Text></Text>
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.label}>Postal Code:  <Text style={styles.boldText}>{patient ? patient.postalCode : ''}</ Text></Text>
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.label}>Province:  <Text style={styles.boldText}>{patient ? patient.province : ''}</ Text></Text>
            </View>
            <View style={styles.buttonBox}>
              <TouchableOpacity
                onPress={() => setShowAddress(false)} style={{ alignContent: 'center' }}>
                <Text style={styles.buttonAddress}>Hide address</Text>
              </TouchableOpacity>
            </View>
          </View>) :
          <View style={styles.buttonBox}>
            <TouchableOpacity
              onPress={() => setShowAddress(true)}>
              <Text style={styles.buttonAddress}>View address</Text>
            </TouchableOpacity>
          </View>}

        <View style={styles.inputBox}>
          <TouchableOpacity
            onPress={() => navigation.navigate('viewAllTestResultsScreen', { patientId: route.params.patientId })}>
            <Text style={styles.buttonT}>View patient's test results</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputBox}>
          <TouchableOpacity
            onPress={() => navigation.navigate('addATestResultScreen', { patientId: route.params.patientId })}>
            <Text style={styles.button}>Add a test result</Text>
          </TouchableOpacity>
        </View>

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
  },
  required: {
    color: 'red',
  },
  label: {
    fontSize: 19,
  },
  inputBox: {
    margin: 5,
    backgroundColor: '#00000012',
    padding: 12,
  },
  buttonBox: {
    margin: 5,
    backgroundColor: '#00000012',
    padding: 12,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: 15,
  },
  disabledInput: {
    borderColor: '#00000022',
    borderWidth: 1,
    color: '#00000062',
    textAlign: 'left',
    fontSize: 23,
    borderRadius: 5,
    padding: 5,
    margin: 5,
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
    padding: 10,
    fontSize: 24,
    backgroundColor: 'green',
    color: 'white',
    textAlign: 'center',
  },
  buttonT: {
    padding: 10,
    fontSize: 24,
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
  },
  buttonAddress: {
    padding: 10,
    marginLeft: "15%",
    fontSize: 19,
    width: 200,
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 24
  }
});
export default ViewAPatientScreen;
