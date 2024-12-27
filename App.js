import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, ScrollView, ActivityIndicator } from 'react-native';
import Header from './components/Header';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cotizacion from './components/Cotizacion';

function App(){

  const [ moneda, setMoneda ] = useState('');
  const [ cripto, setCripto ] = useState('');
  const [ consultarApi, setConsultarApi ] = useState(false);
  const [ resultado, setResultado ] = useState({});
  const [ cargando, setCargando ] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if(consultarApi) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
        const resultado = await axios.get(url);

        setCargando(true);

        setTimeout(() => {
          setResultado(resultado.data.DISPLAY[cripto][moneda]);
          setConsultarApi(false);
          setCargando(false);
        }, 2000);
      }
    };

    cotizarCriptomoneda();

 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [consultarApi]);

      const componente = cargando ? <ActivityIndicator size='large'/> : <Cotizacion resultado={resultado}/>

  return (
    <ScrollView>
      <Header />

      <Image style={styles.imagen} source={require('./assets/img/cryptomonedas.png')} />

      <View style={styles.contenido}>
        <Formulario
          moneda={moneda}
          cripto={cripto}
          setMoneda={setMoneda}
          setCripto={setCripto}
          setConsultarApi={setConsultarApi}
        />
      </View>

      <View style={{marginTop: 40}}>
        {componente}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
