import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import Register from "../screens/Register.jsx";
import Login from "../screens/Login.jsx";
import TabScreen from "./TabScreen.js";
import logo from "../SoulConnect_jst_logo_crop.png";
import { Image } from "react-native";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import AuthContext from "../context/auth.js";

export default function StackScreen() {
	const [user, setUser] = useState(null);
	const [isSignedIn, setIsSignedIn] = useState(false);

	useEffect(() => {
		SecureStore.getItemAsync("access_token")
			.then((result) => {
				if (result) {
					setIsSignedIn(true);
				}
			})
			.catch((err) => {
				// return <ErrorComponent />
				setIsSignedIn(false);
			});
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isSignedIn,
				setIsSignedIn,
				user,
				setUser,
			}}
		>
			<Stack.Navigator>
				{!isSignedIn ? (
					<Stack.Screen
						name="Login"
						component={Login}
						options={{ headerShown: false }}
					/>
				) : (
					<Stack.Screen
						name="SoulConnect"
						component={TabScreen}
						options={{
							headerTintColor: "#007bff",
							headerTitleStyle: {
								fontSize: 30,
								fontWeight: "bold",
							},
							headerShown: true,
							headerBackVisible: false,
							headerTitleAlign: "center",
							headerTitle: () => (
								<Image
									source={logo}
									style={{ width: 150, height: 40 }} // Sesuaikan ukuran logo sesuai kebutuhan
									resizeMode="contain"
								/>
							),
							// headerTransparent: true,
						}}
					/>
				)}

				<Stack.Screen
					name="Register"
					component={Register}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</AuthContext.Provider>
	);
}
