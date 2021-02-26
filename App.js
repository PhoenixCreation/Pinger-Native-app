import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import Chats from "./Routes/Chats";
import ServerBar from "./Routes/ServerBar";
import UserBar from "./Routes/UserBar";

const { width, height } = Dimensions.get("window");

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(1);
  return (
    <View style={styles.container}>
      <ServerBar currentSlide={currentSlide} />
      <Chats currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
      <UserBar currentSlide={currentSlide} />
      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#555",
  },
});
