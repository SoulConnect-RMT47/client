import React, { useEffect, useState } from "react";
import { View, FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import CardLike from "../components/CardLike";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export default function LikeScreen() {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const getAllLikes = async () => {
      try {
        const token = await SecureStore.getItemAsync("access_token");
        if (!token) throw new Error("No access token found");

        const { data } = await axios({
          method: "GET",
          url: `https://soulconnect-server.habibmufti.online/swipe`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLikes(data);
      } catch (error) {
        console.log(error.message || error.response?.data);
      }
    };

    getAllLikes();
  }, [likes]);

  // Mengelompokkan data pengguna ke dalam array 2D (2 kartu per baris)
  const groupedUsers = [];
  const chunkSize = 2;
  for (let i = 0; i < likes.length; i += chunkSize) {
    groupedUsers.push(likes.slice(i, i + chunkSize));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={{ fontSize: 20 }}>Likes {likes.length}</Text>
      </View>
      <FlatList
        data={groupedUsers}
        renderItem={({ item }) => (
          <View style={styles.rowContainer}>
            {item.map((user) => (
              <CardLike
                key={user._id}
                title={user.swipedUser.name}
                description={user.swipedUser.location}
                imageUrl={{ uri: user.swipedUser.imgUrl }}
              />
            ))}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  subContainer: {
    justifyContent: "center",
    marginLeft: 20,
    marginTop: 5,
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 70,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    marginLeft: 10,
  },
});
