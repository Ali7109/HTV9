// import * as tf from "@tensorflow/tfjs"; // TensorFlow.js
// import jpeg from "jpeg-js"; // Decodes JPEG image data
// import { Image } from "react-native";

// // This function takes in the image URI, fetches the image, and converts it to a tensor
// async function imageToTensor(imageUri: string) {
// 	try {
// 		// Step 1: Fetch image data from the URI
// 		const response = await fetch(imageUri, {}, { isBinary: true }); // isBinary option is important to get raw image data
// 		const rawImageData = await response.arrayBuffer(); // Get raw binary data

// 		// Step 2: Decode the JPEG data using jpeg-js
// 		const TO_UINT8ARRAY = true;
// 		const { width, height, data } = jpeg.decode(
// 			rawImageData,
// 			TO_UINT8ARRAY
// 		);

// 		// Step 3: Prepare a buffer for RGB values (ignoring alpha channel)
// 		const buffer = new Uint8Array(width * height * 3); // Only RGB, no alpha
// 		let offset = 0; // Offset into original data (includes alpha)

// 		for (let i = 0; i < buffer.length; i += 3) {
// 			buffer[i] = data[offset]; // Red
// 			buffer[i + 1] = data[offset + 1]; // Green
// 			buffer[i + 2] = data[offset + 2]; // Blue

// 			offset += 4; // Skip alpha channel
// 		}

// 		// Step 4: Convert the buffer to a TensorFlow tensor
// 		const imageTensor = tf.tensor3d(buffer, [height, width, 3]);

// 		return imageTensor; // Return the tensor for further processing
// 	} catch (error) {
// 		console.error("Error converting image to tensor:", error);
// 		return null;
// 	}
// }
