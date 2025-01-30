import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/images/Logo_Khipo_Login.png")}
        style={styles.logo}
      />

      {/* Texto de boas-vindas */}
      <Text style={styles.welcomeText}>Bem-vindo</Text>

      {/* Campo de utilizador */}
      <TextInput style={styles.input} placeholder="Utilizador" />

      {/* Campo de palavra-passe */}
      <TextInput
        style={styles.input}
        placeholder="Palavra-passe"
        secureTextEntry={true}
      />

      {/* Botão de login */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>ENTRAR</Text>
      </TouchableOpacity>

      {/* Link de ajuda */}
      <TouchableOpacity>
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
    width: 150, // Ajuste o tamanho conforme necessário
    height: 180, // Ajuste o tamanho conforme necessário
    marginTop: 0,
    marginBottom: 100,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    width: 162,
    height: 40,
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
    marginTop: 0,
  },
  link: {
    color: "#55329A",
    textAlign: "center",
    marginBottom: 60,
  },
});

export default LoginScreen;
