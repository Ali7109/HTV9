import {
	View,
	Text,
	TouchableOpacity,
	Button,
	PixelRatio,
	Image,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { captureScreen } from "react-native-view-shot";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "expo-router";
import { PhotoObj } from "../types/ScannerTypes";
import Anaylzer from "../components/Anaylzer";

const targetPixelCount = 1080;
const pixelRation = PixelRatio.get();
const pixels = targetPixelCount / pixelRation;

const Scanner = () => {
	const cameraRef = useRef<any>();
	const [photo, setPhoto] = useState<PhotoObj | null>(null);
	const [facing, setFacing] = useState<CameraType>("back");
	const [hadPermission, setHasPermission] = useCameraPermissions();
	const [readyToAnalyse, setReadyToAnalyse] = useState(false);

	const takePicture = async () => {
		if (!cameraRef) return;
		const photo = await cameraRef.current.takePictureAsync({
			quality: 1,
			skipProcessing: true,
			width: pixels,
			height: pixels,
		});
		setPhoto(photo);
	};

	if (!hadPermission) {
		return (
			<View>
				<Text>No access to camera</Text>
			</View>
		);
	}

	if (!hadPermission.granted) {
		return (
			<View>
				<Text>We need your permission to show the camera</Text>
				<Button onPress={setHasPermission} title="Grant permission" />
			</View>
		);
	}

	function toggleCameraFacing() {
		setFacing((current) => (current === "back" ? "front" : "back"));
	}

	return (
		<View>
			{!photo ? (
				<CameraView
					style={{ width: "100%", height: "100%" }}
					facing={facing}
					ref={cameraRef}
				>
					<View className="flex flex-row absolute bottom-0 items-center justify-evenly w-full">
						<TouchableOpacity
							className=" h-14 m-5 w-1/3 text-center bg-white rounded-2xl justify-center"
							onPress={toggleCameraFacing}
						>
							<Text className="text-center font-serif">
								Flip me!
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							className=" w-1/2 h-14 m-5 text-center bg-green-300 rounded-2xl justify-center"
							onPress={takePicture}
						>
							<Text className="text-center font-serif">
								Take Picture
							</Text>
						</TouchableOpacity>
					</View>
				</CameraView>
			) : !readyToAnalyse ? (
				<View className="h-full w-full flex flex-col">
					<Text className="m-auto">
						(Make sure the item is visible for your bin buddy!)
					</Text>
					<Image
						className="h-1/2 w-1/2 m-auto border-solid border-2 border-black rounded-2xl"
						source={{ uri: photo.uri }}
						style={{ width: 350, height: 400 }}
					/>
					<View className="flex flex-row items-center mb-10">
						<TouchableOpacity
							onPress={() => setPhoto(null)}
							className="m-auto"
						>
							<View className="text-center flex flex-row font-serif bg-red-300 p-5 rounded-2xl">
								<FontAwesomeIcon icon={faTrash} />
								<Text>Retake</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => setReadyToAnalyse(true)}
							className="m-auto w-1/2  bg-white p-5 rounded-2xl"
						>
							<Text className="text-center font-serif">
								Analyze
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			) : (
				<View>
					<Anaylzer photo={photo} />
				</View>
			)}
		</View>
	);
};

export default Scanner;
