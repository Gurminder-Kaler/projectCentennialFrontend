import React, { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    View,
    TouchableOpacity,
} from 'react-native';
import { getAllTestsOfAPatient } from '../../actions/authAction';

import { useSelector, useDispatch } from 'react-redux';

export const ViewAllTestResultsScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.auth); 
    useEffect(() => {
        dispatch(getAllTestsOfAPatient(user.id));
    }, []);
    const {allPatients} = useSelector(state => state.auth);
    
    console.log('patients 123123 123', allPatients);
    return (
        <View style={styles.body}>
            {allPatients && allPatients.length > 0  ?
            <FlatList
                contentContainerStyle={styles.item}
                data={allPatients}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.push('viewAPatientScreen', { patientId: item._id });
                        }}>
                        <Text style={styles.item}>{item.lastName}&nbsp;{item.firstName}</Text>
                    </TouchableOpacity>
                )}
            />
            : <Text style={styles.item}>No Patients Found</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#2a2a2a02',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        padding: 25,
    },
    item: {
        margin: 5,
        autoCapitalize: true,
        backgroundColor: '#00000012',
        padding: 12,
    },
    bottomText: {
        fontSize: 18,
        textAlign: 'center',
    },
});
export default ViewAllTestResultsScreen;
