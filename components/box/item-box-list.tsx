import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native"
import { Text, View } from "react-native"
import { ThemedView } from "../themed-view"
import { ThemedText } from "../themed-text"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

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

    const handlePress = () => {
        router.push({
            pathname: '/(tabs)/box/details-box',
            params: { id }
        });
    }
    return (
        <ThemedView style={styles.container} lightColor="#fff" darkColor="#1E1E1E">
            <View style={styles.iconView}>
                <Ionicons size={28} name="cube-outline" color={theme === 'dark' ? '#7BF2A8' : '#162C23'} />
            </View>
            <View style={styles.infoView}>
                <View style={styles.infoGroup}>
                    <ThemedText style={styles.infoLabel}>Código:
                        <ThemedText style={{ fontWeight: 'bold', fontSize: 12 }}> {code}</ThemedText>
                    </ThemedText>
                    <ThemedText style={styles.infoLabel}>Tipo:
                        <ThemedText style={{ fontWeight: 'bold', fontSize: 12 }}> {typeBox}</ThemedText>
                    </ThemedText>
                    <ThemedText style={styles.infoLabel}>Depósito: 
                        <ThemedText style={{ fontWeight: 'bold', fontSize: 12 }}> {actual_deposit}</ThemedText>
                    </ThemedText>
                </View>
                <View style={styles.infoGroup}>
                    <ThemedText style={styles.infoLabel}>Status: 
                        <ThemedText style={{ fontWeight: 'bold', fontSize: 12 }}>{status === 'in stock' ? ' Em estoque' : ' Sem estoque'}</ThemedText>
                    </ThemedText>
                    <ThemedText style={styles.infoLabel}>Local: 
                        <ThemedText style={{ fontWeight: 'bold', fontSize: 12 }}> {actual_location}</ThemedText>
                    </ThemedText>
                </View>
            </View>
            <View style={styles.detailsView}>
                <TouchableOpacity onPress={handlePress} style={[styles.detailsButton, theme === 'dark' ? styles.detailsButtonDark : styles.detailsButtonLight]}>
                    <ThemedText darkColor="#7BF2A8" lightColor="#162C23" style={styles.detailsButtonLabel}>Visualizar</ThemedText>
                    <Ionicons color={theme === 'dark' ? '#7BF2A8' : '#162C23'} name="arrow-forward-outline" size={14} />
                </TouchableOpacity>
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 5
    },
    infoView: {
        width: '65%',
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        gap: 10,
        wordWrap: 'break-word'
    },
    infoGroup: {
        width: '45%',
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
    },
    infoLabel: {
        fontSize: 12,
        lineHeight: 13,
        marginBottom: 5
    },
    iconView: {
        width: '10%',
        alignItems: "center",
        justifyContent: "center",
        display: 'flex'
    },
    detailsView: {
        width: '25%',
        alignItems: "center",
        justifyContent: "center",
        display: 'flex'
    },
    detailsButtonDark: {
        backgroundColor: '#162C23',
        borderColor: '#7BF2A8'
    },
    detailsButtonLight: {
        backgroundColor: '#7BF2A8',
    },
    detailsButton: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 4,
        borderWidth: 1
    },
    detailsButtonLabel: {
        fontSize: 12,
        fontWeight: 'bold'
    },
});