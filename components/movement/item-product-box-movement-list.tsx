import { ThemedView } from "../themed-view";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";
import TagBoxMovement from "../tag-movement";
import { ProductBoxMovementListResponse } from "@/types/responses/product-box-movement-response";

interface ItemProductBoxMovementListProps {
    productBoxMovement: ProductBoxMovementListResponse
}

export default function ItemProductBoxMovementList(props: ItemProductBoxMovementListProps) {
    const { productBoxMovement } = props;
    const { author, destination_box_code, moved_at, movement_type, origin_box_code, product_name, quantity } = productBoxMovement;
    return (
        <ThemedView lightColor="#fff" darkColor="#1E1E1E" style={styles.container}>
            <View style={styles.iconGroup}>
                <TagBoxMovement tagMovement={movement_type} />
            </View>
            <View style={styles.infoView}>
                <View style={styles.infoGroup}>
                    <ThemedText style={styles.infoLabel}>Produto: <ThemedText style={styles.infoLabelData}> {product_name}</ThemedText></ThemedText>
                    <ThemedText style={styles.infoLabel}>Quantidade: <ThemedText style={styles.infoLabelData}> {quantity}</ThemedText></ThemedText>
                    <ThemedText style={styles.infoLabel}>Caixa de origem: <ThemedText style={styles.infoLabelData}> {origin_box_code}</ThemedText></ThemedText>
                </View>
                <View style={styles.infoGroup}>
                    <ThemedText style={styles.infoLabel}>Caixa de destino: <ThemedText style={styles.infoLabelData}> {destination_box_code}</ThemedText></ThemedText>
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