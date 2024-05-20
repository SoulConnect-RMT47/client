import React, { useContext, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useFocusEffect } from "@react-navigation/native";
import AuthContext from "../context/auth";
import axios from "axios";
import bg from "../bg.png"; // Ensure this path is correct

export default function ProfileScreen({ navigation }) {
  const auth = useContext(AuthContext);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("access_token");
    auth.setIsSignedIn(false);
  };

  const [input, setInput] = useState({
    name: "",
    bio: "",
    age: "",
    imgUrl: "",
    email: "",
    preference: [],
  });

  const getUser = useCallback(async () => {
    const token = await SecureStore.getItemAsync("access_token");
    const user = await SecureStore.getItemAsync("user");
    const result = JSON.parse(user);
    const userId = result._id;

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
        email: data.email,
        preference: data.preference || [],
      });
    } catch (error) {
      console.log(error.response.data);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, [getUser])
  );

  return (
    <ImageBackground source={bg} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Profile</Text>
        <View style={styles.profileHeader}>
          <Image
            style={styles.profileImage}
            source={{
              uri:
                input?.imgUrl ||
                "https://i.pinimg.com/236x/9f/b9/df/9fb9df6a24efdc70911dc5b6ec12bc9a.jpg",
            }}
          />
          <Text style={styles.profileName}>
            {input?.name}, {input?.age}
          </Text>
        </View>
        <View style={styles.accountSettings}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EditScreen", { userId: user?._id })
            }
            style={styles.editButton}
          >
            <Icon name="edit" size={24} color="#555" />
          </TouchableOpacity>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              value={input?.name}
              editable={false}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Bio</Text>
            <TextInput
              style={styles.inputMultiline}
              value={input?.bio}
              editable={false}
              multiline={true}
              textAlignVertical="top"
              numberOfLines={3}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Age</Text>
            <TextInput
              style={styles.input}
              value={input?.age}
              editable={false}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={input?.email}
              editable={false}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Preference</Text>
            <TextInput
              style={styles.inputMultiline}
              value={input.preference.join(", ")}
              editable={false}
              multiline={true}
              textAlignVertical="top"
              numberOfLines={2}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#fff", // Ensure the header text is readable over the background
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff", // Ensure the profile name text is readable over the background
  },
  accountSettings: {
    backgroundColor: "rgba(255, 255, 255, 0)", // Make this background semi-transparent
    padding: 20,
    borderRadius: 10,
    position: "relative",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  editButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#ffffff",
    marginTop: 5,
    color: "black",
  },
  inputMultiline: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#ffffff",
    marginTop: 5,
    color: "black",
  },
  friendListButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#AA3FEC",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  friendListButtonText: {
    color: "#AA3FEC",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#AA3FEC",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 50,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
