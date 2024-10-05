import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

type FormFieldProps = {
	title: string;
	value: string;
	placeholder: string;
	handleChangeText: (text: string) => void;
	otherStyles?: string;
	keyboardType?: string;
};

const FormField = ({
	title,
	value,
	placeholder,
	handleChangeText,
	otherStyles,
	...props
}: FormFieldProps) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<View className={`mt-5 p-2 ${otherStyles}`}>
			<View className="bg-lightPurple w-1/3 rounded-t-2xl p-2">
				<Text className="text-base text-black bg-lightPurple rounded-t-2xl">
					{title}
				</Text>
			</View>
			<View className="w-full h-16 px-4 bg-darkPurple rounded-2xl rounded-tl-none flex-row items-center focus:border-2 focus:border-accent">
				<TextInput
					className="flex flex-1 text-white font-semibold text-base"
					value={value}
					onChangeText={handleChangeText} // Bind this to handle changes
					placeholder={placeholder}
					placeholderTextColor={"#a3a393"}
					secureTextEntry={title === "Password" && !showPassword}
					keyboardType={props.keyboardType || "default"}
				/>
				{title === "Password" && (
					<TouchableOpacity
						className="h-12 w-12 flex items-center justify-center"
						onPress={() => setShowPassword(!showPassword)}
					>
						<Text className="text-white font-semibold text-base">
							{showPassword ? (
								<FontAwesomeIcon
									style={{ color: "white" }}
									icon={faEyeSlash}
								/>
							) : (
								<FontAwesomeIcon
									style={{ color: "white" }}
									icon={faEye}
								/>
							)}
						</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default FormField;
