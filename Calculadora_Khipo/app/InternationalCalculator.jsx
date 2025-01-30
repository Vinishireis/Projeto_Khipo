import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants'; // Importando Constants para acessar as variáveis do manifesto
import { Picker } from '@react-native-picker/picker';
import axios from 'axios'; // Importando o axios para requisições HTTP

// Aqui, você obtém a variável API_URL do manifesto
const API_URL = Constants?.manifest?.extra?.API_URL || 'https://api.exchangerate-api.com/v4/latest/USD'; // URL da API de câmbio
console.log(API_URL); // Verifique no console se a URL está sendo lida corretamente

const InternationalCalculator = () => {
    const [consultantValue, setConsultantValue] = useState('');
    const [clientBilling, setClientBilling] = useState('');
    const [hourQuantity, setHourQuantity] = useState('');
    const [hourRate, setHourRate] = useState('');
    const [monthlyRate, setMonthlyRate] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('USD');  // Valor padrão de moeda
    const [exchangeRates, setExchangeRates] = useState({});  // Para armazenar as taxas de câmbio
    const navigation = useNavigation();

    // Função para obter as taxas de câmbio da API
    const fetchExchangeRates = async () => {
        try {
            const response = await axios.get(API_URL);
            setExchangeRates(response.data.rates); // Armazenando as taxas de câmbio
        } catch (error) {
            console.error('Erro ao obter as taxas de câmbio:', error);
        }
    };

    // Chama a função de obter taxas de câmbio assim que o componente for montado
    React.useEffect(() => {
        fetchExchangeRates();
    }, []);

    const calcular = async () => {
        try {
            // Verifica se há taxas de câmbio disponíveis
            if (!exchangeRates[selectedCurrency]) {
                console.log('Taxa de câmbio não disponível');
                return;
            }

            // Obtenha a taxa de câmbio selecionada
            const exchangeRate = exchangeRates[selectedCurrency];

            // Cálculos
            const faturacaoMensal = parseFloat(hourQuantity) * parseFloat(hourRate);
            const faturacaoMensalEmMoedaDestino = faturacaoMensal * exchangeRate;
            const margemLucro = faturacaoMensalEmMoedaDestino - (parseFloat(monthlyRate) * exchangeRate);

            // Criação do resultado
            const resultado = {
                valorLiquido: faturacaoMensalEmMoedaDestino,
                comissao: 0,  // Ajuste conforme necessário
                mop: parseFloat(monthlyRate) * exchangeRate,
                mlk: margemLucro
            };

            navigation.navigate('Resultado', { resultado });
        } catch (error) {
            console.error('Erro ao calcular:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Calculadora Internacional</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Valor Consultor</Text>
                <TextInput
                    style={styles.input}
                    value={consultantValue}
                    onChangeText={setConsultantValue}
                    keyboardType="numeric"
                    placeholder="R$"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Faturação Cliente</Text>
                <TextInput
                    style={styles.input}
                    value={clientBilling}
                    onChangeText={setClientBilling}
                    keyboardType="numeric"
                    placeholder="R$"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Quantidade Hora</Text>
                <TextInput
                    style={styles.input}
                    value={hourQuantity}
                    onChangeText={setHourQuantity}
                    keyboardType="numeric"
                    placeholder="Horas"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>R$ / Hora</Text>
                <TextInput
                    style={styles.input}
                    value={hourRate}
                    onChangeText={setHourRate}
                    keyboardType="numeric"
                    placeholder="R$"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>R$ / Mês</Text>
                <TextInput
                    style={styles.input}
                    value={monthlyRate}
                    onChangeText={setMonthlyRate}
                    keyboardType="numeric"
                    placeholder="R$"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Selecione a Moeda</Text>
                <Picker
                    selectedValue={selectedCurrency}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedCurrency(itemValue)}  // Altera a moeda selecionada
                >
                    {Object.keys(exchangeRates).map((currency) => (
                        <Picker.Item key={currency} label={currency} value={currency} />
                    ))}
                </Picker>
            </View>

            <TouchableOpacity style={styles.button} onPress={calcular}>
                <Text style={styles.buttonText}>SIMULAR</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
        marginTop: 20

    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#555',
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        backgroundColor: '#6A0DAD',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    picker: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
});

export default InternationalCalculator;
