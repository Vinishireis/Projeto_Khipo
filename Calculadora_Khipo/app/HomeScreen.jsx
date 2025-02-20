import React, { useRef, useState, useEffect } from 'react';
import { 
    View, Text, StyleSheet, Image, TouchableOpacity, 
    ScrollView, Linking, FlatList, Dimensions 
} from 'react-native';

const images = [
    'https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1678917827802-721b5f5b4bf0?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=2002&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Muda o índice da imagem conforme a visualização
    const onViewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    };

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50, // Garante que pelo menos 50% da imagem esteja visível para mudar o índice
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % images.length;
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        }, 3000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <ScrollView style={styles.container}>
            {/* Cabeçalho */}
            <View style={styles.header}>
                <Text style={styles.title}>Bem-vindo à Khipo</Text>
                <Text style={styles.subtitle}>Explore as funcionalidades incríveis que preparamos para você!</Text>
            </View>

            {/* Carrossel de Imagens */}
            <View style={styles.imageContainer}>
                <FlatList
                    ref={flatListRef}
                    data={images}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }} style={styles.featuredImage} />
                    )}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                />
            </View>

            {/* Funcionalidades */}
            <View style={styles.featuresContainer}>
                <Text style={styles.sectionTitle}>Funcionalidades</Text>
                <View style={styles.featureCardContainer}>
                    <TouchableOpacity style={styles.featureCard} onPress={() => navigation.navigate('CambioScreen')}>
                        <Text style={styles.featureCardText}>Câmbio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.featureCard} onPress={() => navigation.navigate('CalculatorScreen')}>
                        <Text style={styles.featureCardText}>Calculadora</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Contato */}
            <View style={styles.contactContainer}>
                <Text style={styles.sectionTitle}>Fale Conosco</Text>
                <Text style={styles.contactText}>Tem dúvidas? Fale com a gente.</Text>
                <TouchableOpacity style={styles.contactButton} onPress={() => Linking.openURL('https://www.khipo.ai/contato')}>
                    <Text style={styles.contactButtonText}>Entrar em Contato</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contactButton} onPress={() => Linking.openURL('https://www.khipo.ai')}>
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
        paddingHorizontal: '5%', 
    },
    header: { 
        marginTop: 40,
        marginBottom: 20,
        alignItems: 'center' 
    },
    title: { 
        fontSize: 32,
        fontWeight: 'bold',
        color: '#6A0DAD',
        textAlign: 'center'
    },
    subtitle: { 
        fontSize: 16,
        color: '#555', 
        marginTop: 10,
        textAlign: 'center' 
    },
    imageContainer: { 
        width: '100%', 
        alignItems: 'center',
        marginVertical: 30 
    },
    featuredImage: { 
        width: width * 0.9, 
        height: 200, 
        borderRadius: 20,
        resizeMode: 'cover'
    },
    featuresContainer: { 
        marginBottom: 40 
    },
    sectionTitle: { 
        fontSize: 24, 
        textAlign: 'center', 
        fontWeight: 'bold', 
        color: '#333', 
        marginBottom: 10 
    },
    featureCardContainer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        flexWrap: 'wrap'
    },
    featureCard: { 
        width: '45%', 
        minWidth: 150,
        backgroundColor: '#6A0DAD', 
        paddingVertical: 20, 
        borderRadius: 10, 
        alignItems: 'center', 
        justifyContent: 'center', 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.2, 
        shadowRadius: 4, 
        elevation: 5, 
        marginBottom: 10
    },
    featureCardText: { 
        fontSize: 14, 
        color: '#fff', 
        fontWeight: 'bold' 
    },
    contactContainer: { 
        backgroundColor: '#fff', 
        padding: 20, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.2, 
        shadowRadius: 4, 
        elevation: 5, 
        borderRadius: 20 
    },
    contactText: { 
        fontSize: 16, 
        color: '#333', 
        marginBottom: 20, 
        textAlign: 'center' 
    },
    contactButton: { 
        backgroundColor: '#6A0DAD', 
        paddingVertical: 12, 
        alignItems: 'center', 
        marginBottom: 10, 
        borderRadius: 20 
    },
    contactButtonText: { 
        color: '#fff', 
        fontSize: 16, 
        fontWeight: 'bold' 
    }
});

export default HomeScreen;
