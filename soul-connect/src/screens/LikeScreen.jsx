import React from "react";
import { View, FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import CardLike from "../components/CardLike";
import { users as usersArray } from "../../dummy/utils/data";

export default function LikeScreen() {
  // Mengelompokkan data pengguna ke dalam array 2D (2 kartu per baris)
  const groupedUsers = [];
  const chunkSize = 2;
  for (let i = 0; i < usersArray.length; i += chunkSize) {
    groupedUsers.push(usersArray.slice(i, i + chunkSize));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
      <Text style={{fontSize:20 }} >Likes {usersArray.length}</Text>
      </View>
      <FlatList
        data={groupedUsers}
        renderItem={({ item }) => (
          <View style={styles.rowContainer}>
            {item.map((user) => (
              <CardLike
                key={user.id}
                title={user.name}
                description={user.location}
                imageUrl={user.image}
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
  subContainer:{
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
