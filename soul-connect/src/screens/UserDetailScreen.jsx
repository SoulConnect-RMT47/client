import { useRoute } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  ImageBackground,
} from "react-native";
import bg from "../bg.png";

export default function UserDetailScreen() {
  const route = useRoute();
  const { user } = route.params;

  return (
    <ImageBackground source={bg} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Profile</Text>
        <View style={styles.profileHeader}>
          <Image
            style={styles.profileImage}
            source={{
              uri:
                user.swipedUser.imgUrl ||
                "https://i.pinimg.com/236x/9f/b9/df/9fb9df6a24efdc70911dc5b6ec12bc9a.jpg",
            }}
          />
          <Text style={styles.profileName}>
            {user.swipedUser.name}, {user.swipedUser.age}
          </Text>
        </View>
        <View style={styles.accountSettings}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              value={user.swipedUser.name}
              editable={false}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Bio</Text>
            <TextInput
              style={styles.inputMultiline}
              value={user.swipedUser.bio}
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
              value={user.swipedUser.age.toString()}
              editable={false}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={user.swipedUser.email}
              editable={false}
            />
          </View>
          <View style={[styles.inputGroup, styles.preferenceInputGroup]}>
            <Text style={styles.inputLabel}>Preference</Text>
            <TextInput
              style={styles.inputMultiline}
              value={user.swipedUser.preference.join(", ")}
              editable={false}
              multiline={true}
              textAlignVertical="top"
              numberOfLines={2}
            />
          </View>
        </View>
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
  preferenceInputGroup: {
    marginBottom: 30, // Add bottom margin specifically to the preference input group
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
