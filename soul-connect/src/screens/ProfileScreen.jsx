import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import Icon from "react-native-vector-icons/MaterialIcons";
import AuthContext from "../context/auth";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);

  const auth = useContext(AuthContext);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("access_token");
    auth.setIsSignedIn(false);
  };

  useEffect(() => {
    const getUser = async () => {
      const user = await SecureStore.getItemAsync("user");
      setUser(JSON.parse(user));
    };
    getUser();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <View style={styles.profileHeader}>
        <Image
          style={styles.profileImage}
          source={{
            uri:
              user?.imgUrl ||
              "https://i.pinimg.com/236x/9f/b9/df/9fb9df6a24efdc70911dc5b6ec12bc9a.jpg",
          }}
        />
        <Text style={styles.profileName}>
          {user?.username}, {user?.age}
        </Text>
      </View>
      <View style={styles.accountSettings}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditScreen")}
          style={styles.editButton}
        >
          <Icon name="edit" size={24} color="#555" />
        </TouchableOpacity>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput style={styles.input} value={user?.name} editable={false} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Bio</Text>
          <TextInput
            style={styles.inputMultiline}
            value={user?.bio}
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
            value={String(user?.age)}
            editable={false}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value={user?.email}
            editable={false}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Preference</Text>
          <TextInput
            style={styles.inputMultiline}
            value={user?.preference.join(", ")}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff", // Changed background color to white
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
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
  },
  accountSettings: {
    backgroundColor: "#ffffff", // Changed background color to white
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
    color: "#333", // Changed color to a darker shade
    backgroundColor: "#ffffff", // Ensure background is white
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
    backgroundColor: "#ffffff", // Changed background to white
    borderWidth: 1,
    borderColor: "#AA3FEC", // Purple border color
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15, // Adjusted margin bottom
  },
  friendListButtonText: {
    color: "#AA3FEC", // Changed text color to purple
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#AA3FEC",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 50, // Reduced bottom margin
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
