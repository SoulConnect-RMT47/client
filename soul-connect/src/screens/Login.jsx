import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import AuthContext from "../context/auth";

export default function LoginForm({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);

  const handleLogin = async () => {
    // Lakukan sesuatu saat tombol login ditekan
    try {
      const response = await axios({
        method: "POST",
        url: "https://soulconnect-server.habibmufti.online/users/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: email,
          password: password,
        },
      });
      await SecureStore.setItemAsync("access_token", response.data.token);
      auth.setIsSignedIn(true);
      await SecureStore.setItemAsync(
        "user",
        JSON.stringify(response.data.user)
      );
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine}></View>
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.dividerLine}></View>
      </View>
      <TouchableOpacity style={styles.googleButton}>
        <Image
          style={styles.googleLogo}
          source={{
            uri: "https://e7.pngegg.com/pngimages/56/318/png-clipart-google-logo-logo-logo-company-text.png",
          }}
        />
        <Text style={styles.googleText}>Sign In with Google</Text>
      </TouchableOpacity>
      <Text style={styles.registerText}>
        doesn't have an account?{" "}
        <Text
          style={styles.registerLink}
          onPress={() => navigation.navigate("Register")}
        >
          Sign Up here
        </Text>
        .
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    paddingVertical: 5,
  },
  button: {
    backgroundColor: "#AA3FEC",
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "80%",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#6B46C1",
    fontWeight: "bold",
    fontSize: 16,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleText: {
    color: "#4285F4",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerText: {
    marginTop: 10,
  },
  registerLink: {
    color: "#4285F4",
  },
});
