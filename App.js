import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import Chats from "./Routes/Chats";
import ServerBar from "./Routes/ServerBar";
import UserBar from "./Routes/UserBar";

const { width, height } = Dimensions.get("window");

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToOffsets={[0, width - 50, width * 2 - 50]}
        decelerationRate={"fast"}
      >
        <ServerBar />
        <Chats />
        <UserBar />
      </ScrollView>
      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
