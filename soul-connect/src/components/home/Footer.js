import { View, Text } from "react-native";
import React from "react";
import Button from "./Button";

const COLORS = {
	like: "#00eda6",
	nope: "#ff006f",
	star: "#07A6FF",
};

const Footer = ({handleChoice}) => {
	return (
		<View
			style={{
				position: "absolute",
				bottom: 90,
				width: 260,
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				zIndex: -999,
			}}
		>
			<Button name="times" size={35} color={COLORS.nope} onPress={() => handleChoice(-1)} />
			<Button name="heart" size={30} color={COLORS.like} onPress={() => handleChoice(1)} />
		</View>
	);
};

export default Footer;
