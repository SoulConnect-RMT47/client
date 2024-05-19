import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export default function EditScreen({ navigation }) {
  const [input, setInput] = useState({
    name: "",
    bio: "",
    age: "",
    imgUrl: "",
  });

  useEffect(() => {
    const getUser = async () => {
      const token = await SecureStore.getItemAsync("access_token");
      const user = await SecureStore.getItemAsync("user");
      const result = JSON.parse(user);
      const userId = result._id; // Dapatkan userId dari SecureStore

      try {
        let { data } = await axios({
          method: "GET",
          url: `https://soulconnect-server.habibmufti.online/users/${userId}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInput({
          name: data.name,
          bio: data.bio,
          age: data.age.toString(), // Convert age to string for TextInput
          imgUrl: data.imgUrl,
        });
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getUser();
  }, []);

  const handleChangeInput = (name, value) => {
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSave = async () => {
    const token = await SecureStore.getItemAsync("access_token");
    const user = await SecureStore.getItemAsync("user");
    const result = JSON.parse(user);
    // const userId = result._id; // Dapatkan userId dari SecureStore
    const age = parseFloat(input.age);
    try {
      await axios({
        method: "PUT",
        url: `https://soulconnect-server.habibmufti.online/users`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { ...input, age },
      });
      navigation.navigate("ProfileScreen");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Edit</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          style={styles.input}
          value={input.name}
          onChangeText={(value) => handleChangeInput("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Bio</Text>
        <TextInput
          style={styles.input}
          value={input.bio}
          onChangeText={(value) => handleChangeInput("bio", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Age</Text>
        <TextInput
          style={styles.input}
          value={input.age}
          onChangeText={(value) => handleChangeInput("age", value)}
          keyboardType="numeric" // Ensure numeric input for age
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Image URL</Text>
        <TextInput
          style={styles.input}
          value={input.imgUrl}
          onChangeText={(value) => handleChangeInput("imgUrl", value)}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  saveButton: {
    backgroundColor: "#AA3FEC",
    padding: 15,
    alignItems: "center",
    marginTop: 20,
    borderRadius: 30,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
