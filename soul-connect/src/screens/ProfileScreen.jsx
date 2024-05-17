import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function ProfileScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <View style={styles.profileHeader}>
        <Image
          style={styles.profileImage}
          source={{
            uri: "https://i.pinimg.com/236x/9f/b9/df/9fb9df6a24efdc70911dc5b6ec12bc9a.jpg",
          }} // Replace with actual image URL
        />
        <Text style={styles.profileName}>Reza Arga, 22</Text>
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
          <TextInput style={styles.input} value="Reza Arga" editable={false} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Bio</Text>
          <TextInput
            style={styles.input}
            value="A brief bio about Reza Arga"
            editable={false}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Age</Text>
          <TextInput style={styles.input} value="22" editable={false} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value="abcqwertyu@gmail.com"
            editable={false}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("FriendList")}
          style={styles.friendListButton}
        >
          <Text style={styles.friendListButtonText}>Friend List</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logoutButton}>
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
    backgroundColor: "#ffffff", // Ensure background is white
    marginTop: 5,
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
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 50, // Reduced bottom margin
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
