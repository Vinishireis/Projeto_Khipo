import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const SettingsScreen = ({ navigation }) => {
  const handleLogout = () => {
    Alert.alert('Sair', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', onPress: () => console.log('Usuário saiu') },
    ]);
  };

  const openURL = (url) => {
    Linking.openURL(url).catch(() => Alert.alert('Erro', 'Não foi possível abrir o link.'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <TouchableOpacity style={styles.settingItem} onPress={() => openURL('https://www.khipo.ai/sobre')}>
        <Ionicons name="information-circle-outline" size={24} color="black" />
        <Text style={styles.settingText}>Sobre</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem} onPress={() => openURL('https://www.khipo.ai/termos-de-uso')}>
        <Ionicons name="document-text-outline" size={24} color="black" />
        <Text style={styles.settingText}>Termos e Condições</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem} onPress={() => openURL('https://www.khipo.ai/politica-de-privacidade')}>
        <Ionicons name="shield-checkmark-outline" size={24} color="black" />
        <Text style={styles.settingText}>Política de Privacidade</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={() => { navigation.navigate('Login'); handleLogout(); }}>
        <Ionicons name="log-out-outline" size={24} color="white" />
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  settingItem: {
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingText: {
    fontSize: 18,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 40,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
