import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            {/* Cabeçalho */}
            <View style={styles.header}>
                <Text style={styles.title}>Bem-vindo a Khipo</Text>
                <Text style={styles.subtitle}>Explore as funcionalidades incríveis que preparamos para você!</Text>
            </View>

            {/* Imagem de Destaque */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} // Substitua pelo seu link de imagem
                    style={styles.featuredImage}
                />
            </View>

            {/* Seção de Funções */}
            <View style={styles.featuresContainer}>
                <Text style={styles.sectionTitle}>Funcionalidades</Text>

                {/* Cartões de Função */}
                <View style={styles.featureCardContainer}>
                    <TouchableOpacity
                        style={styles.featureCard}
                        onPress={() => navigation.navigate('CambioScreen')}
                    >
                        <Text style={styles.featureCardText}>Câmbio</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.featureCard}
                        onPress={() => navigation.navigate('CalculatorScreen')}
                    >
                        <Text style={styles.featureCardText}>Calculadora</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Seção de Contato */}
            <View style={styles.contactContainer}>
                <Text style={styles.sectionTitle}>Fale Conosco</Text>
                <Text style={styles.contactText}>Tem dúvidas? Fale com a gente.</Text>
                <TouchableOpacity
                    style={styles.contactButton}
                    onPress={() => Linking.openURL('https://www.khipo.ai/contato')}>
                    <Text style={styles.contactButtonText}>Entrar em Contato</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.contactButton} 
                    onPress={() => Linking.openURL('https://www.khipo.ai')}>
                    <Text style={styles.contactButtonText}>Visite nosso site</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f8',
        paddingHorizontal: 20,
    },
    header: {
        marginTop: 40,
        marginBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#6A0DAD',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        marginTop: 10,
        textAlign: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 30,
    },
    featuredImage: {
        width: 300,
        height: 200,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    featuresContainer: {
        marginBottom: 40,
    },
    sectionTitle: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    featureCardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    featureCard: {
        backgroundColor: '#6A0DAD',
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '45%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 30,

    },
    featureCardText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
    contactContainer: {
        backgroundColor: '#fff',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 30,

    },
    contactText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    contactButton: {
        backgroundColor: '#6A0DAD',
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 30,

    },
    contactButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
