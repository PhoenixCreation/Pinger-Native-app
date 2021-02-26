import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { PanGestureHandler, ScrollView } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS
} from "react-native-reanimated"
import { useVector } from "react-native-redash";
import { theme } from '../theme'


const { width, height } = Dimensions.get("window")

const Chats = ({ currentSlide, setCurrentSlide}) => {
    const isGestureActive = useSharedValue(false);
    const offsetX = useSharedValue(0)
    const translation = useVector();
    const onGestureEvent = useAnimatedGestureHandler({
        onStart: () => (isGestureActive.value = true),
        onActive: ({ translationX, translationY }) => {
            translation.x.value = translationX + offsetX.value;
            if (translationX + offsetX.value <  0) {
                runOnJS(setCurrentSlide)(2)
            }
            else {
                runOnJS(setCurrentSlide)(0)
            }
        },
        onEnd: ({ translationX, velocityX }) => {
            let point = translationX + 0.2 * velocityX * 0.5;
            let snapToServerBar = false
            if (offsetX.value === 0) {
                snapToServerBar = point > width ? true : false
            }
            let snapToUserBar = false
            if (offsetX.value === 0) {
                snapToUserBar = point < 0 ? true : false
            } 
            if (snapToUserBar){
                isGestureActive.value = false
                translation.x.value = withSpring(-1 * (width - 50),{ damping: 15})
                offsetX.value = -1 * (width - 50)
                runOnJS(setCurrentSlide)(2)
            }
            else if (snapToServerBar){
                isGestureActive.value = false
                translation.x.value = withSpring(width - 50,{ damping: 15})
                offsetX.value = width - 50
                runOnJS(setCurrentSlide)(0)
            }
            else {
                isGestureActive.value = false
                translation.x.value = withSpring(0,{ damping: 15})
                offsetX.value = 0
            }
        },
    });

    const style = useAnimatedStyle(() => {
        return {
        transform: [
            { translateX: translation.x.value },
        ],
        };
    });

    return (
        <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View style={[style, styles.chats]}>
                <ScrollView>
                    {
                        new Array(20).map((_,index) => (
                            <Text key={index} style={{ color: theme.fontColor}}>Chat component</Text>
                        ))
                    }
                </ScrollView>
            </Animated.View>
        </PanGestureHandler>
    )
}

export default Chats

const styles = StyleSheet.create({
    chats: {
        width,
        height,
        backgroundColor: theme.backgroundColor,
        position: 'absolute',
        zIndex: 2,
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 10
    }
})
