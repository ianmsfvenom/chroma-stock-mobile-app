import { ThemedView } from "../themed-view";
import { StyleSheet, View } from "react-native";
import TagBoxMovement from "../tag-movement";
import { ThemedText } from "../themed-text";
import { BoxMovementListResponse } from "@/types/responses/box-movement-response";

interface ItemBoxMovementListProps {
    boxMovement: BoxMovementListResponse
}

export default function ItemBoxMovementList(props: ItemBoxMovementListProps) {
    const { boxMovement } = props;
    const {
        movement_type, box_code,
        origin_deposit, origin_location, destination_deposit,
        destination_location, author, moved_at
    } = boxMovement;

    return (
        <ThemedView lightColor="#fff" darkColor="#1E1E1E" style={styles.container}>
            <View style={styles.iconGroup}>
                <TagBoxMovement tagMovement={movement_type} />
            </View>
            <View style={styles.infoView}>
                <View style={styles.infoGroup}>
                <ThemedText style={styles.infoLabel}>Caixa: <ThemedText style={styles.infoLabelData}> {box_code}</ThemedText></ThemedText>
                <ThemedText style={styles.infoLabel}>Depósito de origem: <ThemedText style={styles.infoLabelData}> {origin_deposit}</ThemedText></ThemedText>
                <ThemedText style={styles.infoLabel}>Localização de origem: <ThemedText style={styles.infoLabelData}> {origin_location}</ThemedText></ThemedText>
                <ThemedText style={styles.infoLabel}>Depósito de destino: <ThemedText style={styles.infoLabelData}> {destination_deposit}</ThemedText></ThemedText>
            </View>
            <View style={styles.infoGroup}>
                <ThemedText style={styles.infoLabel}>Localização de destino: <ThemedText style={styles.infoLabelData}> {destination_location}</ThemedText></ThemedText>
                <ThemedText style={styles.infoLabel}>Responsável: <ThemedText style={styles.infoLabelData}> {author}</ThemedText></ThemedText>
                <ThemedText style={styles.infoLabel}>Movido em: <ThemedText style={styles.infoLabelData}> {(new Date(moved_at)).toLocaleString()}</ThemedText></ThemedText>
            </View>
            </View>
            
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 10,
        borderRadius: 4,
        elevation: 4,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20
    },
    iconGroup: {
        flex: 0.3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoGroup: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    infoLabel: {
        fontWeight: 'semibold',
        fontSize: 12,
        lineHeight: 16,
        marginBottom: 5
    },
    infoLabelData: {
        fontWeight: 'bold',
        fontSize: 12,
        lineHeight: 16
    },
    infoView: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 10
    }
})