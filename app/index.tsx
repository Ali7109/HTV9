import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Link } from "expo-router";
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

const initTensorFlow = async () => {
  await tf.ready();
  console.log("TensorFlow is ready.");
};

export default function App() {
  // Use useEffect to initialize TensorFlow
  useEffect(() => {
    const initialize = async () => {
      await initTensorFlow();
    };
    initialize();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-brownieStencil">BinBuddy</Text>
      <Link href="/Home" style={{ color: "blue" }}>
        Bin Time
      </Link>
    </View>
  );
}
