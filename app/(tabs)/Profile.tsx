import { View, Text, ImageBackground } from "react-native";
import purpleBg from "../../assets/images/PurpleBg.png";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import {
	FIREBASE_AUTH,
	FIREBASE_FIRESTORE,
} from "../controller/FirebaseConfig";
import {
	collection,
	getDocs,
	query,
	Timestamp,
	where,
} from "firebase/firestore"; // Firestore imports

const Profile = () => {
	const [user, setUser] = useState<User | null>(null);
	const [userActivity, setUserActivity] = useState({
		numberOfScans: 0,
		userDuration: "",
		lastScanDate: "",
		accountStatus: "",
	});

	// Function to format Firestore Timestamp to a readable date
	const formatDate = (timestamp: Timestamp) => {
		if (timestamp && timestamp.toDate) {
			const date = timestamp.toDate(); // Convert Firestore Timestamp to JS Date
			return date.toDateString(); // Format date as needed (you can customize this)
		}
		return "N/A"; // Default if no valid date
	};

	useEffect(() => {
		// Listen for user auth state changes
		onAuthStateChanged(FIREBASE_AUTH, async (user) => {
			if (user) {
				setUser(user);
				const userEmail = user.email;
				console.log("User email: ", userEmail);

				// Fetch user activity data from Firestore
				try {
					const activityQuery = query(
						collection(FIREBASE_FIRESTORE, "activity"),
						where("email", "==", userEmail)
					);
					const querySnapshot = await getDocs(activityQuery);
					if (!querySnapshot.empty) {
						querySnapshot.forEach((doc) => {
							const activityData = doc.data();
							setUserActivity({
								numberOfScans: activityData.scans || 0,
								userDuration: "6 months",
								lastScanDate: formatDate(activityData.lastscan), // Format the timestamp
								accountStatus: activityData.status
									? "Active"
									: "Inactive",
							});
						});
					} else {
						console.log("No activity data found for this user.");
					}
				} catch (error) {
					console.error("Error fetching activity data: ", error);
				}
			} else {
				setUser(null);
			}
		});
	}, []);

	return (
		<ImageBackground
			source={purpleBg}
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
			resizeMode="cover"
		>
			<View className="w-4/5 p-6 bg-background rounded-xl shadow-md">
				<View className="mb-4 text-center">
					<Text className="text-lg font-bold">
						{user?.displayName || "User"}
					</Text>
					<Text className="text-lg text-gray-600">
						{user?.email || "Email not found"}
					</Text>
				</View>
				<View className="flex flex-row justify-between">
					<View className="flex-1 m-2 p-4 bg-lightPurple rounded-lg shadow">
						<Text className="text-center text-md font-semibold h-16">
							Number of Scans
						</Text>
						<Text className="text-center text-md font-bold">
							{userActivity.numberOfScans}
						</Text>
					</View>
					<View className="flex-1 m-2 p-4 bg-lightPurple rounded-lg shadow">
						<Text className="text-center text-md font-semibold h-16">
							User Duration
						</Text>
						<Text className="text-center text-md font-bold">
							{userActivity.userDuration}
						</Text>
					</View>
				</View>
				<View className="flex flex-row justify-between">
					<View className="flex-1 m-2 p-4 bg-lightPurple rounded-lg shadow">
						<Text className="text-center text-md font-semibold h-16">
							Last Scan
						</Text>
						<Text className="text-center text-md font-bold">
							{userActivity.lastScanDate}
						</Text>
					</View>
					<View className="flex-1 m-2 p-4 bg-lightPurple rounded-lg shadow">
						<Text className="text-center text-md font-semibold h-16">
							Account Status
						</Text>
						<Text className="text-center text-md font-bold">
							{userActivity.accountStatus}
						</Text>
					</View>
				</View>
			</View>
		</ImageBackground>
	);
};

export default Profile;
