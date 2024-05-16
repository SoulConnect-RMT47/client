import { Button, Text, TouchableOpacity } from "react-native";

export default function ProfileScreen({ navigation }) {
  return (
    <>
      <Text>Hay ini di ProfileScreen</Text>
      <TouchableOpacity>
        <Text
          onPress={() => {
            navigation.navigate("EditScreen");
          }}
        >
          Edit Profile
        </Text>
      </TouchableOpacity>
    </>
  );
}
