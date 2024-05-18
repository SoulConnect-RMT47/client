import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import StackScreen from "./src/components/StackScreen";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="Stack"
						component={StackScreen}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</GestureHandlerRootView>
	);
}
