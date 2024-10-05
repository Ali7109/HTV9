import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

const AuthLayout = () => {
	return (
		<>
			<Stack>
				<Stack.Screen name="sign-in" options={{ headerShown: false }} />
				<Stack.Screen name="sign-up" options={{ headerShown: false }} />
			</Stack>
			<StatusBar backgroundColor="#2E6F40" style="dark" />
		</>
	);
};

export default AuthLayout;
