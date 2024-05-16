import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import Register from "../screens/Register.jsx";
import Login from "../screens/Login.jsx";
import TabScreen from "./TabScreen.js";
import logo from "../SoulConnect_jst_logo_crop.png";
import { Image } from "react-native";

export default function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
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
        }}
      />
    </Stack.Navigator>
  );
}
