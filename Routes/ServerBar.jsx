import React from 'react'
import { StyleSheet, Text, View, Dimensions} from 'react-native'
import { theme } from '../theme'

const { width, height } = Dimensions.get("window")

const ServerBar = ({ currentSlide }) => {
    const opacity = currentSlide === 0 ? 1 : 0
    return (
        <View style={{ ...styles.serverBar, opacity}}>
            <Text style={{ color: theme.fontColor}}>Server bar</Text>
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
        zIndex: 1
    }
})
