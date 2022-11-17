import React, { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    View,
    TouchableOpacity
} from 'react-native';
import { getAllTestsOfAPatient } from '../../actions/testAction';

import { useSelector, useDispatch } from 'react-redux';

export const ViewAllTestResultsScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    // dont touch code below this

    const { patient } = useSelector(state => state.auth);
    useEffect(() => {
        dispatch(getAllTestsOfAPatient(patient._id));
    }, []);
    const { tests } = useSelector(state => state.auth);
    //dont touch code above this.
    console.log('patients 123123 123', tests);
    // local functional fragment isolated to refactor the code.
    function ItemFragment(item) {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.push('viewATestResultScreen', { patientId: item._id });
                }}>
                <Text style={styles.item}>{item.risk}&nbsp;{item.createdAt}</Text>
            </TouchableOpacity>
        );
    }
    function AlternateFragment() {
        return (
            <>
                <Text style={styles.item}>No Tests Found</Text>
                <View style={styles.inputBox}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('addATestResultScreen', { patientId: route.params.patientId })}>
                        <Text style={styles.button}>Add a test result</Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }
    return (
        <View style={styles.body}>
            {tests && tests.length > 0 ?
                <FlatList
                    contentContainerStyle={styles.item}
                    data={tests}
                    renderItem={({ item }) => (
                        item ? <ItemFragment item={item} /> : ''
                    )}
                />
                : (
                    <AlternateFragment />
                )}
            {/* <MyTabs /> */}
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
    button: {
        marginTop: 190,
        padding: 10,
        fontSize: 24,
        backgroundColor: 'grey',
        color: 'white',
        textAlign: 'center',
    },
});


export default ViewAllTestResultsScreen;
