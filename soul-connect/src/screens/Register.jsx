import React, { useState } from "react";
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
import { Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

const tags = [
  "Reading",
  "Writing",
  "Painting",
  "Drawing",
  "Playing music",
  "Singing",
  "Dancing",
  "Hiking",
  "Camping",
  "Gardening",
  "Cooking",
  "Photography",
  "Playing video games",
  "Watching movies",
  "Traveling",
];

export default function SignUpForm({ navigation }) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagPress = (tag) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  const handleSignUp = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: "https://soulconnect-server.habibmufti.online/users/register",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name: name,
          age: Number(age),
          gender: gender,
          imgUrl:
            "https://i.pinimg.com/236x/9f/b9/df/9fb9df6a24efdc70911dc5b6ec12bc9a.jpg",
          username: username,
          email: email,
          password: password,
          location: location,
          bio: bio,
          preference: selectedTags,
        },
      });
      Alert.alert(
        "Success",
        "Registration successful!",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      navigation.navigate("Login");
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { height: 50 }]}
          placeholder="Bio"
          value={bio}
          onChangeText={setBio}
          multiline
        />
      </View>
      <View style={styles.gender}>
        <Picker
          selectedValue={gender}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>
      <Text style={styles.subTitle}>Select Your Preferences</Text>
      <View style={styles.tagsContainer}>
        {tags.map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[
              styles.tagButton,
              selectedTags.includes(tag) && styles.selectedTagButton,
            ]}
            onPress={() => handleTagPress(tag)}
          >
            <Text
              style={[
                styles.tagText,
                selectedTags.includes(tag) && styles.selectedTagText,
              ]}
            >
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine}></View>
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.dividerLine}></View>
      </View>
      <View style={styles.googleButton}>
        <Image
          style={styles.googleLogo}
          source={{
            uri: "https://e7.pngegg.com/pngimages/56/318/png-clipart-google-logo-logo-logo-company-text.png",
          }}
        />
        <Text style={styles.googleText}>Sign Up with Google</Text>
      </View>
      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          Sign In here
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
    marginTop: 30,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 10,
  },
  gender: {
    width: "100%",
    marginBottom: 10,
    paddingLeft: 20,
    alignSelf: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    paddingVertical: 5,
    color: "grey",
    fontSize: 15.5,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  tagButton: {
    borderWidth: 1,
    borderColor: "#6B46C1",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  selectedTagButton: {
    backgroundColor: "#AA3FEC",
  },
  tagText: {
    color: "#6B46C1",
  },
  selectedTagText: {
    color: "#fff",
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
  loginText: {
    marginTop: 10,
  },
  loginLink: {
    color: "#4285F4",
  },
});
