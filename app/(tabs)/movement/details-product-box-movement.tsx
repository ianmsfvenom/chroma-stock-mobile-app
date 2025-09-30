import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";

export default function DetailsProductBoxMovementScreen() {
    return (
        <ThemedView lightColor="#fff" darkColor="#0D0D12" style={styles.container}>
            <ThemedView lightColor="#f1f1f1ff" darkColor="#18181B" style={styles.cardDetailMovement}>

            </ThemedView>
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
    cardDetailMovement: {
        width: "95%",
        height: "95%",
        borderRadius: 6,
        elevation: 5,
    }
})