import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableHighlight, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

export default function({moneda, cripto, setCripto, setMoneda, setConsultarApi}) {

    const [ criptomonedas, setCriptomonedas ] = useState([]);

    useEffect(() => {

        const consultarApi = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const resultado = await axios.get(url);
            setCriptomonedas(resultado.data.Data);
        };

        consultarApi();

    }, []);

    const obtenerMoneda = moneda => {
        setMoneda(moneda);
    };

    const obtenerCripto = cripto => {
        setCripto(cripto);
    };

    const cotizarPrecio = () => {
        if(moneda.trim() === '' || cripto.trim() === '') {
            mostrarAlerta();
            return;
        }

        setConsultarApi(true);

    };

    const mostrarAlerta = () => {
        Alert.alert('Error', 'Los dos campos deben de estar seleccionados.', [
            {
                text: 'Ok',
            }
        ])
    }

    return (
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker selectedValue={moneda} onValueChange={moneda => obtenerMoneda(moneda)}>
                <Picker.Item label="- Seleccione -" value=''/>
                <Picker.Item label="Dolar de Estados Unidos" value='USD'/>
                <Picker.Item label="Peso Mexicano" value='MXN'/>
                <Picker.Item label="Euro" value='EUR'/>
                <Picker.Item label="Libra Esterlina" value='GBP'/>
            </Picker>

            <Text style={styles.label}>Criptomonedas</Text>
            <Picker selectedValue={cripto} onValueChange={cripto => obtenerCripto(cripto)}>
                <Picker.Item label="- Seleccione -" value=''/>
                    { criptomonedas.map( cripto => (
                        <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
                    ))}
            </Picker>
            
            <TouchableHighlight style={styles.btnCotizar}
                onPress={cotizarPrecio}
            >
                <Text style={styles.textCotizar}>Cotizar</Text>
            </TouchableHighlight>

        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 22,
        marginVertical: 20,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    btnCotizar: {
        backgroundColor: '#5e40e2',
        padding: 10,
        marginTop: 20,
    },
    textCotizar: {
        color: '#fff',
        fontSize: 18,
        textTransform: 'uppercase',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
