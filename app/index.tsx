import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	ImageBackground,
} from "react-native";
import React from "react";
import { Link, Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "./components/CustomButton";
import greenBg from "../assets/images/GreenBg.png";

export default function App() {
	return (
		<SafeAreaView className="h-full">
			<ImageBackground
				source={greenBg}
				style={{ flex: 1, justifyContent: "center" }}
				resizeMode="cover"
			>
				<ScrollView contentContainerStyle={{ height: "100%" }}>
					<View className="flex-1 items-center justify-center h-[85vh]">
						<Text className="text-3xl font-brownieStencil">
							BinBuddy
						</Text>
						<StatusBar style="auto" />
						<CustomButton
							title="Continue to Sign In"
							handlePress={() => router.push("sign-in")}
							containerStyles="w-2/3 mt-7"
						/>
					</View>
				</ScrollView>
				<StatusBar backgroundColor="#161622" style="light" />
			</ImageBackground>
		</SafeAreaView>
	);
}
