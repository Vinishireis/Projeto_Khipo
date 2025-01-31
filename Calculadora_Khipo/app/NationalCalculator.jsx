import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NacionalCalculator = () => {
    const [valorMensal, setValorMensal] = useState(''); // Novo campo: Valor Mensal
    const [valorHora, setValorHora] = useState(''); // Novo campo: Valor Hora
    const [hourQuantity, setHourQuantity] = useState('');
    const [hourRate, setHourRate] = useState('');
    const [monthlyRate, setMonthlyRate] = useState('');
    const navigation = useNavigation();

    const calcular = () => {
        // Conversão dos valores para números
        const mensal = parseFloat(valorMensal) || 0;
        const hora = parseFloat(valorHora) || 0;
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

            {/* Título: Valor Consultor */}
            <Text style={styles.subtitle}>Valor Consultor</Text>

            {/* Campo: Valor Mensal */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Valor Mensal</Text>
                <TextInput
                    style={styles.input}
                    value={valorMensal}
                    onChangeText={setValorMensal}
                    keyboardType="numeric"
                    placeholder="R$"
                />
            </View>

            {/* Campo: Valor Hora */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Valor Hora</Text>
                <TextInput
                    style={styles.input}
                    value={valorHora}
                    onChangeText={setValorHora}
                    keyboardType="numeric"
                    placeholder="R$"
                />
            </View>

            {/* Título: Faturação Cliente */}
            <Text style={styles.subtitle}>Faturação Cliente</Text>

            {/* Campo: Quantidade de Horas */}
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

            {/* Campo: R$ / Hora */}
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

            {/* Campo: R$ / Mês */}
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

            {/* Botão de Simulação */}
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
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        color: '#555',
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
});

export default NacionalCalculator;