import React from "react";
import { Text, StyleSheet, Platform } from "react-native";

function Header () {

    return (
        <Text style={styles.titulo}>
            Criptomonedas
        </Text>
    );
}

const styles = StyleSheet.create({
    titulo: {
        paddingTop: 30,
        fontFamily: 'Lato-Black',
        backgroundColor: '#5e49e2',
        paddingBottom: 10,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
});

export default Header;
