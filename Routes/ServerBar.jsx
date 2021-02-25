import React from 'react'
import { StyleSheet, Text, View, Dimensions} from 'react-native'

const { width, height } = Dimensions.get("window")

const ServerBar = () => {
    return (
        <View style={styles.serverBar}>
            <Text>Server bar</Text>
        </View>
    )
}

export default ServerBar

const styles = StyleSheet.create({
    serverBar: {
        width: width - 50,
        height: '100%',
        backgroundColor: "green"
    }
})
