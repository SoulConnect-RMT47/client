import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import * as SecureStore from "expo-secure-store";

export default function ChatList({ navigation }) {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const fetchChatScreen = async () => {
      const token = await SecureStore.getItemAsync("access_token");
      // console.log(token);
      try {
        let { data } = await axios({
          method: "GET",
          url: `https://soulconnect-server.habibmufti.online/connections`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setChatList(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChatScreen();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chat</Text>
      <ScrollView>
        {chatList.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.chatContainer}
            onPress={() =>
              navigation.navigate("ChatDetailScreen", { chat: item })
            }
          >
            <View style={styles.imageContainer}>
              <Image
                style={styles.profileImage}
                source={{ uri: item.imgUrl }}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.bio}>{item.bio}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  chatContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#ffffff", // Putih
    borderRadius: 10,
    elevation: 3, // Shadow
  },
  imageContainer: {
    marginRight: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textContainer: {
    flexDirection: "column",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bio: {
    fontSize: 14,
  },
});
