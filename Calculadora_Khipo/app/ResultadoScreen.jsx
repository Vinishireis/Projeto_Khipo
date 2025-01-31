import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import * as Sharing from 'expo-sharing';

const ResultadoScreen = ({ route }) => {
    const navigation = useNavigation();
    const { resultado } = route.params || {}; // Evita erro se `route.params` for undefined

    // Garantir que os valores são numéricos e válidos
    const valorLiquido = Number(resultado?.valorLiquido) || 0;
    const mop = Number(resultado?.mop) || 0;
    const mlk = Number(resultado?.mlk) || 0;

    const [document, setDocument] = useState(null);

    // Função para gerar o PDF
    const gerarPDF = async () => {
        try {
            const htmlContent = `
                <html>
                    <body>
                        <h1>Extrato de Cálculo Comercial</h1>
                        <p>Valor Líquido: R$ ${valorLiquido.toFixed(2)}</p>
                        <p>MOP (R$ / Mês): R$ ${mop.toFixed(2)}</p>
                        <p>Margem de Lucro: R$ ${mlk.toFixed(2)}</p>
                    </body>
                </html>
            `;

            const { uri } = await Print.printToFileAsync({ html: htmlContent });
            console.log('PDF gerado com sucesso:', uri);

            const newUri = await salvarPDF(uri);
            compartilharPDF(newUri);
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            Alert.alert('Erro', 'Não foi possível gerar o PDF.');
        }
    };

    const salvarPDF = async (uri) => {
        try {
            const fileName = 'extrato_comercial.pdf';
            const destinationUri = `${FileSystem.documentDirectory}${fileName}`;

            await FileSystem.moveAsync({
                from: uri,
                to: destinationUri,
            });

            console.log('PDF salvo em:', destinationUri);
            return destinationUri;
        } catch (error) {
            console.error('Erro ao salvar o PDF:', error);
            Alert.alert('Erro', 'Não foi possível salvar o PDF.');
            return uri;
        }
    };

    const compartilharPDF = async (path) => {
        try {
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(path, {
                    mimeType: 'application/pdf',
                    dialogTitle: 'Compartilhar PDF',
                });
            } else {
                Alert.alert('Erro', 'Compartilhamento não disponível no seu dispositivo.');
            }
        } catch (error) {
            console.error('Erro ao compartilhar o PDF:', error);
            Alert.alert('Erro', 'Não foi possível compartilhar o PDF.');
        }
    };

    const selecionarDocumento = async () => {
        try {
            const res = await DocumentPicker.getDocumentAsync({ type: '*/*' });

            if (res.type === 'success') {
                setDocument(res);
                console.log('Documento selecionado:', res);
            }
        } catch (error) {
            console.error('Erro ao selecionar documento:', error);
            Alert.alert('Erro', 'Não foi possível selecionar o documento.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resultado do Cálculo</Text>

            <Text style={styles.resultText}>Valor Líquido: R$ {valorLiquido.toFixed(2)}</Text>
            <Text style={styles.resultText}>MOP (R$ / Mês): R$ {mop.toFixed(2)}</Text>
            <Text style={styles.resultText}>Margem de Lucro: R$ {mlk.toFixed(2)}</Text>

            <TouchableOpacity style={styles.button} onPress={gerarPDF}>
                <Text style={styles.buttonText}>Gerar PDF e Enviar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={selecionarDocumento}>
                <Text style={styles.buttonText}>Selecionar Documento</Text>
            </TouchableOpacity>

            {document && (
                <Text style={styles.documentText}>Documento Selecionado: {document.name}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Voltar</Text>
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
        marginBottom: 30,
        color: '#333',
        marginTop: 20,
    },
    resultText: {
        fontSize: 18,
        marginBottom: 10,
        color: '#555',
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
    documentText: {
        fontSize: 16,
        marginTop: 10,
        color: '#333',
    },
});

export default ResultadoScreen;
