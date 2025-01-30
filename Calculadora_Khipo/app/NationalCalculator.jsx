import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NacionalCalculator = () => {
    const [consultantValue, setConsultantValue] = useState('');
    const [clientBilling, setClientBilling] = useState('');
    const [hourQuantity, setHourQuantity] = useState('');
    const [hourRate, setHourRate] = useState('');
    const [monthlyRate, setMonthlyRate] = useState('');
    const navigation = useNavigation();

    const calcular = () => {
        // Conversão dos valores para números
        const consultant = parseFloat(consultantValue) || 0;
        const billing = parseFloat(clientBilling) || 0;
        const hours = parseFloat(hourQuantity) || 0;
        const ratePerHour = parseFloat(hourRate) || 0;
        const ratePerMonth = parseFloat(monthlyRate) || 0;
    
        // Cálculos
        const faturacaoMensal = hours * ratePerHour;
        const margemLucro = faturacaoMensal - ratePerMonth;
    
        // Resultado
        const resultado = {
            valorLiquido: isNaN(faturacaoMensal) ? 0 : faturacaoMensal,  // Garantindo que o valor não seja NaN
            comissao: 0, // Ajuste conforme necessário
            mop: isNaN(ratePerMonth) ? 0 : ratePerMonth,  // Garantindo que o valor não seja NaN
            mlk: isNaN(margemLucro) ? 0 : margemLucro  // Garantindo que o valor não seja NaN
        };
    
        // Navegação para a tela de resultado
        navigation.navigate('Resultado', { resultado });
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Calculadora Nacional</Text>

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
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default NacionalCalculator;
