import { ProductMovementsBoxDetailsResponse } from "@/types/response";
import { StyleSheet, View } from "react-native";
import TagBoxMovement from "../tag-movement";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

interface ItemProductBoxMovementListProps {
    productBoxMovement: ProductMovementsBoxDetailsResponse
}

export default function ItemProductBoxMovementList(props: ItemProductBoxMovementListProps) {
    const { productBoxMovement } = props;

    return (
        <ThemedView style={styles.container} lightColor="#fff" darkColor="#1E1E1E">
            <View style={styles.movementGroup}>
                <TagBoxMovement tagMovement={productBoxMovement.movement_type} />
            </View>
            <View style={styles.infoGroup}>
                <ThemedText style={styles.infoLabel}>Produto: 
                    <ThemedText style={[styles.infoLabel, styles.infoLabelData]}> {productBoxMovement.product_name}</ThemedText>
                </ThemedText>
                <ThemedText style={styles.infoLabel}>Caixa de origem:
                    <ThemedText style={[styles.infoLabel, styles.infoLabelData]}> {productBoxMovement.origin_box_code}</ThemedText>
                </ThemedText>
            </View>
            <View style={styles.infoGroup}>
                <ThemedText style={styles.infoLabel}>Movido em: 
                    <ThemedText style={[styles.infoLabel, styles.infoLabelData]}> {(new Date(productBoxMovement.moved_at)).toLocaleString()}</ThemedText>
                </ThemedText>
                <ThemedText style={styles.infoLabel}>Responsável: 
                    <ThemedText style={[styles.infoLabel, styles.infoLabelData]}> {productBoxMovement.author}</ThemedText>
                </ThemedText>
                <ThemedText style={styles.infoLabel}>Caixa de destino:
                    <ThemedText style={[styles.infoLabel, styles.infoLabelData]}> {productBoxMovement.destination_box_code}</ThemedText>
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
    movementGroup: {
        display: 'flex',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.8
    },
    infoGroup: {
        flex: 1,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column',
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