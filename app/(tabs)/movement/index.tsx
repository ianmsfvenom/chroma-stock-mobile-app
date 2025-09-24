import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

export default function MovementScreen() {
    const theme = useColorScheme();

    return (
        <ThemedView lightColor="#fff" darkColor="#0D0D12" style={[styles.container]}>
            <ThemedText lightColor="#000" darkColor="#fff">Movimentação</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
});