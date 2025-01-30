import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const CalculatorScreen = () => {
    const [activeTab, setActiveTab] = useState('national');
    const navigation = useNavigation();
    const scrollViewRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const [screenWidth, setScreenWidth] = useState(width);

    useEffect(() => {
        const updateWidth = () => {
            setScreenWidth(Dimensions.get('window').width);
        };

        const dimensionsListener = Dimensions.addEventListener('change', updateWidth);
        
        return () => {
            dimensionsListener.remove();
        };
    }, []);

    // A cada mudança de tab, anima o scrollX para a posição correta
    useEffect(() => {
        Animated.spring(scrollX, {
            toValue: activeTab === 'national' ? 0 : screenWidth,
            useNativeDriver: true,
        }).start();
    }, [activeTab, screenWidth]);

    const handleTabPress = (tab) => {
        setActiveTab(tab);
        scrollViewRef.current.scrollTo({ x: tab === 'national' ? 0 : screenWidth, y: 0, animated: true });
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'national' && styles.activeTab]}
                    onPress={() => handleTabPress('national')}
                >
                    <Text style={[styles.tabText, activeTab === 'national' && styles.activeTabText]}>Nacional</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'international' && styles.activeTab]}
                    onPress={() => handleTabPress('international')}
                >
                    <Text style={[styles.tabText, activeTab === 'international' && styles.activeTabText]}>Internacional</Text>
                </TouchableOpacity>
            </View>

            <Animated.View style={[styles.imageScrollView, { width: screenWidth }]}>
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    style={styles.imageScrollView}
                >
                    <TouchableOpacity
                        style={[styles.content, { width: screenWidth }]}
                        onPress={() => navigation.navigate('NationalCalculator')}
                    >
                        <Image source={require('../assets/images/Nacional.png')} style={styles.image} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.content, { width: screenWidth }]}
                        onPress={() => navigation.navigate('InternationalCalculator')}
                    >
                        <Image source={require('../assets/images/Internacional.png')} style={styles.image} />
                    </TouchableOpacity>
                </ScrollView>
            </Animated.View>

            <View style={styles.indicatorContainer}>
                <Animated.View
                    style={[
                        styles.indicator,
                        {
                            transform: [
                                {
                                    translateX: scrollX.interpolate({
                                        inputRange: [0, screenWidth],
                                        outputRange: [0, 40],
                                        extrapolate: 'clamp',
                                    }),
                                },
                            ],
                        },
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f8',
        paddingTop: 10,
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        marginBottom: 10,
        marginTop: 10,

    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#6A0DAD',
        elevation: 5,
    },
    tabText: {
        fontSize: 18,
        color: '#555',
    },
    activeTabText: {
        fontWeight: 'bold',
        color: '#fff',
    },
    imageScrollView: {
        marginBottom: 20,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 20,
        resizeMode: 'cover',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
    },
});

export default CalculatorScreen;
