import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	ImageBackground,
	Image,
} from "react-native";
import React, { useEffect } from "react";
import { Link, Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "./components/CustomButton";
import greenBg from "../assets/images/GreenBg.png";
import logo from "../assets/images/Logo.png"; // Import the logo image

import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";

const initTensorFlow = async () => {
	await tf.ready();
	console.log("TensorFlow is ready.");
};
export default function App() {
	// Use useEffect to initialize TensorFlow
	useEffect(() => {
		const initialize = async () => {
			await initTensorFlow(); // Initialize TensorFlow
		};
		initialize();
	}, []); // Empty dependency array ensures this runs only once when the component mounts

	return (
		<SafeAreaView className="h-[900px]">
			<ImageBackground
				source={greenBg}
				style={{
					flex: 1,
					justifyContent: "center",
					marginTop: -60,
				}}
				resizeMode="cover"
			>
				<ScrollView
					contentContainerStyle={{ height: "100%", display: "flex" }}
				>
					<View className="m-auto h-200 space-y-5 items-center justify-center">
						<Image
							source={logo} // Correct prop for the image source
							style={{ height: 100, width: 100 }} // Use style instead of className for styling in React Native
						/>
						<Text className=" text-4xl font-brownieStencil">
							BinBuddy
						</Text>
						<StatusBar style="auto" />
						<CustomButton
							title="Continue to Sign In"
							handlePress={() => router.push("/sign-in")}
							containerStyles="w-2/3 mt-7 p-2"
						/>
					</View>
				</ScrollView>
				<StatusBar backgroundColor="#161622" style="light" />
			</ImageBackground>
		</SafeAreaView>
	);
}
