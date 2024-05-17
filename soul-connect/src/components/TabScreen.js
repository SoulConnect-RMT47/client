import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

import ChatScreen from "../screens/ChatScreen";
import EditScreen from "../screens/EditScreen";
import HomeScreen from "../screens/HomeScreen";
import LikeScreen from "../screens/LikeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Friendlist from "../screens/FriendList";

export default function TabScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar, // Menambahkan style untuk tab bar
        tabBarActiveTintColor: "#AA3FEC",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false, // Menyembunyikan label teks jika diinginkan
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="LikeScreen"
        component={LikeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} /> // Mengubah ikon menjadi gambar love
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-outline" color={color} size={size} /> // Mengubah ikon menjadi icon chat
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="EditScreen"
        component={EditScreen}
        options={{
          headerShown: false,
          tabBarButton: () => null, // Menyembunyikan tab dari bottom tab
        }}
      />
      <Tab.Screen
        name="FriendList"
        component={Friendlist}
        options={{
          headerShown: false,
          tabBarButton: () => null, // Menyembunyikan tab dari bottom tab
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "white",
    borderTopLeftRadius: 40, // Menambahkan radius pada bagian kiri atas
    borderTopRightRadius: 40, // Menambahkan radius pada bagian kanan atas
    height: 60, // Menyesuaikan tinggi tab bar
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 0, // Menghilangkan border atas jika ada
  },
});
