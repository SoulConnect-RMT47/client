import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function EditScreen({ navigation }) {
  const [name, setName] = useState("Reza Arga");
  const [bio, setBio] = useState("A brief bio about Reza Arga");
  const [age, setAge] = useState("22");
  const [email, setEmail] = useState("abcqwertyu@gmail.com");
  const [imgUrl, setImgUrl] = useState(
    "https://i.pinimg.com/236x/9f/b9/df/9fb9df6a24efdc70911dc5b6ec12bc9a.jpg"
  );

  const handleSave = () => {
    // Handle save logic here
    console.log("Profile saved");
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Edit</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Bio</Text>
        <TextInput
          style={styles.input}
          value={bio}
          onChangeText={(text) => setBio(text)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Age</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={(text) => setAge(text)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Image URL</Text>
        <TextInput
          style={styles.input}
          value={imgUrl}
          onChangeText={(text) => setImgUrl(text)}
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
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
