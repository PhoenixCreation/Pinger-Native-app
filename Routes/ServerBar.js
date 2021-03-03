import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import {
  ScrollView as GestureScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { AntDesign, Feather } from "@expo/vector-icons";
import { theme } from "../theme";
import { servers } from "../temp";

const { width, height } = Dimensions.get("window");

const ServerBar = ({ currentSlide }) => {
  const [currentServer, setCurrentServer] = useState(servers[0]);
  const [currentChannel, setCurrentChannel] = useState(
    currentServer.channels.text[0]
  );

  useEffect(() => {
    setCurrentChannel(currentServer.channels.text[0]);
  }, [currentServer]);

  const opacity = currentSlide === 0 ? 1 : 0;
  return (
    <View style={{ ...styles.serverBar, opacity }}>
      <View style={styles.serverIconCont}>
        <ScrollView
          style={styles.serverIconScroll}
          showsVerticalScrollIndicator={false}
        >
          {servers.map((server, index) => {
            return (
              <Pressable
                style={styles.serverIcon}
                key={index}
                onPress={() => setCurrentServer(server)}
              >
                <Image
                  style={styles.serverIconImg}
                  source={{ uri: server.server_icon }}
                />
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.channelCont}>
        <View style={styles.serverName}>
          <Text style={styles.serverNameText}>{currentServer.server_name}</Text>
        </View>
        <GestureScrollView
          contentContainerStyle={styles.channelScroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.serverPoster}>
            <Image
              source={{
                uri:
                  "https://picsum.photos/200?random=" +
                  Math.floor(Math.random() * 1000),
              }}
              style={styles.serverPosterImg}
            />
          </View>
          <Pressable style={styles.inviteButton}>
            <Text style={styles.inviteButtonText}>Invite Members</Text>
          </Pressable>
          <View style={styles.textChannelsCont}>
            <View style={styles.textLabel}>
              <View style={styles.textChannelsToggler}>
                <AntDesign name="right" size={14} color="white" />
              </View>
              <Text style={styles.textLabelText}>Text Channels</Text>
            </View>
            {currentServer.channels.text.map((channel, index) => {
              const isCurrent = currentChannel === channel;
              return (
                <TouchableWithoutFeedback
                  style={
                    isCurrent
                      ? { ...styles.channel, ...styles.currentChannel }
                      : styles.channel
                  }
                  key={index}
                  onPress={() => {
                    console.log("clicked");
                    setCurrentChannel(channel);
                  }}
                >
                  <Feather name="hash" size={14} color="white" />
                  <Text
                    style={
                      isCurrent
                        ? {
                            ...styles.channelName,
                            ...styles.currentChannelName,
                          }
                        : styles.channelName
                    }
                  >
                    {channel.channel_name}
                  </Text>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
          <View style={styles.voiceChannelsCont}>
            <View style={styles.voiceLabel}>
              <View style={styles.voiceChannelsToggler}>
                <AntDesign
                  name="right"
                  size={14}
                  color={theme.fontColor + "aa"}
                />
              </View>
              <Text style={styles.voiceLabelText}>Voice Channels</Text>
            </View>
            {currentServer.channels.voice.map((channel, index) => {
              return (
                <Pressable
                  style={styles.channel}
                  key={index}
                  onPress={() => setCurrentChannel(channel)}
                >
                  <Feather name="hash" size={14} color="white" />
                  <Text style={styles.channelName}>{channel.channel_name}</Text>
                </Pressable>
              );
            })}
          </View>
        </GestureScrollView>
      </View>
    </View>
  );
};

export default ServerBar;

const styles = StyleSheet.create({
  serverBar: {
    width: width - 60,
    height: "100%",
    backgroundColor: theme.backgroundColor,
    zIndex: 1,
    flex: 1,
    flexDirection: "row",
    position: "relative",
    marginBottom: 5,
    justifyContent: "space-between",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    overflow: "hidden",
    marginTop: 5,
    borderWidth: 2,
    borderColor: theme.backgroundColor,
  },
  serverIconCont: {
    width: 75,
    backgroundColor: theme.darkBackgroundColor,
  },
  serverIconScroll: {
    width: "100%",
    height: "100%",
    padding: 5,
  },
  serverIcon: {
    width: 45,
    height: 45,
    borderRadius: 45,
    alignSelf: "center",
    overflow: "hidden",
    margin: 5,
  },
  serverIconImg: {
    width: "100%",
    height: "100%",
  },
  channelCont: {
    flex: 1,
    position: "relative",
  },
  serverName: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingLeft: 5,
    width: "100%",
    zIndex: 10,
    backgroundColor: "#12121233",
  },
  serverNameText: {
    color: theme.fontColor,
    fontSize: 18,
  },
  serverPoster: {
    width: "100%",
    height: 125,
  },
  serverPosterImg: {
    width: "100%",
    height: "100%",
  },
  inviteButton: {
    width: "80%",
    margin: 15,
    backgroundColor: "#666",
    borderRadius: 5,
    alignSelf: "center",
  },
  inviteButtonText: {
    color: theme.fontColor,
    fontWeight: "700",
    textAlign: "center",
    padding: 5,
  },
  // channelScroll: {
  //   borderWidth: 1,
  //   borderColor: "red",
  //   zIndex: 1000,
  // },
  textLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  voiceLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  textChannelsToggler: {
    marginRight: 4,
  },
  voiceChannelsToggler: {
    marginRight: 4,
  },
  textLabelText: {
    color: theme.fontColor,
    fontWeight: "700",
    fontSize: 16,
  },
  voiceLabelText: {
    color: theme.fontColor,
    fontWeight: "700",
    fontSize: 16,
  },
  channel: {
    flexDirection: "row",
    paddingLeft: 5,
    margin: 10,
    alignItems: "center",
  },
  channelName: {
    fontSize: 17,
    color: theme.fontColor + "aa",
    paddingLeft: 5,
  },
  currentChannel: {
    height: "auto",
  },
  currentChannelName: {
    color: theme.fontColor,
  },
});
