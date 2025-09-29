import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ScrollView, StyleSheet, useColorScheme, View } from "react-native";

export default function MovementScreen() {
    const theme = useColorScheme();

    return (
        <ThemedView lightColor="#fff" darkColor="#0D0D12" style={styles.container}>
            <ThemedView lightColor="#f1f1f1ff" darkColor="#18181B" style={styles.cardMovement}>
                <ThemedText style={styles.cardMovementTitle}>
                    Movimentações de Produtos
                </ThemedText>
                <ThemedView lightColor="#000" darkColor="#fff" style={styles.line} />
                <ScrollView 
                    style={styles.cardMovementScroll}
                    contentContainerStyle={styles.cardMovementScrollContent}
                >
                    
                </ScrollView>
            </ThemedView>
            <ThemedView lightColor="#f1f1f1ff" darkColor="#18181B" style={styles.cardMovement}>
                <ThemedText style={styles.cardMovementTitle}>
                    Movimentações de Caixas
                </ThemedText>
                <ThemedView lightColor="#000" darkColor="#fff" style={styles.line} />
                <ScrollView 
                    style={styles.cardMovementScroll}
                    contentContainerStyle={styles.cardMovementScrollContent}
                >

                </ScrollView>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        gap: 15
    },
    cardMovement: {
        width: "100%",
        flex: 1,
        borderRadius: 6,
        elevation: 4
    },
    cardMovementTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10
    },
    cardMovementScroll: {

    },
    cardMovementScrollContent: {
        padding: 15
    },
    line: {
        height: 1,
        width: "100%"
    }
});