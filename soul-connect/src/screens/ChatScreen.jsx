import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

export default function ChatList({ navigation }) {
  const chatData = [
    {
      id: "1",
      name: "John Doe",
      bio: "Lorem ipsum dolor sit amet.",
      imgUrl:
        "https://i.pinimg.com/236x/9f/b9/df/9fb9df6a24efdc70911dc5b6ec12bc9a.jpg",
    },
    {
      id: "2",
      name: "Jane Doe",
      bio: "Nulla facilisi. Integer eu mauris luctus.",
      imgUrl:
        "https://i.pinimg.com/236x/9f/b9/df/9fb9df6a24efdc70911dc5b6ec12bc9a.jpg",
    },
    {
      id: "3",
      name: "Alice Smith",
      bio: "Pellentesque habitant morbi tristique.",
      imgUrl:
        "https://i.pinimg.com/236x/9f/b9/df/9fb9df6a24efdc70911dc5b6ec12bc9a.jpg",
    },
    {
      id: "4",
      name: "John Doe",
      bio: "Lorem ipsum dolor sit amet.",
      imgUrl:
        "https://i.pinimg.com/236x/9f/b9/df/9fb9df6a24efdc70911dc5b6ec12bc9a.jpg",
    },
    {
      id: "5",
      name: "Jane Doe",
      bio: "Nulla facilisi. Integer eu mauris luctus.",
      imgUrl:
        "https://i.pinimg.com/236x/9f/b9/df/9fb9df6a24efdc70911dc5b6ec12bc9a.jpg",
    },
    {
      id: "6",
      name: "Alice Smith",
      bio: "Pellentesque habitant morbi tristique.",
      imgUrl:
        "https://i.pinimg.com/236x/9f/b9/df/9fb9df6a24efdc70911dc5b6ec12bc9a.jpg",
    },
    {
      id: "7",
      name: "John Doe",
      bio: "Lorem ipsum dolor sit amet.",
      imgUrl:
        "https://i.pinimg.com/236x/9f/b9/df/9fb9df6a24efdc70911dc5b6ec12bc9a.jpg",
    },
    {
      id: "8",
      name: "Jane Doe",
      bio: "Nulla facilisi. Integer eu mauris luctus.",
      imgUrl:
        "https://i.pinimg.com/236x/9f/b9/df/9fb9df6a24efdc70911dc5b6ec12bc9a.jpg",
    },
    {
      id: "9",
      name: "Alice Smith",
      bio: "Pellentesque habitant morbi tristique.",
      imgUrl:
        "https://i.pinimg.com/236x/9f/b9/df/9fb9df6a24efdc70911dc5b6ec12bc9a.jpg",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chat</Text>
      <ScrollView>
        {chatData.map((item) => (
          <TouchableOpacity
            key={item.id}
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
