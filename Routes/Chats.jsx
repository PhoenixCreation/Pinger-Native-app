import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'

const { width, height } = Dimensions.get("window")

const Chats = () => {
    return (
        <View style={styles.chats}>
            <Text>Chat component</Text>
        </View>
    )
}

export default Chats

const styles = StyleSheet.create({
    chats: {
        width,
        height
    }
})
