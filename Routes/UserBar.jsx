import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { theme } from '../theme'

const { width, height } = Dimensions.get("window")

const UserBar = ({ currentSlide }) => {
    const opacity = currentSlide === 2 ? 1 : 0
    return (
        <View style={{ ...styles.userBar, opacity}}>
            <Text style={{ color: theme.fontColor}}>Users bar</Text>
        </View>
    )
}

export default UserBar

const styles = StyleSheet.create({
    userBar: {
        width: width - 60,
        height: '100%',
        backgroundColor: theme.secondaryBackgroundColor,
        right: 0,
        position: 'absolute',
        zIndex: 1
    }
})
