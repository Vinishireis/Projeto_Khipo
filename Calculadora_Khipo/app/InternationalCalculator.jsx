import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

// URL da API de câmbio
const API_URL = Constants?.manifest?.extra?.API_URL || 'https://api.exchangerate-api.com/v4/latest/USD';

const InternationalCalculator = () => {
    const [consultantValue, setConsultantValue] = useState('');
    const [clientBilling, setClientBilling] = useState('');
    const [hourQuantity, setHourQuantity] = useState('');
    const [hourRate, setHourRate] = useState('');
    const [monthlyRate, setMonthlyRate] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [exchangeRates, setExchangeRates] = useState({});
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [countryData, setCountryData] = useState([]);
    const navigation = useNavigation();

    // Busca as taxas de câmbio
    const fetchExchangeRates = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setExchangeRates(response.data.rates);
        } catch (error) {
            console.error('Erro ao obter taxas de câmbio:', error);
        } finally {
            setLoading(false);
        }
    };

    // Busca os dados dos países
    const fetchCountryData = async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const data = await response.json();
            setCountryData(data);
        } catch (error) {
            console.error('Erro ao obter dados dos países:', error);
        }
    };

    // Obtém a bandeira correspondente à moeda
    const getFlagForCurrency = (currencyCode) => {
        const country = countryData.find((country) =>
            country.currencies && country.currencies[currencyCode]
        );
        return country ? country.flags.png : null;
    };

    // Filtra as moedas com base no termo de pesquisa
    const filteredCurrencies = Object.keys(exchangeRates)
        .filter((currencyCode) =>
            currencyCode.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort(); // Ordena as moedas alfabeticamente

    useEffect(() => {
        fetchExchangeRates();
        fetchCountryData();
    }, []);

    const calcular = () => {
        try {
            if (!exchangeRates[selectedCurrency]) {
                console.log('Taxa de câmbio não disponível');
                return;
            }

            const exchangeRate = exchangeRates[selectedCurrency];

            // Garantindo que valores vazios sejam tratados como 0
            const hourQuantityNum = parseFloat(hourQuantity) || 0;
            const hourRateNum = parseFloat(hourRate) || 0;
            const monthlyRateNum = parseFloat(monthlyRate) || 0;

            // Cálculos
            const faturacaoMensal = hourQuantityNum * hourRateNum;
            const faturacaoConvertido = faturacaoMensal / exchangeRate;
            const margemLucro = faturacaoConvertido - (monthlyRateNum / exchangeRate);

            // Resultado formatado
            const resultado = {
                valorLiquido: faturacaoConvertido.toFixed(2),
                comissao: 0,
                mop: (monthlyRateNum / exchangeRate).toFixed(2),
                mlk: margemLucro.toFixed(2),
                moeda: selectedCurrency
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
                    placeholder={`Valor (${selectedCurrency})`}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Faturação Cliente</Text>
                <TextInput
                    style={styles.input}
                    value={clientBilling}
                    onChangeText={setClientBilling}
                    keyboardType="numeric"
                    placeholder={`Valor (${selectedCurrency})`}
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
                <Text style={styles.label}>Taxa por Hora</Text>
                <TextInput
                    style={styles.input}
                    value={hourRate}
                    onChangeText={setHourRate}
                    keyboardType="numeric"
                    placeholder={`Valor (${selectedCurrency})`}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Custo Mensal</Text>
                <TextInput
                    style={styles.input}
                    value={monthlyRate}
                    onChangeText={setMonthlyRate}
                    keyboardType="numeric"
                    placeholder={`Valor (${selectedCurrency})`}
                />
            </View>

            {/* Botão para abrir o modal de seleção de moedas */}
            <TouchableOpacity style={styles.button} onPress={() => setShowModal(true)}>
                <Text style={styles.buttonText}>Selecionar Moeda</Text>
            </TouchableOpacity>

            {/* Modal de seleção de moedas */}
            <Modal visible={showModal} animationType="slide" transparent={true}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Escolha a Moeda</Text>

                        {/* Barra de pesquisa */}
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Pesquisar moeda..."
                            value={searchTerm}
                            onChangeText={setSearchTerm}
                            placeholderTextColor="#888"
                        />

                        {/* Lista de moedas filtradas */}
                        <FlatList
                            data={filteredCurrencies}
                            renderItem={({ item }) => {
                                const flagUrl = getFlagForCurrency(item);
                                return (
                                    <TouchableOpacity
                                        style={styles.modalItem}
                                        onPress={() => {
                                            setSelectedCurrency(item);
                                            setShowModal(false);
                                        }}
                                    >
                                        {flagUrl && <Image source={{ uri: flagUrl }} style={styles.flag} />}
                                        <Text style={styles.modalItemText}>{item}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                            keyExtractor={(item) => item}
                        />

                        {/* Botão para fechar o modal */}
                        <TouchableOpacity
                            style={styles.closeModalButton}
                            onPress={() => setShowModal(false)}
                        >
                            <Text style={styles.buttonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

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
        marginTop: 20,
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
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: 300,
        maxHeight: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#6A0DAD',
        marginBottom: 15,
        textAlign: 'center',
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        color: '#333',
    },
    modalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalItemText: {
        fontSize: 18,
        color: '#333',
        marginLeft: 10,
    },
    flag: {
        width: 24,
        height: 16,
        marginRight: 10,
    },
    closeModalButton: {
        backgroundColor: '#6A0DAD',
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20,
    },
});

export default InternationalCalculator;