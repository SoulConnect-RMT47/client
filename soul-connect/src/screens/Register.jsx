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

export default function SignUpForm({ navigation }) {
	const [fullName, setFullName] = useState("user1 user");
	const [gender, setGender] = useState("male");
	const [age, setAge] = useState("20");
	const [username, setUsername] = useState("username1");
	const [email, setEmail] = useState("user1@mail.com");
	const [password, setPassword] = useState("user1");
	const [location, setLocation] = useState("New York, USA");
	const [bio, setBio] = useState(
		"Software developer with a passion for coding and technology."
	);
	const [preferences, setPreferences] = useState(
		"hiking,gaming,riding"
	);

	const handleSignUp = async () => {
		// Lakukan sesuatu saat tombol sign up ditekan
		try {
			const response = await axios({
				method: "POST",
				url: "https://soulconnect-server.habibmufti.online/users/register",
				headers: {
					"Content-Type": "application/json",
				},
				data: {
					name:fullName,
					age:Number(age),
					gender:gender,
          imageUrl:"https://media.cnn.com/api/v1/images/stellar/prod/230112091039-joko-widodo-file.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp",
					username:username,
					email:email,
					password:password,
					location:location,
					bio:bio,
					preferences:preferences,
				},
			});
      console.log( response);

		} catch (error) {
			console.log(error.response.data) ;
		}
		// console.log("Sign up button pressed!");
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>Sign Up</Text>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="Full Name"
					value={fullName}
					onChangeText={setFullName}
				/>
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="Gender"
					value={gender}
					onChangeText={setGender}
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
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="Preferences"
					value={preferences}
					onChangeText={setPreferences}
				/>
			</View>
			<TouchableOpacity
				style={styles.button}
				onPress={handleSignUp}
			>
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
				<Text style={styles.googleText}>
					Sign Up with Google
				</Text>
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
	},
	inputContainer: {
		width: "80%",
		marginBottom: 10,
	},
	label: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
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
	loginText: {
		marginTop: 10,
	},
	loginLink: {
		color: "#4285F4",
	},
});
