import { Text, View } from "react-native";
import { PhotoObj } from "../types/ScannerTypes";

type AnaylzerProps = {
	photo: PhotoObj;
};

const Anaylzer = ({ photo }: AnaylzerProps) => {
	return (
		<View>
			<Text>{photo.uri}</Text>
		</View>
	);
};

export default Anaylzer;
