import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import CardLike from "../components/CardLike";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import bg from "../bg.png";

export default function LikeScreen({ navigation }) {
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
    <ImageBackground source={bg} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={{ fontSize: 20, color: "#fff" }}>
            Likes {likes.length}
          </Text>
        </View>
        <FlatList
          data={groupedUsers}
          renderItem={({ item }) => (
            <View style={styles.rowContainer}>
              {item.map((user) => (
                <TouchableOpacity
                  key={user._id}
                  style={styles.cardContainer}
                  onPress={() =>
                    navigation.navigate("UserDetailScreen", { user: user })
                  }
                >
                  <CardLike
                    title={user.swipedUser.name}
                    description={user.swipedUser.location}
                    imageUrl={{ uri: user.swipedUser.imgUrl }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.contentContainer}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
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
  cardContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
});
