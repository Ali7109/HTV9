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
import { Link, useRouter } from "expo-router";
import { FIREBASE_AUTH } from "../controller/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const { width, height } = Dimensions.get("window");

const SignIn = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const auth = FIREBASE_AUTH;

	const submit = async () => {
		setIsSubmitting(true);
		try {
			const response = await signInWithEmailAndPassword(
				auth,
				form.email,
				form.password
			);
			console.log(response);
			router.push("/Home");
		} catch (error) {
			alert("Invalid email or password");
		} finally {
			setIsSubmitting(false);
		}
		// setTimeout(() => {
		// 	setIsSubmitting(false);
		// 	router.push("/Home");
		// });
	};

	return (
		<ImageBackground
			source={greenBg}
			style={{
				justifyContent: "center",
				width,
				height,
				flex: 1,
				paddingTop: height * 0.05,
			}}
			resizeMode="cover"
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
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
							Log in to your account
						</Text>
					</View>

					<View className="bg-black p-3 mt-10 rounded-2xl">
						<FormField
							title="Email"
							placeholder="Enter your email"
							value={form.email}
							handleChangeText={(e) =>
								setForm({ ...form, email: e })
							}
							otherStyles={{ marginTop: height * 0.03 }}
							keyboardType="email-address"
						/>

						<FormField
							title="Password"
							placeholder="********"
							value={form.password}
							handleChangeText={(e) =>
								setForm({ ...form, password: e })
							}
							otherStyles={{ marginTop: height * 0.03 }}
							secureTextEntry
						/>
						<CustomButton
							title={isSubmitting ? "Signing In..." : "Sign In"}
							handlePress={submit}
							containerStyles={"mt-7 mx-4 mb-4"}
							isLoading={isSubmitting}
						/>
						<View className="w-full mt-5 flex-row items-center justify-center text-white">
							<Text className="text-white mr-2 text-center">
								Don't have an account?
							</Text>
							<Link
								href="/sign-up"
								className="font-bold text-lightPurple"
							>
								Sign Up
							</Link>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</ImageBackground>
	);
};

export default SignIn;
