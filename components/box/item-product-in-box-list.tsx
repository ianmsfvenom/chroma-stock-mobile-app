import { ProductInBoxDetailsResponse } from "@/types/response";
import { Image, StyleSheet, useColorScheme, View } from "react-native";
import { ThemedView } from "../themed-view";
import { ThemedText } from "../themed-text";

interface ItemProductInBoxListProps {
    product: ProductInBoxDetailsResponse
}

export default function ItemProductInBoxList(props: ItemProductInBoxListProps) {
    const { product } = props;

    return (
        <ThemedView style={styles.container} lightColor="#fff" darkColor="#1E1E1E">
            <View style={styles.imageView}>
                <Image style={styles.imageProduct} src={product.image_url || 'https://placehold.co/600x400/png'}/>
            </View>
            <View style={styles.infoView}>
                <View style={styles.infoGroup}>
                    <ThemedText style={styles.infoLabel}>Produto: 
                        <ThemedText style={styles.infoLabelData}> {product.product_name}</ThemedText>
                    </ThemedText>
                    <ThemedText style={styles.infoLabel}>SKU: 
                        <ThemedText style={styles.infoLabelData}> {product.sku}</ThemedText>
                    </ThemedText>
                </View>
                <View style={styles.infoGroup}>
                    <ThemedText style={styles.infoLabel}>Preço: 
                        <ThemedText style={styles.infoLabelData}> R${product.price.toFixed(2).replace('.', ',')}</ThemedText>
                    </ThemedText>
                    <ThemedText style={styles.infoLabel}>Quantidade: 
                        <ThemedText style={styles.infoLabelData}> {product.quantity}</ThemedText>
                    </ThemedText>
                </View>
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 10,
        gap: 15,
        borderRadius: 4,
        elevation: 4
    },
    imageView: {
        flex: 0.4,
        height: 80
    },
    imageProduct: {
      height: '100%',
      borderRadius: 4
    },
    infoView: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    infoGroup: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 5
    },
    infoLabel: {
        fontSize: 12,
        lineHeight: 16
    },
    infoLabelData: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: 'bold'
    }
});