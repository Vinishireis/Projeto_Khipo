import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // Importa a navegação de pilha
import 'react-native-gesture-handler';

// Import screens
import LoginScreen from './app/LoginScreen';
import HomeScreen from './app/HomeScreen';
import CalculatorScreen from './app/CalculatorScreen';
import NationalCalculator from './app/NationalCalculator';
import InternationalCalculator from './app/InternationalCalculator';
import CambioScreen from './app/CambioScreen';
import ResultadoScreen from './app/ResultadoScreen';
import SettingsScreen from './app/SettingsScreen';



// Import icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import PDFScreen
import PDFScreen from './components/ExportPdfScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tela de navegação sem barra
const HomeTabs = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarActiveTintColor: '#6A0DAD', // Active icon color
      tabBarInactiveTintColor: '#555', // Inactive icon color
      tabBarStyle: {
        backgroundColor: '#fff', // Background color of the tab bar
        borderTopWidth: 0, // Remove top border
      },
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Início',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" color={color} size={size} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="CalculatorScreen"
      component={CalculatorScreen}
      options={{
        tabBarLabel: 'Calculadora',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="calculator" color={color} size={size} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="CambioScreen"
      component={CambioScreen}
      options={{
        tabBarLabel: 'Câmbio',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="cash" color={color} size={size} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        tabBarLabel: 'Configurações',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="settings" color={color} size={size} />
        ),
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false, // Não exibe a NavBar na tela de login
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeTabs} // Aqui, a navegação com a NavBar é mostrada após o login
          options={{
            headerShown: false, // Não exibe o cabeçalho da NavBar na tela Home (vai ser controlado pelo Tab.Navigator)
          }}
        />
        <Stack.Screen name="NationalCalculator" component={NationalCalculator}options={{
            headerShown: false, // Não exibe o cabeçalho da NavBar na tela Home (vai ser controlado pelo Tab.Navigator)
          }} />
        <Stack.Screen name="InternationalCalculator" component={InternationalCalculator}options={{
            headerShown: false, // Não exibe o cabeçalho da NavBar na tela Home (vai ser controlado pelo Tab.Navigator)
          }} />
        <Stack.Screen name="Settings" component={SettingsScreen}options={{
            headerShown: false, // Não exibe o cabeçalho da NavBar na tela Home (vai ser controlado pelo Tab.Navigator)
          }} />
        <Stack.Screen name='Resultado' component={ResultadoScreen} options={{
            headerShown: false, // Não exibe o cabeçalho da NavBar na tela Home (vai ser controlado pelo Tab.Navigator)
          }} />
        <Stack.Screen name='PDF' component={PDFScreen} options={{
            headerShown: false, // Não exibe o cabeçalho da NavBar na tela Home (vai ser controlado pelo Tab.Navigator)
          }} />   
      </Stack.Navigator>
    </NavigationContainer>
  );
}