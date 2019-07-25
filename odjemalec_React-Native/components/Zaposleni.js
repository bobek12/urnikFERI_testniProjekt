import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const zaposleni = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}> {props.ime} {props.priimek}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginTop: 12,
        borderBottomWidth: 0.5,
        paddingBottom: 10
    },
    text: {
        fontSize: 20,
        color: '#474e5d',
        paddingLeft: 8,
        fontWeight: 'bold',
    },
});



export default zaposleni;
