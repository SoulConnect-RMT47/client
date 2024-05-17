import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

export default function Friendlist({ navigation }) {
  const friendData = [
    {
      id: "1",
      name: "John Doe",
      age: 25,
      address: "123 Main St, Springfield, IL",
      imgUrl:
        "https://i.pinimg.com/236x/9f/b9/df/9fb9df6a24efdc70911dc5b6ec12bc9a.jpg",
    },
    {
      id: "2",
      name: "Jane Doe",
      age: 27,
      address: "456 Elm St, Anytown, CA",
      imgUrl:
        "https://i.pinimg.com/236x/9f/b9/df/9fb9df6a24efdc70911dc5b6ec12bc9a.jpg",
    },
    {
      id: "3",
      name: "Alice Smith",
      age: 30,
      address: "789 Oak St, Metro City, NY",
      imgUrl:
        "https://i.pinimg.com/236x/9f/b9/df/9fb9df6a24efdc70911dc5b6ec12bc9a.jpg",
    },
    {
      id: "4",
      name: "John Doe",
      age: 25,
      address: "123 Main St, Springfield, IL",
      imgUrl:
        "https://i.pinimg.com/236x/9f/b9/df/9fb9df6a24efdc70911dc5b6ec12bc9a.jpg",
    },
    {
      id: "5",
      name: "Jane Doe",
      age: 27,
      address: "456 Elm St, Anytown, CA",
      imgUrl:
        "https://i.pinimg.com/236x/9f/b9/df/9fb9df6a24efdc70911dc5b6ec12bc9a.jpg",
    },
    {
      id: "6",
      name: "Alice Smith",
      age: 30,
      address: "789 Oak St, Metro City, NY",
      imgUrl:
        "https://i.pinimg.com/236x/9f/b9/df/9fb9df6a24efdc70911dc5b6ec12bc9a.jpg",
    },
    {
      id: "7",
      name: "Alice Smith",
      age: 30,
      address: "789 Oak St, Metro City, NY",
      imgUrl:
        "https://i.pinimg.com/236x/9f/b9/df/9fb9df6a24efdc70911dc5b6ec12bc9a.jpg",
    },
  ];

  // Fungsi untuk merender item teman dalam daftar
  const renderFriendItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() =>
          navigation.navigate("FriendDetailScreen", { friend: item })
        }
      >
        <View style={styles.imageContainer}>
          <Image style={styles.profileImage} source={{ uri: item.imgUrl }} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.age}>Age: {item.age}</Text>
          <Text style={styles.address}>Address: {item.address}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Friend List</Text>
      <ScrollView>
        {friendData.map((friend) => (
          <View key={friend.id}>{renderFriendItem({ item: friend })}</View>
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
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#AA3FEC",
    borderWidth: 2,
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
    color: "#333",
  },
  age: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    color: "#555",
  },
});
