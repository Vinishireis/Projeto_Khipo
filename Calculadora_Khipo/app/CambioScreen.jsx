import React, { useState, useEffect } from 'react';  
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, ActivityIndicator, Modal, FlatList } from 'react-native';
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

    const apiUrl = 'https://v6.exchangerate-api.com/v6/238325331d7d5b87ac5dbbd8/latest/USD';

    const fetchExchangeRates = async () => {
        setLoading(true);
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setRates(data.conversion_rates);
            setFilteredRates(data.conversion_rates); // Set initial rates to show all
        } catch (error) {
            console.error('Erro ao obter dados de câmbio:', error);
        } finally {
            setLoading(false);
        }
    };

    const convertCurrency = () => {
        if (amount && currency && rates[currency]) {
            const result = (parseFloat(amount) * rates[currency]).toFixed(2);
            setConvertedAmount(result);
        }
    };

    const filterRates = (currency) => {
        if (currency === 'ALL') {
            setFilteredRates(rates); // Exibe todas as taxas quando 'ALL' é selecionado
        } else {
            setFilteredRates({ [currency]: rates[currency] }); // Exibe somente a moeda selecionada
        }
        setCurrency(currency); // Atualiza a moeda selecionada na tela
        setShowModal(false); // Fecha o modal após selecionar a moeda
    };
    useEffect(() => {
        fetchExchangeRates();
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
                    placeholder="Moeda (ex: EUR, BRL)"
                    value={currency}
                    onChangeText={setCurrency}
                    placeholderTextColor="#888"
                />
                <Ionicons name="md-globe" size={24} color="#6A0DAD" style={styles.inputIcon} />
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
                {Object.entries(filteredRates).map(([key, value]) => (
                    <Text key={key} style={styles.rateText}>
                        1 USD = {value} {key}
                    </Text>
                ))}
            </ScrollView>

            {/* Modal para seleção de moeda */}
            <Modal visible={showModal} animationType="slide" transparent={true}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Escolha a Moeda</Text>
                        <FlatList
                            data={Object.keys(rates)}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.modalItem}
                                    onPress={() => {
                                        setSelectedCurrency(item);
                                        filterRates(item);
                                    }}
                                >
                                    <Text style={styles.modalItemText}>{item}</Text>
                                </TouchableOpacity>
                            )}
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
        marginTop: 20

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
    rateText: {
        fontSize: 16,
        color: '#333',
        paddingVertical: 5,
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
    modalItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
    },
    modalItemText: {
        fontSize: 18,
        color: '#333',
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
