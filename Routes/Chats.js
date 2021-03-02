import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
  Image,
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
import { chats } from "../temp";

const { width, height } = Dimensions.get("window");

const Chats = ({ currentSlide, setCurrentSlide }) => {
  const [crntMessage, setCrntMessage] = useState("");
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const chatScrollCont = useRef(null);

  const isGestureActive = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const translation = useVector();
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: ({ translationX }) => {
      isGestureActive.value = true;
      if (translationX + offsetX.value < 0) {
        runOnJS(setCurrentSlide)(2);
      } else {
        runOnJS(setCurrentSlide)(0);
      }
    },
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
        runOnJS(setCurrentSlide)(2);
        isGestureActive.value = false;
        translation.x.value = withSpring(-1 * (width - 50), { damping: 13 });
        offsetX.value = -1 * (width - 50);
      } else if (snapToServerBar) {
        runOnJS(setCurrentSlide)(0);
        isGestureActive.value = false;
        translation.x.value = withSpring(width - 50, { damping: 13 });
        offsetX.value = width - 50;
      } else {
        runOnJS(setCurrentSlide)(1);
        isGestureActive.value = false;
        translation.x.value = withSpring(0, { damping: 13 });
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
    setCurrentSlide(2);
    translation.x.value = withSpring(-1 * (width - 50), { damping: 13 });
    offsetX.value = -1 * (width - 50);
  };
  const gotoserverbar = () => {
    setCurrentSlide(0);
    translation.x.value = withSpring(width - 50, { damping: 13 });
    offsetX.value = width - 50;
  };
  const checkEnd = (nativeEvent) => {
    let diff =
      nativeEvent.contentSize.height -
      (nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height);
    if (diff < 65) {
      setShowScrollToBottom(false);
    } else {
      setShowScrollToBottom(true);
    }
  };

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[style, styles.chats]}>
        <View style={styles.topBarCont}>
          <Pressable style={styles.hamburgerMenu} onPress={gotoserverbar}>
            <Feather name="menu" size={24} color={theme.iconColor} />
          </Pressable>
          <View style={styles.channelName}>
            <Text style={{ ...styles.barText, color: "grey" }}>
              # <Text style={styles.barText}>General</Text>
            </Text>
          </View>
          <View style={styles.searchIcon}>
            <Feather name="search" size={24} color={theme.iconColor} />
          </View>
          <Pressable style={styles.userMenu} onPress={gotouserbar}>
            <Entypo name="users" size={24} color={theme.iconColor} />
          </Pressable>
        </View>
        <ScrollView
          ref={chatScrollCont}
          style={styles.chatScrollCont}
          onScroll={(event) => checkEnd(event.nativeEvent)}
        >
          <View style={styles.chatCont}>
            {/* Have a padding of 10 here */}
            {chats.map((chat, index) => {
              let isFirstMsgByUser =
                index !== 0 && chat.username !== chats[index - 1].username;
              if (index === 0) {
                isFirstMsgByUser = true;
              }
              return (
                <Pressable key={index} style={styles.chat}>
                  <View
                    style={
                      isFirstMsgByUser ? styles.chatLeft : styles.chatLeftDummy
                    }
                  >
                    {isFirstMsgByUser ? (
                      <Image
                        source={{ uri: chat.avatar_url }}
                        style={styles.chatAvatar}
                      />
                    ) : (
                      <Text style={styles.chatOtherTime}>12:30</Text>
                    )}
                  </View>
                  <View style={styles.chatRight}>
                    {isFirstMsgByUser && (
                      <View style={styles.chatRightHead}>
                        <Text style={styles.chatRightUsername}>
                          {chat.username}
                        </Text>
                        <Text style={styles.chatRightTimestamp}>
                          Today at 10:30(TODO)
                        </Text>
                      </View>
                    )}
                    <View style={styles.chatMessageCont}>
                      <Text style={styles.chatMessage}>
                        {chat.message}
                        {chat.edited && (
                          <Text style={styles.chatEdited}>(edited)</Text>
                        )}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
        {showScrollToBottom && (
          <Pressable
            onPress={() =>
              chatScrollCont?.current?.scrollToEnd({ duration: 2000 })
            }
            style={styles.scrollToBottom}
          >
            <Entypo name="chevron-down" size={24} color={theme.iconColor} />
          </Pressable>
        )}

        <View style={styles.sendCont}>
          <View style={styles.imageSelector}>
            <Feather name="image" size={24} color={theme.iconColor} />
          </View>
          <View style={styles.giftSelector}>
            <Feather name="gift" size={24} color={theme.iconColor} />
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
              <Entypo name="emoji-flirt" size={24} color={theme.iconColor} />
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
    borderWidth: 0,
    flexDirection: "column",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
    marginTop: 5,
    // elevation: 5,
  },
  topBarCont: {
    width: "100%",
    height: 60,
    backgroundColor: theme.barBackgroundColor,
    // borderTopRightRadius: 10,
    // borderTopLeftRadius: 10,
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
  chatScrollCont: {
    marginBottom: 60,
  },
  chatCont: {
    padding: 10,
  },
  scrollToBottom: {
    position: "absolute",
    right: 10,
    bottom: 70,
    padding: 10,
    zIndex: 10,
    borderRadius: 60,
    backgroundColor: theme.darkBackgroundColor,
  },
  chat: {
    flexDirection: "row",
    marginBottom: 10,
  },
  chatLeft: {
    width: 40,
    height: 40,
    marginLeft: 5,
    marginRight: 15,
  },
  chatLeftDummy: {
    width: 40,
    height: 40,
    marginLeft: 5,
    marginRight: 15,
  },
  chatAvatar: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    resizeMode: "contain",
  },
  chatOtherTime: {
    color: theme.otherTextColor,
  },
  chatRight: {
    flexDirection: "column",
    paddingRight: 15,
    width: "90%",
  },
  chatRightHead: {
    flexDirection: "row",
    alignItems: "center",
  },
  chatRightUsername: {
    fontSize: 16,
    color: theme.usernameColor,
    marginRight: 5,
  },
  chatRightTimestamp: {
    fontSize: 12,
    color: theme.otherTextColor,
  },
  chatMessageCont: {
    width: "90%",
  },
  chatMessage: {
    color: theme.messageColor,
    fontSize: 14,
    textAlign: "justify",
  },
  chatEdited: {
    color: theme.otherTextColor,
    fontSize: 11,
  },
});
