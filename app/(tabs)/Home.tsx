import {
	View,
	Text,
	ImageBackground,
	Image,
	TouchableOpacity,
	Linking,
} from "react-native";
import React from "react";
import greenBg from "../../assets/images/GreenBg.png"; // Correct path for the background image
import logo from "../../assets/images/Logo.png"; // Add the logo import
import { Link } from "expo-router";

const Home = () => {
	// Function to open external link
	const openWasteWizard = () => {
		Linking.openURL(
			"https://www.toronto.ca/services-payments/recycling-organics-garbage/waste-wizard/"
		);
	};

	return (
		<View className="flex h-full">
			<ImageBackground
				source={greenBg}
				style={{
					flex: 1,
					justifyContent: "center",
					marginTop: -60,
				}}
				resizeMode="cover"
			>
				<View className="m-auto flex-col items-center bg-background w-2/3 p-4 rounded-2xl space-y-5">
					{/* App Logo */}
					<Image
						source={logo}
						style={{ height: 80, width: 80, marginBottom: 10 }}
					/>

					{/* Title */}
					<Text className="font-semibold text-2xl text-lightPurple">
						Welcome to BinBuddy!
					</Text>

					{/* Description */}
					<Text className="text-base text-center text-gray-500">
						Your smart assistant for sorting waste. BinBuddy helps
						you identify and dispose of waste properly using
						Tensorflow-powered technology!
					</Text>

					{/* Call-to-Action Buttons */}
					<View className="bg-darkPurple py-6 px-8 rounded-2xl mt-13">
						<Link href="/Scanner" className=" text-background ">
							Get Started
						</Link>
					</View>

					<TouchableOpacity
						onPress={openWasteWizard} // Link to Waste Wizard
						style={{
							borderColor: "#4b0082",
							borderWidth: 2,
							paddingVertical: 12,
							paddingHorizontal: 20,
							borderRadius: 10,
							marginTop: 10,
						}}
					>
						<Text className="text-darkPurple text-lg">
							Learn More
						</Text>
					</TouchableOpacity>
				</View>

				{/* Footer */}
				<View className="absolute bottom-10 w-full flex items-center">
					<Text className="text-xs text-gray-400">
						Help the planet, one sort at a time!
					</Text>
				</View>
			</ImageBackground>
		</View>
	);
};

export default Home;
