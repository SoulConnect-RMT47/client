import {
  Text,
  View,
  Dimensions,
  Animated,
  PanResponder,
  Alert,
  ImageBackground, // tambahkan impor ini
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useRef, useState } from "react";
import Card from "../components/home/Card";
import Footer from "../components/home/Footer";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import bg from "../bg.png"; // tambahkan impor ini

const { width, height } = Dimensions.get("screen");

export default function HomeScreen({ navigation }) {
  const swipe = useRef(new Animated.ValueXY()).current;
  const titlSign = useRef(new Animated.Value(1)).current;
  const [input, setInput] = useState([]); // State to store data from API

  useEffect(() => {
    const getAllUser = async () => {
      try {
        const token = await SecureStore.getItemAsync("access_token");
        if (!token) throw new Error("No access token found");

        const user = await SecureStore.getItemAsync("user");
        if (!user) throw new Error("No user data found");

        const { data } = await axios({
          method: "GET",
          url: `https://soulconnect-server.habibmufti.online/users`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setInput(data); // Set data from API to state input
      } catch (error) {
        console.log(error.message || error.response?.data);
      }
    };

    getAllUser();
  }, []); // Calling the API only once when the component mounts

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,

    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy });
      titlSign.setValue(y0 > (height * 0.9) / 2 ? 1 : -1);
    },

    onPanResponderRelease: (_, { dx, dy }) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > 100;

      if (isActionActive) {
        Animated.timing(swipe, {
          duration: 100,
          toValue: {
            x: direction * 500,
            y: dy,
          },
          useNativeDriver: true,
        }).start(() => removeTopCard(direction));
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const removeTopCard = useCallback(
    async (direction) => {
      const user = input[0];
      const token = await SecureStore.getItemAsync("access_token");

      try {
        const response = await axios({
          method: "POST",
          url: `https://soulconnect-server.habibmufti.online/swipe/${user._id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            swipeStatus: direction === 1 ? "accepted" : "rejected",
          },
        });
        // console.log(input.length);
        Alert.alert("Swipe", response.data.message);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }

      setInput((prevState) => prevState.slice(1));
      swipe.setValue({ x: 0, y: 0 });
    },
    [input]
  );

  const handleChoice = useCallback(
    (direction) => {
      Animated.timing(swipe.x, {
        toValue: direction * 500,
        duration: 400,
        useNativeDriver: true,
      }).start(() => removeTopCard(direction));
    },
    [removeTopCard, swipe.x]
  );

  return (
    <ImageBackground
      source={bg}
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <StatusBar hidden={false} />
      {input.length < 1 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            That is all users for now,{"\n"}go check your likes and chat 🙂
          </Text>
        </View>
      ) : (
        input
          .map((user, index) => {
            const isFirst = index === 0;
            const dragHandlers = isFirst ? panResponder.panHandlers : {};
            return (
              <Card
                key={index}
                input={input}
                name={user.name}
                location={user.location}
                gender={user.gender}
                age={user.age}
                image={
                  user.imgUrl ||
                  "https://i.pinimg.com/236x/9f/b9/df/9fb9df6a24efdc70911dc5b6ec12bc9a.jpg"
                } // Ensure image is set correctly
                isFirst={isFirst}
                swipe={swipe}
                titlSign={titlSign}
                {...dragHandlers}
              />
            );
          })
          .reverse()
      )}
      {input.length < 1 ? null : <Footer handleChoice={handleChoice} />}
    </ImageBackground>
  );
}
