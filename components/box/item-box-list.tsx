import { StyleSheet } from "react-native"
import { Text, View } from "react-native"
import { ThemedView } from "../themed-view"

interface ItemBoxListProps {
    id: number
    code: string
    typeBox: string
    status: string
    actual_deposit: string
    actual_location: string
}

export default function ItemBoxList(props: ItemBoxListProps) {
    const { id, code, typeBox, status, actual_deposit, actual_location } = props;

    return (
        <ThemedView style={styles.container} lightColor="#fff" darkColor="#1E1E1E">
            <View style={styles.infoView}>
                <Text style={styles.infoLabel}>ID: {id}</Text>
                <Text style={styles.infoLabel}>Codigo: {code}</Text>
                <Text style={styles.infoLabel}>Tipo: {typeBox}</Text>
                <Text style={styles.infoLabel}>Status: {status}</Text>
                <Text style={styles.infoLabel}>Deposito: {actual_deposit}</Text>
                <Text style={styles.infoLabel}>Local: {actual_location}</Text>
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 100,
        backgroundColor: "white",
        borderRadius: 10,
        marginBottom: 10,
    },
    infoView: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 10,
    },
    infoLabel: {
        fontSize: 12,
        lineHeight: 10,
        marginBottom: 5,
        color: "red",
    },
});