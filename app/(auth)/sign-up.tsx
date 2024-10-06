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
import { Link, useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../controller/FirebaseConfig";

const { width, height } = Dimensions.get("window");

const SignUp = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const auth = FIREBASE_AUTH;
	const router = useRouter();

	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
	});

	const isValidEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const resetForm = () => {
		setForm({
			username: "",
			email: "",
			password: "",
		});
	};

	const submit = async () => {
		setIsSubmitting(true);
		setErrorMessage("");

		// Check if email is valid
		if (!isValidEmail(form.email)) {
			setErrorMessage("Please enter a valid email address.");
			setIsSubmitting(false);
			return;
		}

		try {
			// Firebase sign-up logic
			const response = await createUserWithEmailAndPassword(
				auth,
				form.email,
				form.password
			);
			console.log(response);
			router.push("/Home");

			// Reset form fields after successful submission
			resetForm();
		} catch (error) {
			console.error(error);
			setErrorMessage(error.message); // Display error message if something goes wrong
		} finally {
			setIsSubmitting(false);
		}
	};

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

					{errorMessage ? (
						<Text
							style={{
								color: "red",
								textAlign: "center",
								marginVertical: 10,
							}}
						>
							{errorMessage}
						</Text>
					) : null}

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
							title={
								isSubmitting
									? "Creating Account..."
									: "Create Account"
							}
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
