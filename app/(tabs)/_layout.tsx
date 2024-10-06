import { Image, Text, View } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
	faHouse,
	faMagnifyingGlass,
	faPerson,
	faSearch,
} from "@fortawesome/free-solid-svg-icons";
// TabIcon type
type TabIconProps = {
	icon: any;
	color: string;
	name: string;
	focused: boolean;
};

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
	return <View>{icon}</View>;
};

const lightPurple = "#D0BCFF";
const darkPurple = "#65558F";

const TabsLayout = () => {
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarInactiveTintColor: "#A3A393",
					tabBarShowLabel: false,
					tabBarIconStyle: {
						width: 30,
						height: 30,
						color: "#A3A393",
					},
					tabBarStyle: {
						backgroundColor: "#000000",
						borderTopColor: "#000000",
					},
				}}
			>
				<Tabs.Screen
					name="Home"
					options={{
						title: "Home",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={
									<FontAwesomeIcon
										color={`${
											focused ? darkPurple : lightPurple
										}`}
										size={30}
										icon={faHouse}
									/>
								}
								color={color}
								name="Home"
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="Scanner"
					options={{
						title: "Scanner",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={
									<FontAwesomeIcon
										color={`${
											focused ? darkPurple : lightPurple
										}`}
										size={30}
										icon={faMagnifyingGlass}
									/>
								}
								color={color}
								name="Scanner"
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="Profile"
					options={{
						title: "Profile",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={
									<FontAwesomeIcon
										color={`${
											focused ? darkPurple : lightPurple
										}`}
										size={30}
										icon={faPerson}
									/>
								}
								color={color}
								name="Profile"
								focused={focused}
							/>
						),
					}}
				/>
			</Tabs>
		</>
	);
};

export default TabsLayout;
