import { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

const CAMERA_HEIGHT = 200

export default function OverlayBarcode() {
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [fadeAnim]);

    return (
        <Animated.View style={[styles.line, { opacity: fadeAnim }]} />
    )
}

const styles = StyleSheet.create({
    line: {
        width: '100%',
        height: 1,
        position: 'absolute',
        top: CAMERA_HEIGHT / 2,
        backgroundColor: '#ff0000ff'
    }
});