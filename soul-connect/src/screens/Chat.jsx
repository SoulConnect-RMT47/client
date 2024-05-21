import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../config/firebaseDB";
import { useRoute } from "@react-navigation/native";
import { LogBox } from "react-native";

// Suppress specific warning
LogBox.ignoreLogs([
  "Avatar: Support for defaultProps will be removed from function components in a future major release.",
]);

export function Chat({ navigation }) {
  const [messages, setMessages] = useState([]);
  const route = useRoute();

  const { chat, user } = route.params;
  const parsedUser = JSON.parse(user);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "messages", chat.messageID), (doc) => {
      const data = doc.data();
      const formatedData = data.conversations
        .reverse()
        .map((message, index) => ({
          _id: index,
          text: message.text,
          createdAt: message.createdAt.toDate(),
          user: message.user,
        }));

      setMessages(formatedData);
    });
    return () => unsub();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    const { _id, createdAt, text, user } = messages[0];

    if (!_id || !createdAt || !text || !user) {
      console.error("Invalid message data", { _id, createdAt, text, user });
      return;
    }

    const message = doc(db, "messages", chat.messageID);
    updateDoc(message, {
      conversations: arrayUnion({
        text: text,
        createdAt: createdAt,
        user: user,
      }),
    });
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: parsedUser.username,
          name: parsedUser.name,
          avatar: parsedUser.imgUrl,
        }}
        renderUsernameOnMessage={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
