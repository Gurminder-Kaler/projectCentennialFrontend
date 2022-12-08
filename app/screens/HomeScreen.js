import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { logoutUser, getAllPatientsOfAUser } from '../../app/actions/authAction';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import showSnack from '../utils/ShowSnack';



export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getAllPatientsOfAUser(user.id));
  }, []);
  const showAlert = () =>
    Alert.alert(
      "Are You Sure?",
      "You want to Logout",
      [
        {
          text: "Ok",
          onPress: () => { performLogout() },
          style: "default",
        },
        {
          text: "Cancel",
          onPress: () => { return false; },
          style: "destructive",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {
          return false;
        }
      }
    );
  let performLogout = () => {
    AsyncStorage.removeItem('userToken');
    dispatch(logoutUser());
    navigation.navigate('loginScreen');
    showSnack('See you soon!');
  };
  return (
    <>
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.navigate('addPatientScreen')}
            style={styles.blackBox}>
            <Text style={styles.label}>Add Patient</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('viewAllPatients')}
            style={styles.blackBox}>
            <Text style={styles.label}>View Your Patients</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showAlert()}
            style={styles.redBox}>
            <Text style={styles.label}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', flexWrap: 'wrap' },
  blackBox: {
    width: '100%',
    marginTop: 2,
    padding: 2,
    fontSize: 24,
    height: 90,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#000',
  },
  redBox: {
    width: '100%',
    marginTop: 2,
    padding: 2,
    fontSize: 24,
    height: 90,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#f00',
  },
  label: {
    fontSize: 19,
    marginTop: 0,
    color: '#fff'
  },
  score: {
    textAlign: 'center',
    fontSize: 34,
  },
  body: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 16,
  },
  bottomText: {
    fontSize: 24,
    textAlign: 'center',
  }
});
export default HomeScreen;
