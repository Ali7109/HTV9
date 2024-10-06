import { View, Text, ImageBackground } from "react-native";
import purpleBg from "../../assets/images/PurpleBg.png";
import React from "react";

const Profile = () => {
	// Sample data for the user
	const userName = "John Doe";
	const userEmail = "john.doe@example.com";
	const numberOfScans = 25; // Example metric
	const userDuration = "6 months"; // Example metric
	const lastScanDate = "2024-10-04"; // Example metric
	const accountStatus = "Active"; // Example metric

	return (
		<ImageBackground
			source={purpleBg}
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
			resizeMode="cover"
		>
			<View className="w-4/5 p-6 bg-background rounded-xl shadow-md">
				<View className="mb-4 text-center">
					<Text className="text-lg font-bold">{userName}</Text>
					<Text className="text-lg text-gray-600">{userEmail}</Text>
				</View>
				<View className="flex flex-row justify-between">
					<View className="flex-1 m-2 p-4 bg-lightPurple rounded-lg shadow">
						<Text className="text-center text-md font-semibold h-16">
							{/* Increased height */}
							Number of Scans
						</Text>
						<Text className="text-center text-md font-bold">
							{numberOfScans}
						</Text>
					</View>
					<View className="flex-1 m-2 p-4 bg-lightPurple rounded-lg shadow">
						<Text className="text-center text-md font-semibold h-16">
							{/* Increased height */}
							User Duration
						</Text>
						<Text className="text-center text-md font-bold">
							{userDuration}
						</Text>
					</View>
				</View>
				<View className="flex flex-row justify-between">
					<View className="flex-1 m-2 p-4 bg-lightPurple rounded-lg shadow">
						<Text className="text-center text-md font-semibold h-16">
							{/* Increased height */}
							Last Scan
						</Text>
						<Text className="text-center text-md font-bold">
							{lastScanDate}
						</Text>
					</View>
					<View className="flex-1 m-2 p-4 bg-lightPurple rounded-lg shadow">
						<Text className="text-center text-md font-semibold h-16">
							{/* Increased height */}
							Account Status
						</Text>
						<Text className="text-center text-md font-bold">
							{accountStatus}
						</Text>
					</View>
				</View>
			</View>
		</ImageBackground>
	);
};

export default Profile;
