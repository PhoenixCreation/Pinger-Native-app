import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Feather, Entypo, Octicons } from "@expo/vector-icons";
import Chats from "./Routes/Chats";
import ServerBar from "./Routes/ServerBar";
import UserBar from "./Routes/UserBar";
import { theme } from "./theme";

const { width, height } = Dimensions.get("window");

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(1);

  const translateY = useSharedValue(50);

  useEffect(() => {
    if (currentSlide === 0) {
      translateY.value = withTiming(0);
    } else {
      translateY.value = withTiming(50);
    }
  }, [currentSlide]);

  const style = useAnimatedStyle(() => {
    return {
      position: "absolute",
      bottom: 0,
      height: 50,
      width,
      backgroundColor: theme.darkerBackgroundColor,
      zIndex: 100,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingLeft: 30,
      paddingRight: 30,
      translateY: translateY.value,
    };
  });
  return (
    <View style={styles.container}>
      <ServerBar currentSlide={currentSlide} />
      <Chats currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
      <UserBar currentSlide={currentSlide} />

      <Animated.View style={style}>
        <Pressable style={styles.bottomNavOption}>
          <Entypo name="home" size={24} color="white" />
        </Pressable>
        <Pressable style={styles.bottomNavOption}>
          <Entypo name="chat" size={24} color="white" />
        </Pressable>
        <Pressable style={styles.bottomNavOption}>
          <Feather name="search" size={24} color="white" />
        </Pressable>
        <Pressable style={styles.bottomNavOption}>
          <Octicons name="mention" size={24} color="white" />
        </Pressable>
        <Pressable style={styles.bottomNavOption}>
          <Entypo name="user" size={24} color="white" />
        </Pressable>
      </Animated.View>

      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkBackgroundColor,
  },
  bottomNavOption: {
    padding: 10,
  },
});
