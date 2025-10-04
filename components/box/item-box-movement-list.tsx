import { StyleSheet, View } from "react-native";
import TagBoxMovement from "../tag-movement";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import { BoxMovementBoxDetailsResponse } from "@/types/responses/box-response";

interface ItemBoxMovementListProps {
    boxMovement: BoxMovementBoxDetailsResponse
}

export default function ItemBoxMovementList(props: ItemBoxMovementListProps) {
    const { boxMovement } = props;

    return (
        <ThemedView style={styles.container} lightColor="#fff" darkColor="#1E1E1E">
            <View style={styles.movementGroup}>
                <TagBoxMovement tagMovement={boxMovement.movement_type} />
            </View>
            <View style={styles.infoGroup}>
                <ThemedText style={styles.infoLabel}>Origem: 
                    <ThemedText style={[styles.infoLabel, styles.infoLabelData]}> {boxMovement.origin_deposit || 'N/A'}</ThemedText>
                </ThemedText>
                <ThemedText style={styles.infoLabel}>Destino: 
                    <ThemedText style={[styles.infoLabel, styles.infoLabelData]}> {boxMovement.destination_deposit || 'N/A'}</ThemedText>
                </ThemedText>
                <ThemedText style={styles.infoLabel}>Movido em: 
                    <ThemedText style={[styles.infoLabel, styles.infoLabelData]}> {(new Date(boxMovement.moved_at)).toLocaleString()}</ThemedText>
                </ThemedText>
            </View>
            <View style={styles.infoGroup}>
                <ThemedText style={styles.infoLabel}>Lo. origem: 
                    <ThemedText style={[styles.infoLabel, styles.infoLabelData]}> {boxMovement.origin_location || 'N/A'}</ThemedText>
                </ThemedText>
                <ThemedText style={styles.infoLabel}>Lo. destino: 
                    <ThemedText style={[styles.infoLabel, styles.infoLabelData]}> {boxMovement.destination_location || 'N/A'}</ThemedText>
                </ThemedText>
                <ThemedText style={styles.infoLabel}>Responsável: 
                    <ThemedText style={[styles.infoLabel, styles.infoLabelData]}> {boxMovement.author}</ThemedText>
                </ThemedText>
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
        gap: 15,
        borderRadius: 4,
        elevation: 4
    },
    infoGroup: {
        flex: 1,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    movementGroup: {
        display: 'flex',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.8
    },
    infoLabel: {
        fontWeight: 'semibold',
        fontSize: 12,
        lineHeight: 16
    },
    infoLabelData: {
        fontWeight: 'bold'
    }
});