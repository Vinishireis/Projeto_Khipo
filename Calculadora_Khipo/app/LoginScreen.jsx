import React, { useState } from "react";
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Image,Linking,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = () => {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = () => {
        if (username === '' || password === '') {
            setErrorMessage('Por favor, preencha todos os campos.');
        } else {
            setErrorMessage('');
            navigation.replace("Home"); // Navega para a tela "Home" após o login
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/images/Logo_Khipo_Login.png")}
                style={styles.logo}
            />
            <Text style={styles.welcomeText}>Bem-vindo</Text>
            <TextInput
                style={styles.input}
                placeholder="Utilizador"
                value={username}
                onChangeText={setUsername} // Atualiza o estado do nome de usuário
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Palavra-passe"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword} // Atualiza o estado da senha
                />
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                >
                    <Ionicons
                        name={showPassword ? "eye-off" : "eye"}
                        size={24}
                        color="#55329A"
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin} // Chama a função de login com validação
            >
                <Text style={styles.loginButtonText}>ENTRAR</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.khipo.ai/contato')}>
                <Text style={styles.helpText}>Ajuda?</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "#fff",
    },
    logo: {
        width: 150,
        height: 180,
        marginBottom: 100,
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#55329A",
    },
    input: {
        width: "100%",
        height: 58,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 20,
        marginBottom: 15,
        fontSize: 16,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginBottom: 15,
        position: "relative",
    },
    passwordInput: {
        flex: 1,
        height: 58,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 20,
        fontSize: 16,
    },
    eyeIcon: {
        position: "absolute",
        right: 15,
    },
    loginButton: {
        width: "100%",
        height: 56,
        backgroundColor: "#55329A",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        marginTop: 50,
        marginBottom: 10,
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    helpText: {
        color: "#24253D",
        fontSize: 14,
    },
});

export default LoginScreen;