import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export default function ChatList({ navigation }) {
  const [chatList, setChatList] = useState([]);
  const [user, setUser] = useState({});

  // console.log(user);

  const fetchChatScreen = async () => {
    const token = await SecureStore.getItemAsync("access_token");
    const user = await SecureStore.getItemAsync("user");
    try {
      let { data } = await axios({
        method: "GET",
        url: `https://soulconnect-server.habibmufti.online/connections`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setChatList(data);
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChatScreen();
  }, [chatList]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chat</Text>
      <ScrollView>
        {chatList.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.chatContainer}
            onPress={() =>
              navigation.navigate("Chat", { chat: item, user: user })
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
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 3,
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
