import { Text, TouchableOpacity } from "react-native";

type CustomButtonProps = {
	title: string;
	handlePress?: () => void;
	containerStyles?: any;
	textStyles?: any;
	isLoading?: boolean;
};

const CustomButton = ({
	title,
	handlePress,
	containerStyles,
	textStyles,
	isLoading,
}: CustomButtonProps) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.7}
			className={`bg-lightPurple min-h-[62px] justify-center items-center rounded-2xl ${containerStyles} ${
				isLoading ? "opacity-50" : ""
			}`}
			disabled={isLoading}
		>
			<Text className={`text-darkPurple font-bold ${textStyles}`}>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;
