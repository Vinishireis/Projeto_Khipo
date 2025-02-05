import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ComparacaoCalculos = () => {
    const navigation = useNavigation();
    const [calculos, setCalculos] = useState([]);
    const [novoCalculo, setNovoCalculo] = useState({ valorLiquido: '', mop: '', mlk: '' });

    const adicionarCalculo = () => {
        if (novoCalculo.valorLiquido && novoCalculo.mop && novoCalculo.mlk) {
            setCalculos([...calculos, { 
                valorLiquido: parseFloat(novoCalculo.valorLiquido),
                mop: parseFloat(novoCalculo.mop),
                mlk: parseFloat(novoCalculo.mlk)
            }]);
            setNovoCalculo({ valorLiquido: '', mop: '', mlk: '' });
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Comparação de Cálculos</Text>
            
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Valor Líquido"
                    keyboardType="numeric"
                    value={novoCalculo.valorLiquido}
                    onChangeText={(text) => setNovoCalculo({ ...novoCalculo, valorLiquido: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="MOP (R$ / Mês)"
                    keyboardType="numeric"
                    value={novoCalculo.mop}
                    onChangeText={(text) => setNovoCalculo({ ...novoCalculo, mop: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Margem de Lucro"
                    keyboardType="numeric"
                    value={novoCalculo.mlk}
                    onChangeText={(text) => setNovoCalculo({ ...novoCalculo, mlk: text })}
                />
                <TouchableOpacity style={styles.button} onPress={adicionarCalculo}>
                    <Text style={styles.buttonText}>Adicionar Cálculo</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
            
            {calculos.length > 0 && (
                <View style={styles.chartContainer}>
                    <Text style={styles.chartTitle}>Gráfico Comparativo</Text>
                    <LineChart
                        data={{
                            labels: calculos.map((_, index) => `Cálculo ${index + 1}`),
                            datasets: [
                                { data: calculos.map(c => c.valorLiquido), color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, strokeWidth: 2 },
                                { data: calculos.map(c => c.mop), color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`, strokeWidth: 2 },
                                { data: calculos.map(c => c.mlk), color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`, strokeWidth: 2 }
                            ],
                            legend: ["Valor Líquido", "MOP", "Margem de Lucro"]
                        }}
                        width={Dimensions.get('window').width - 40}
                        height={250}
                        yAxisLabel="R$ "
                        chartConfig={{
                            backgroundGradientFrom: '#f4f4f8',
                            backgroundGradientTo: '#f4f4f8',
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                        bezier
                        style={{ borderRadius: 10 }}
                    />
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 30,
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
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        backgroundColor: '#6A0DAD',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    chartContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
});

export default ComparacaoCalculos;
