import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const zaposleniPodrobnosti = (props) => {
    return (
        <View>
            <Text style={styles.textBiger}>{props.ime} {props.priimek}</Text>
            <Text style={styles.text}>Naziv: {props.naziv}</Text>
            <Text style={styles.text}>Elektronska Posta: {props.elektronska_posta} </Text>
            <Text style={styles.text}>Govorilne Ure: {props.govorilne_ure} </Text>
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
        fontWeight: 'normal',
    },
    textBiger: {
        fontSize: 25,
        color: '#474e5d',
        paddingLeft: 8,
        fontWeight: 'bold',
    }
});

export default zaposleniPodrobnosti;
