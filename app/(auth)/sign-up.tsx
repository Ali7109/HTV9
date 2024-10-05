import {
	View,
	Text,
	ScrollView,
	ImageBackground,
	Dimensions,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import greenBg from "../../assets/images/GreenBg.png";
import CustomButton from "../components/CustomButton";
import { isLoaded } from "expo-font";
import { Link } from "expo-router";

const { width, height } = Dimensions.get("window");

const SignUp = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
	});

	const submit = () => {};

	return (
		<ImageBackground
			source={greenBg}
			style={{
				flex: 1,
				justifyContent: "center",
				width,
				height,
				paddingTop: height * 0.05,
			}}
			resizeMode="cover"
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				className="min-h-[83vh]"
			>
				<ScrollView
					contentContainerStyle={{
						paddingHorizontal: width * 0.05,
						paddingTop: height * 0.05,
						paddingBottom: height * 0.1,
					}}
				>
					<View
						style={{
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: "#4b0082", // darkPurple
							paddingVertical: height * 0.02,
							paddingHorizontal: width * 0.07,
							borderRadius: 20,
						}}
					>
						<Text
							style={{
								fontSize: width * 0.06,
								fontWeight: "600",
								color: "#DDA0DD", // lightPurple
							}}
						>
							Sign Up
						</Text>
					</View>

					<View className="bg-black p-3 mt-10 rounded-2xl">
						<FormField
							title="Username"
							placeholder="Enter a username"
							value={form.username}
							handleChangeText={(e) =>
								setForm({ ...form, username: e })
							}
							otherStyles="mt-10"
						/>
						<FormField
							title="Email"
							placeholder="Enter your email"
							value={form.email}
							handleChangeText={(e) =>
								setForm({ ...form, email: e })
							}
							keyboardType="email-address"
						/>

						<FormField
							title="Password"
							placeholder="********"
							value={form.password}
							handleChangeText={(e) =>
								setForm({ ...form, password: e })
							}
						/>
						<CustomButton
							title={isSubmitting ? "Signing In..." : "Sign In"}
							handlePress={submit}
							containerStyles={"mt-7 mx-4 mb-4"}
							isLoading={isSubmitting}
						/>
						<View className="w-full mt-5 flex-row items-center justify-center text-white">
							<Text className="text-white mr-2 text-center">
								Have an account?
							</Text>
							<Link
								href="/sign-in"
								className="font-bold text-lightPurple"
							>
								Sign In
							</Link>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</ImageBackground>
	);
};

export default SignUp;
