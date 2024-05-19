import {
  Text,
  View,
  Dimensions,
  Image,
  PanResponder,
  Animated,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useRef, useState } from "react";
import Card from "../components/home/Card";
import Footer from "../components/home/Footer";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

const { width, height } = Dimensions.get("screen");

export default function HomeScreen({ navigation }) {
  const swipe = useRef(new Animated.ValueXY()).current;
  const titlSign = useRef(new Animated.Value(1)).current;
  const [input, setInput] = useState([]); // State untuk menyimpan data dari API
  const [initialData, setInitialData] = useState([]); // State untuk menyimpan data awal

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

        setInput(data); // Set data dari API ke state input
        setInitialData(data); // Simpan data awal ke state initialData
      } catch (error) {
        console.log(error.message || error.response?.data);
      }
    };

    getAllUser();
  }, []); // Memanggil API hanya sekali saat komponen mount

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

  const removeTopCard = useCallback(async (direction) => {
    const user = input[0];
    const token = await SecureStore.getItemAsync("access_token");
    // console.log(input, "input");
    // console.log(user._id, "input[0]");

    try {
      await axios({
        method: "POST",
        url: `https://soulconnect-server.habibmufti.online/users/swipe/${user._id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          swipeStatus: direction === 1 ? "accepted" : "rejected",
        },
      });
      // console.log("success");
    } catch (error) {
      console.log(error.response.data);
      // console.log(error.message || error.response?.data);
    }

    setInput((prevState) => {
      const newState = prevState.slice(1);
      if (newState.length === 0) {
        return initialData; // Set ulang ke data awal ketika kartu habis
      }
      return newState;
    });
    swipe.setValue({ x: 0, y: 0 });
  }, [input, initialData]);

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
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <StatusBar hidden={false} />
      {input
        .map((user, index) => {
          const isFirst = index === 0;
          const dragHandlers = isFirst ? panResponder.panHandlers : {};
          return (
            <Card
              key={index}
              name={user.name}
              location={user.location}
              gender={user.gender}
              age={user.age}
              image={user?.imgUrl || "https://i.pinimg.com/236x/9f/b9/df/9fb9df6a24efdc70911dc5b6ec12bc9a.jpg"} // Ensure image is set correctly
              isFirst={isFirst}
              swipe={swipe}
              titlSign={titlSign}
              {...dragHandlers}
            />
          );
        })
        .reverse()}
      <Footer handleChoice={handleChoice} />
    </View>
  );
}
