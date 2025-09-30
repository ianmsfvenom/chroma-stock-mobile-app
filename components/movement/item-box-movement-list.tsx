import { BoxMovementListResponse } from "@/types/response";
import { ThemedView } from "../themed-view";
import { StyleSheet, View } from "react-native";
import TagBoxMovement from "../tag-movement";
import { ThemedText } from "../themed-text";

interface ItemBoxMovementListProps {
    boxMovement: BoxMovementListResponse
}

export default function ItemBoxMovementList(props: ItemBoxMovementListProps) {
    const { boxMovement } = props;
    const { movement_type } = boxMovement;
    
    return (
        <ThemedView lightColor="#fff" darkColor="#1E1E1E" style={styles.container}>
            <View style={styles.iconGroup}>
                <TagBoxMovement tagMovement={movement_type} />
            </View>
            <View style={styles.infoGroup}>
                <ThemedText style={styles.infoLabel}>Caixa: <ThemedText style={styles.infoLabelData}> {boxMovement.box_code}</ThemedText></ThemedText>
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 5
    },
    iconGroup: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoGroup:{
        flex: 1
    },
    infoLabel: {
        fontWeight: 'semibold',
        fontSize: 12,
        lineHeight: 16
    },
    infoLabelData: {
        fontWeight: 'semibold',
        fontSize: 12,
        lineHeight: 16
    }
})