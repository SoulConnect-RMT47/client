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

export default function EditScreen({ navigation }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [age, setAge] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const [user, setUser] = useState(null);

  // const [input, setInput] = useState({
  //   name: "",
  //   bio: "",
  //   age: "",
  //   imgUrl: "",
  // });

  useEffect(() => {
    const getUser = async () => {
      const user = await SecureStore.getItemAsync("user");
      setUser(JSON.parse(user));
    };
    getUser();

    // if (user._id) {
    //   async function fetchPostById() {
    //     try {
    //       let { data } = await axios({
    //         method: "GET",
    //         url:
    //           "https://soulconnect-server.habibmufti.online/users/" + user._id,
    //         headers: {
    //           Authorization: `Bearer ${localStorage.access_token}`,
    //         },
    //       });
    //       console.log(data);
    //       // setInput({
    //       //   title: data.data.title,
    //       //   cover: data.data.cover,
    //       //   url: data.data.url,
    //       //   rating: data.data.rating,
    //       // });
    //     } catch (error) {
    //       console.log(error.response.data.message);
    //       let errMsg = error.response.data.message;
    //       Swal.fire({
    //         title: "Error",
    //         text: errMsg,
    //         icon: "error",
    //       });
    //     }
    //   }
    //   fetchPostById();
    // }
  }, []);

  const handleSave = () => {
    console.log(name, bio, age, imgUrl);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Edit</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          style={styles.input}
          value={user?.name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Bio</Text>
        <TextInput
          style={styles.input}
          value={user?.bio}
          onChangeText={(text) => setBio(text)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Age</Text>
        <TextInput
          style={styles.input}
          value={String(user?.age)}
          onChangeText={(text) => setAge(text)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Image URL</Text>
        <TextInput
          style={styles.input}
          value={user?.imgUrl}
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
    alignItems: "center",
    marginTop: 20,
    borderRadius: 30,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
