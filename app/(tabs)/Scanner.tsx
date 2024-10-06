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
import { trashClassificationMap } from "../helper/TFConversion";
import rcImg from "../../assets/images/RCA.png";
import owImg from "../../assets/images/OWA.png";
import hwImg from "../../assets/images/HWA.png";
import { onAuthStateChanged, User } from "firebase/auth";
import {
	FIREBASE_AUTH,
	FIREBASE_FIRESTORE,
} from "../controller/FirebaseConfig";
import {
	collection,
	doc,
	getDocs,
	increment,
	query,
	serverTimestamp,
	updateDoc,
	where,
} from "firebase/firestore";

const targetPixelCount = 1080;
const pixelRation = PixelRatio.get();
const pixels = targetPixelCount / pixelRation;

type PhotoObj = {
	uri: string;
	width: number;
	height: number;
};

type ResultType = {
	detectedItem: string;
	category: string;
};

const Scanner = () => {
	const cameraRef = useRef<any>();
	const [photo, setPhoto] = useState<PhotoObj | null>(null);
	const [facing, setFacing] = useState<CameraType>("back");
	const [hadPermission, setHasPermission] = useCameraPermissions();
	const [readyToAnalyse, setReadyToAnalyse] = useState(false);
	const [result, setResult] = useState<ResultType | null>(null); // Updated state to hold both detectedItem and category
	const [model, setModel] = useState<cocossd.ObjectDetection | null>(null);
	const [loading, setLoading] = useState(false);

	const [user, setUser] = useState<User | null>(null);
	// Firestore update function
	const updateUserScanCount = async (userEmail: string) => {
		try {
			const activityQuery = query(
				collection(FIREBASE_FIRESTORE, "activity"),
				where("email", "==", userEmail) // Assuming the "email" field is in the documents
			);

			// Get the query results
			const querySnapshot = await getDocs(activityQuery);

			// If a document is found, increment the scans field
			querySnapshot.forEach(async (docSnapshot) => {
				// Reference to the document
				const userDocRef = doc(
					FIREBASE_FIRESTORE,
					"activity",
					docSnapshot.id
				);

				// Increment the "scans" field by 1
				// Update the "lastscan" field with the current time as a timestamp
				await updateDoc(userDocRef, {
					scans: increment(1),
					lastscan: serverTimestamp(),
				});

				console.log("Scans field incremented for user:", userEmail);
			});
		} catch (error) {
			console.error("Error incrementing scans:", error);
		}
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
					let detectedClass = topPrediction.class || "unknown";

					// Normalize the detected class by removing extra spaces, apostrophes, and making it lowercase
					detectedClass = detectedClass
						.toLowerCase()
						.replace(/['\s]/g, ""); // Remove spaces and apostrophes

					// Type guard to check if detectedClass is a key in trashClassificationMap
					let category: string = "unknown";
					for (const key in trashClassificationMap) {
						const normalizedKey = key
							.toLowerCase()
							.replace(/['\s]/g, "");
						if (
							normalizedKey.includes(detectedClass) ||
							detectedClass.includes(normalizedKey)
						) {
							category =
								trashClassificationMap[
									key as keyof typeof trashClassificationMap
								];
							break;
						}
					}

					// Update the result state with both detectedItem and category
					setResult({
						detectedItem: topPrediction.class || "Unknown",
						category: category,
					});
				} else {
					setResult({
						detectedItem: topPrediction.class || "Unknown",
						category: "Uncertain",
					});
				}
			}
			// Update scan count for the current user
			if (user?.email) {
				await updateUserScanCount(user.email);
			}
			imageTensor.dispose(); // Clean up tensor to free memory
			setLoading(false);
		} catch (error) {
			console.log("Error analyzing image:", error);
			setResult({
				detectedItem: "Error",
				category: "Error analyzing image",
			});
		}
	};

	React.useEffect(() => {
		loadModel();
		onAuthStateChanged(FIREBASE_AUTH, (user) => {
			setUser(user);
		});
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
					<View className="bg-white rounded-2xl m-auto p-5 w-2/3 h-1/3">
						{loading ? (
							<Text className="text-lg m-auto rounded-full">
								Loading...
							</Text>
						) : (
							<>
								<View className=" relative  p-2 rounded-2xl">
									<View className=" absolute -top-10 -left-10 rounded-2xl bg-lightPurple p-2">
										<Text className="text-lg font-semibold">
											Detected Item
										</Text>
									</View>
									<Text className="text-lg text-center mt-6">
										{result
											? result.detectedItem.toUpperCase()
											: "Uncertain"}
									</Text>
								</View>
								<View className=" relative mt-20  p-2 rounded-2xl">
									<View className=" absolute -top-10 -left-10 rounded-2xl bg-lightPurple p-2">
										<Text className="text-lg font-semibold">
											Category
										</Text>
									</View>
									<Text className="text-lg text-center mt-6">
										{result
											? result.category.toUpperCase()
											: "Uncertain"}
									</Text>
									<View className="w-52 h-52 ">
										<Image
											source={
												result?.category ===
												"recyclable"
													? rcImg
													: result?.category ===
													  "organic"
													? owImg
													: hwImg
											}
											className="m-auto absolute h-52 w-52 rounded-full border-8 border-lightPurple"
										/>
									</View>
								</View>
								<View className="bg-darkPurple border-2 border-lightPurple mt-10 w-full rounded-2xl">
									<TouchableOpacity
										onPress={() => {
											setPhoto(null);
											setReadyToAnalyse(false);
										}}
										className=" p-2"
									>
										<Text className="text-center  text-white">
											Try Again
										</Text>
									</TouchableOpacity>
								</View>
							</>
						)}
					</View>
				</ImageBackground>
			)}
		</View>
	);
};

export default Scanner;
