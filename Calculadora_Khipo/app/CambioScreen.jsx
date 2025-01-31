import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, ActivityIndicator, Modal, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const CambioScreen = () => {
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [filteredRates, setFilteredRates] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const [countryData, setCountryData] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de pesquisa

    const apiUrl = 'https://v6.exchangerate-api.com/v6/238325331d7d5b87ac5dbbd8/latest/USD';

    // Busca as taxas de câmbio
    const fetchExchangeRates = async () => {
        setLoading(true);
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setRates(data.conversion_rates);
            setFilteredRates(data.conversion_rates);
        } catch (error) {
            console.error('Erro ao obter dados de câmbio:', error);
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

    // Converte a moeda
    const convertCurrency = () => {
        if (amount && currency && rates[currency]) {
            const result = (parseFloat(amount) * rates[currency]).toFixed(2);
            setConvertedAmount(result);
        }
    };

    // Filtra as taxas de câmbio
    const filterRates = (currency) => {
        if (currency === 'ALL') {
            setFilteredRates(rates);
        } else {
            setFilteredRates({ [currency]: rates[currency] });
        }
        setCurrency(currency);
        setShowModal(false);
    };

    // Obtém a bandeira correspondente à moeda
    const getFlagForCurrency = (currencyCode) => {
        const country = countryData.find((country) =>
            country.currencies && country.currencies[currencyCode]
        );
        return country ? country.flags.png : null;
    };

    // Filtra as moedas com base no termo de pesquisa
    const filteredCurrencies = Object.keys(rates)
        .filter((currencyCode) =>
            currencyCode.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort(); // Ordena as moedas alfabeticamente

    useEffect(() => {
        fetchExchangeRates();
        fetchCountryData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Conversor de Câmbio</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o valor"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                    placeholderTextColor="#888"
                />
                <Ionicons name="cash" size={24} color="#6A0DAD" style={styles.inputIcon} />
            </View>

            <Text style={styles.label}>Selecione a moeda</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Moeda (ex: USD, EUR)"
                    value={currency}
                    onChangeText={setCurrency}
                    placeholderTextColor="#888"
                />
                <Ionicons name="globe" size={24} color="#6A0DAD" style={styles.inputIcon} />
            </View>

            <TouchableOpacity style={styles.button} onPress={convertCurrency}>
                <Text style={styles.buttonText}>Converter</Text>
            </TouchableOpacity>

            {loading ? (
                <ActivityIndicator size="large" color="#6A0DAD" />
            ) : (
                convertedAmount !== null && (
                    <View style={styles.resultContainer}>
                        <Text style={styles.resultText}>
                            {amount} USD = {convertedAmount} {currency}
                        </Text>
                    </View>
                )
            )}

            <TouchableOpacity style={styles.filterButton} onPress={() => setShowModal(true)}>
                <Text style={styles.filterButtonText}>Filtrar Moeda</Text>
            </TouchableOpacity>

            <ScrollView style={styles.ratesContainer}>
                <Text style={styles.ratesTitle}>Taxas de Câmbio Atuais</Text>
                {Object.entries(filteredRates).map(([key, value]) => {
                    const flagUrl = getFlagForCurrency(key);
                    return (
                        <View key={key} style={styles.rateItem}>
                            {flagUrl && <Image source={{ uri: flagUrl }} style={styles.flag} />}
                            <Text style={styles.rateText}>
                                1 USD = {value} {key}
                            </Text>
                        </View>
                    );
                })}
            </ScrollView>

            {/* Modal para seleção de moeda */}
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

                        <FlatList
                            data={filteredCurrencies}
                            renderItem={({ item }) => {
                                const flagUrl = getFlagForCurrency(item);
                                return (
                                    <TouchableOpacity
                                        style={styles.modalItem}
                                        onPress={() => {
                                            setSelectedCurrency(item);
                                            filterRates(item);
                                        }}
                                    >
                                        {flagUrl && <Image source={{ uri: flagUrl }} style={styles.flag} />}
                                        <Text style={styles.modalItemText}>{item}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                            keyExtractor={(item) => item}
                        />
                        <TouchableOpacity
                            style={styles.closeModalButton}
                            onPress={() => setShowModal(false)}
                        >
                            <Text style={styles.buttonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#6A0DAD',
        marginTop: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        height: 45,
        fontSize: 18,
        color: '#333',
        paddingHorizontal: 10,
    },
    inputIcon: {
        marginLeft: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        color: '#555',
    },
    button: {
        backgroundColor: '#6A0DAD',
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 20,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resultContainer: {
        paddingVertical: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    resultText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    ratesContainer: {
        marginTop: 20,
    },
    ratesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6A0DAD',
        marginBottom: 10,
    },
    rateItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
    },
    rateText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
    },
    flag: {
        width: 24,
        height: 16,
        marginRight: 10,
    },
    filterButton: {
        backgroundColor: '#6A0DAD',
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 20,
        elevation: 5,
    },
    filterButtonText: {
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
    closeModalButton: {
        backgroundColor: '#6A0DAD',
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20,
    },
});

export default CambioScreen;