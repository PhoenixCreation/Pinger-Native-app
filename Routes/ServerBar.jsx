import React from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView, Image} from 'react-native'
import { theme } from '../theme'
import { chats} from "../temp"

const { width, height } = Dimensions.get("window")

const ServerBar = ({ currentSlide }) => {
    const opacity = currentSlide === 0 ? 1 : 0
    return (
        <View style={{ ...styles.serverBar, opacity}}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollview}>
                <View style={styles.serverCont}>
                {chats.map((chat,index) => {
                    return (
                        <View key={index} style={styles.serverIconCont}>
                            <Image source={{ uri: chat.avatar_url}} style={styles.serverIcon} />
                        </View>
                    )
                })}
                </View>
            </ScrollView>
            <View style={styles.channelsCont}>

            </View>
        </View>
    )
}

export default ServerBar

const styles = StyleSheet.create({
    serverBar: {
        width: width - 60,
        height: '100%',
        backgroundColor: theme.secondaryBackgroundColor,
        position: 'absolute',
        zIndex: 1,
        flexDirection: "row",
        position: "relative"
    },
    scrollview: {
        borderWidth: 2,
        borderColor: "yellow",
    },
    serverCont:{
        width: 75,
        backgroundColor: theme.darkBackgroundColor,
        padding: 5,
        paddingBottom: 50,
        alignItems: "center",
        position: "relative",
    },
    serverIconCont: {
        width: 50,
        height: 50,
        alignItems: "center",
        marginBottom: 10,
        borderRadius: 1000,
        overflow: "hidden"
    },
    serverIcon: {
        width: 50,
        height: 50,
        resizeMode: "contain"
    },
    channelsCont: {
        flex: 1,
        height: "100%",
        borderColor: "red",
        borderWidth: 2
    }
})
