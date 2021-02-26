import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";
import { PanGestureHandler, ScrollView } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { useVector } from "react-native-redash";
import { Feather, Entypo } from "@expo/vector-icons";
import { theme } from "../theme";

var array = new Array(50).fill(0);

const { width, height } = Dimensions.get("window");

const Chats = ({ currentSlide, setCurrentSlide }) => {
  const [crntMessage, setCrntMessage] = useState("");

  const isGestureActive = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const translation = useVector();
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => (isGestureActive.value = true),
    onActive: ({ translationX, translationY }) => {
      translation.x.value = translationX + offsetX.value;
      if (translationX + offsetX.value < 0) {
        runOnJS(setCurrentSlide)(2);
      } else {
        runOnJS(setCurrentSlide)(0);
      }
    },
    onEnd: ({ translationX, velocityX }) => {
      let point = translationX + 0.2 * velocityX;
      let snapToServerBar = false;
      if (offsetX.value === 0) {
        snapToServerBar = point > width ? true : false;
      }
      let snapToUserBar = false;
      if (offsetX.value === 0) {
        snapToUserBar = point < 0 ? true : false;
      }
      if (snapToUserBar) {
        isGestureActive.value = false;
        translation.x.value = withSpring(-1 * (width - 50), { damping: 15 });
        offsetX.value = -1 * (width - 50);
        runOnJS(setCurrentSlide)(2);
      } else if (snapToServerBar) {
        isGestureActive.value = false;
        translation.x.value = withSpring(width - 50, { damping: 15 });
        offsetX.value = width - 50;
        runOnJS(setCurrentSlide)(0);
      } else {
        isGestureActive.value = false;
        translation.x.value = withSpring(0, { damping: 15 });
        offsetX.value = 0;
      }
    },
  });

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translation.x.value }],
    };
  });

  const gotouserbar = () => {
    translation.x.value = withSpring(-1 * (width - 50), { damping: 15 });
    offsetX.value = -1 * (width - 50);
    setCurrentSlide(2);
  };
  const gotoserverbar = () => {
    translation.x.value = withSpring(width - 50, { damping: 15 });
    offsetX.value = width - 50;
    setCurrentSlide(0);
  };

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[style, styles.chats]}>
        <View style={styles.topBarCont}>
          <Pressable style={styles.hamburgerMenu} onPress={gotoserverbar}>
            <Feather name="menu" size={24} color="#e1e1e1" />
          </Pressable>
          <View style={styles.channelName}>
            <Text style={{ ...styles.barText, color: "grey" }}>
              # <Text style={styles.barText}>General</Text>
            </Text>
          </View>
          <View style={styles.searchIcon}>
            <Feather name="search" size={24} color="#e1e1e1" />
          </View>
          <Pressable style={styles.userMenu} onPress={gotouserbar}>
            <Entypo name="users" size={24} color="#e1e1e1" />
          </Pressable>
        </View>
        <ScrollView>
          {/* Hied the sidebar(Optional) */}
          <View style={styles.chatCont}>
            {/* Have a padding of 10 here */}
            {array.map((_, i) => (
              <Text key={i} style={{ color: theme.fontColor }}>
                {"This is " + i}
              </Text>
            ))}
          </View>
        </ScrollView>
        <View style={styles.sendCont}>
          <View style={styles.imageSelector}>
            <Feather name="image" size={24} color="#e1e1e1" />
          </View>
          <View style={styles.giftSelector}>
            <Feather name="gift" size={24} color="#e1e1e1" />
          </View>
          <View style={styles.sendAreaCont}>
            <TextInput
              style={styles.sendArea}
              onChangeText={(text) => setCrntMessage(text)}
              value={crntMessage}
              placeholder="Message #general"
              placeholderTextColor="grey"
            />
            <View style={styles.emojiSelctor}>
              <Entypo name="emoji-flirt" size={24} color="#e1e1e1" />
            </View>
          </View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Chats;

const styles = StyleSheet.create({
  chats: {
    width,
    height,
    backgroundColor: theme.backgroundColor,
    position: "absolute",
    zIndex: 2,
    borderColor: theme.darkBackgroundColor,
    borderWidth: 3,
    flexDirection: "column",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  topBarCont: {
    width: "100%",
    height: 60,
    backgroundColor: theme.barBackgroundColor,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
  hamburgerMenu: {
    height: 30,
    width: 30,
    flex: 0,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  channelName: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    marginRight: 15,
  },
  barText: {
    color: "white",
    fontSize: 20,
  },
  searchIcon: {
    height: 30,
    width: 30,
    flex: 0,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  userMenu: {
    height: 30,
    width: 30,
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  sendCont: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
    backgroundColor: theme.backgroundColor,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  imageSelector: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: theme.darkBackgroundColor,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  giftSelector: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: theme.darkBackgroundColor,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  sendAreaCont: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.darkBackgroundColor,
    paddingLeft: 10,
    justifyContent: "center",
  },
  sendArea: {
    flex: 1,
    color: theme.fontColor,
    width: "80%",
  },
  emojiSelctor: {
    position: "absolute",
    right: 15,
  },
  chatCont: {
    padding: 10,
    marginBottom: 60,
  },
});
