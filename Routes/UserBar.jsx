import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'

const { width, height } = Dimensions.get("window")

const UserBar = () => {
    return (
        <View style={styles.userBar}>
            <Text>Users bar</Text>
        </View>
    )
}

export default UserBar

const styles = StyleSheet.create({
    userBar: {
        width: width - 50,
        height: '100%',
        backgroundColor: 'red'
    }
})
