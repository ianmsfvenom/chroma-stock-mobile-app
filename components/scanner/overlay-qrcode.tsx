import { useEffect, useRef } from "react";
import { Animated, StyleSheet, useColorScheme, View } from "react-native"

const SCAN_BOX_SIZE = 300;
const CORNER_SIZE = 80;
const BORDER_WIDTH = 4;
const BORDER_COLOR_LIGHT = '#000';
const BORDER_COLOR_DARK = '#fff';
const BORDER_RADIUS = 10;

export default function OverlayQRCode() {
    const theme = useColorScheme();
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
        <View style={styles.overlay}>
            <View style={styles.scanBox}>
                <View style={[styles.corner, styles.topLeft, theme === 'dark' ? styles.cornerDark : styles.cornerLight]} />
                <View style={[styles.corner, styles.topRight, theme === 'dark' ? styles.cornerDark : styles.cornerLight]} />
                <View style={[styles.corner, styles.bottomLeft, theme === 'dark' ? styles.cornerDark : styles.cornerLight]} />
                <View style={[styles.corner, styles.bottomRight, theme === 'dark' ? styles.cornerDark : styles.cornerLight]} />
            </View>
            <Animated.View style={[styles.line, { opacity: fadeAnim }]} />
        </View>
    )
}

const styles = StyleSheet.create({
    line: {
        width: '100%',
        height: 1,
        position: 'absolute',
        top: SCAN_BOX_SIZE / 2,
        backgroundColor: '#ff0000ff'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        width: SCAN_BOX_SIZE,
        height: SCAN_BOX_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanBox: {
        width: SCAN_BOX_SIZE,
        height: SCAN_BOX_SIZE,
        position: 'relative'
    },
    cornerLight: {
        borderColor: BORDER_COLOR_LIGHT
    },
    cornerDark: {
        borderColor: BORDER_COLOR_DARK
    },
    corner: {
        position: 'absolute',
        width: CORNER_SIZE,
        height: CORNER_SIZE,
    },
    topLeft: {
        top: 0,
        left: 0,
        borderTopWidth: BORDER_WIDTH,
        borderLeftWidth: BORDER_WIDTH,
        borderTopLeftRadius: BORDER_RADIUS
    },
    topRight: {
        top: 0,
        right: 0,
        borderTopWidth: BORDER_WIDTH,
        borderRightWidth: BORDER_WIDTH,
        borderTopRightRadius: BORDER_RADIUS
    },
    bottomLeft: {
        bottom: 0,
        left: 0,
        borderBottomWidth: BORDER_WIDTH,
        borderLeftWidth: BORDER_WIDTH,
        borderBottomLeftRadius: BORDER_RADIUS
    },
    bottomRight: {
        bottom: 0,
        right: 0,
        borderBottomWidth: BORDER_WIDTH,
        borderRightWidth: BORDER_WIDTH,
        borderBottomRightRadius: BORDER_RADIUS
    },
})