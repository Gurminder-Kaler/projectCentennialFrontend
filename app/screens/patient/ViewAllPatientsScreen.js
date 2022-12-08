import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    View,
    TouchableOpacity,
} from 'react-native';
import { getAllPatientsOfAUser } from '../../actions/authAction';
import filter from 'lodash.filter';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';

export const ViewAllPatientsScreen = ({ navigation }) => {
    const dispatch = useDispatch();


    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getAllPatientsOfAUser(user.id));
    }, []);

    const { allPatients } = useSelector(state => state.auth);
    
    const [searchTerm, setSearchTerm] = useState('');

    const [allPatientsList, setAllPatientsList] = useState(allPatients);

    console.log('allPatients', allPatients);

    useEffect(() => {
        setAllPatientsList(allPatients);
    }, [])

    console.log('allPatientsList', allPatientsList);

    const contains = (patient, query) => {
        const { firstName, lastName } = patient;
        console.log('firstName', firstName);
        console.log('lastName', lastName);

        if (firstName.includes(query) || lastName.includes(query)) {
            return true;
        }

        return false;
    };
    const handleSearch = text => {
        const filteredData = filter(allPatients, patient => {
            console.log('aptient ;line 40', patient);
            return contains(patient, text);
        });

        if (text == '') {
            console.log('50', allPatients);
            setAllPatientsList(allPatients);
        } else {
            console.log('53', allPatients);
            setAllPatientsList(filteredData);
        }

        setSearchTerm(text);
    };

    console.log('patients 123123 123', allPatients);
    const renderSearchBar = () => (
        <View
            style={styles.searchBar}>
            <TextInput
                clearButtonMode='always'
                keyboardType="default"
                autoCorrect={false}
                value={searchTerm}
                style={styles.input}
                onChangeText={text => handleSearch(text)}
                placeholder={'Search...'}
            />
        </View>
    )

    return (
        <View style={styles.body}>
            {allPatients && allPatients.length > 0 ?
                <FlatList
                    contentContainerStyle={styles.item}
                    ListHeaderComponent={renderSearchBar}
                    data={allPatientsList}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.push('viewAPatientScreen', { patientId: item._id });
                            }}>
                            <Text style={styles.item}>{item ? item.lastName : ''}&nbsp;{item ? item.firstName : ''}</Text>
                        </TouchableOpacity>
                    )}
                />
                : <Text style={styles.item}>No Patients Found</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    searchBar: {
        padding: 5,
        backgroundColor: 'white'
    },
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
    label: {
        color: '#fff',
    },
    error: {
        color: 'tomato',
        fontSize: 14,
        padding: 5,
        marginTop: 4,
    },
    input: {
        fontSize: 20,
        padding: 5,
        color: '#000',
    },
});
export default ViewAllPatientsScreen;
