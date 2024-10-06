import {
	View,
	Text,
	TouchableOpacity,
	Button,
	PixelRatio,
	Image,
	ImageBackground,
} from "react-native";
import React, { useState, useRef } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "@tensorflow/tfjs-react-native"; // Import the TensorFlow.js React Native library
import { decodeJpeg } from "@tensorflow/tfjs-react-native"; // Decode images to tensors
import purpleBg from "../../assets/images/PurpleBg.png";

const targetPixelCount = 1080;
const pixelRation = PixelRatio.get();
const pixels = targetPixelCount / pixelRation;

type PhotoObj = {
	uri: string;
	width: number;
	height: number;
};

const Scanner = () => {
	const cameraRef = useRef<any>();
	const [photo, setPhoto] = useState<PhotoObj | null>(null);
	const [facing, setFacing] = useState<CameraType>("back");
	const [hadPermission, setHasPermission] = useCameraPermissions();
	const [readyToAnalyse, setReadyToAnalyse] = useState(false);
	const [result, setResult] = useState<string | null>(null);
	const [model, setModel] = useState(null);
	const [loading, setLoading] = useState(false);

	const trashClassificationMap = {
		bottle: "trash",
		"glass bottle": "recyclable",
		paper: "recyclable",
		"banana peel": "biodegradable",
		"food waste": "biodegradable",
		person: "biodegradable",
		can: "recyclable",
		styrofoam: "trash",
		"plastic bag": "trash",
		unknown: "trash", // Default case for unknown items
	};

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

	const loadModel = async () => {
		try {
			const model = await cocossd.load();
			setModel(model);
			console.log("Model loaded successfully");
		} catch (error) {
			console.log("Error loading model:", error);
		}
	};

	const analyzeImage = async (uri: string) => {
		if (!model) {
			console.log("Model is not loaded yet.");
			return;
		}
		setLoading(true);
		try {
			const response = await fetch(uri);
			const imageData = await response.arrayBuffer(); // Directly use arrayBuffer
			const imageTensor = decodeJpeg(new Uint8Array(imageData)); // Decode JPEG image to a tensor

			const predictions = await model.detect(imageTensor); // Run the model detection

			if (predictions.length > 0) {
				const topPrediction = predictions[0];
				if (topPrediction.score > 0.5) {
					// Set a confidence threshold
					const detectedClass = topPrediction.class || "unknown";
					const category =
						trashClassificationMap[detectedClass] || "unknown";
					setResult(
						`Detected Item: ${detectedClass}, Category: ${category}`
					);
				} else {
					setResult(
						"Uncertain: " + (topPrediction.class || "Unknown")
					);
				}
			} else {
				setResult("Unknown");
			}

			imageTensor.dispose(); // Clean up tensor to free memory
			setLoading(false);
		} catch (error) {
			console.log("Error analyzing image:", error);
			setResult("Error analyzing image");
		}
	};

	React.useEffect(() => {
		loadModel();
	}, []);

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
		<View className="h-full">
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
							className=" w-1/2 h-14 m-5 text-center bg-lightPurple rounded-2xl justify-center"
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
							<View className="text-center flex flex-row font-serif bg-darkPurple space-x-2 p-5 rounded-2xl">
								<FontAwesomeIcon icon={faTrash} />
								<Text>Retake</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								setReadyToAnalyse(true);
								analyzeImage(photo.uri);
							}}
							className="m-auto w-1/2  bg-lightPurple p-5 rounded-2xl"
						>
							<Text className="text-center font-serif">
								Analyze
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			) : (
				<ImageBackground
					source={purpleBg}
					style={{
						flex: 1,
						justifyContent: "center",
						marginTop: -60,
					}}
					resizeMode="cover"
				>
					{/* <Text>{result}</Text> */}
					<View className="bg-background rounded-2xl m-auto p-5">
						{loading ? (
							<Text>Loading...</Text>
						) : (
							<Text>{result}</Text>
						)}
					</View>
				</ImageBackground>
			)}
		</View>
	);
};

export default Scanner;
