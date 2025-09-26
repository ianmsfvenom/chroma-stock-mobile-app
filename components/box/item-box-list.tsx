import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native"
import { Text, View } from "react-native"
import { ThemedView } from "../themed-view"
import { ThemedText } from "../themed-text"
import { Ionicons } from "@expo/vector-icons"

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
    const theme = useColorScheme();

    return (
        <ThemedView style={styles.container} lightColor="#fff" darkColor="#1E1E1E">
            <View style={styles.iconView}>
                <Ionicons size={28} name="cube-outline" color={theme === 'dark' ? '#7BF2A8' : '#162C23'} />
            </View>
            <View style={styles.infoView}>
                <ThemedText style={styles.infoLabel}>ID: {id}</ThemedText>
                <ThemedText style={styles.infoLabel}>Codigo: {code}</ThemedText>
                <ThemedText style={styles.infoLabel}>Tipo: {typeBox}</ThemedText>
                <ThemedText style={styles.infoLabel}>Status: {status}</ThemedText>
                <ThemedText style={styles.infoLabel}>Deposito: {actual_deposit}</ThemedText>
                <ThemedText style={styles.infoLabel}>Local: {actual_location}</ThemedText>
            </View>
            <View style={styles.detailsView}>
                <TouchableOpacity style={[styles.detailsButton, theme === 'dark' ? styles.detailsButtonDark : styles.detailsButtonLight]}>

                </TouchableOpacity>
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    infoView: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 10,
    },
    infoLabel: {
        fontSize: 12,
        lineHeight: 10,
        marginBottom: 5
    },
    iconView: {
        flex: 0.3,
        alignItems: "center",
        justifyContent: "center",
        display: 'flex'
    },
    detailsView: {
        flex: 0.3,
        alignItems: "center",
        justifyContent: "center",
        display: 'flex'
    },
    detailsButtonLight: {
        
    },
    detailsButtonDark: {
        
    },
    detailsButton: {

    }
});