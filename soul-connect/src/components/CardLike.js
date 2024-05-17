import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const CardLike = ({ title, description, imageUrl }) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity>
        <Image source={imageUrl} style={styles.image} />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={styles.gradient}
        />
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "46%",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 8,
    height: 250,
    marginRight: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  textContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: "#fff",
  },
});

export default CardLike;
