import { Image, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { ThemedView } from "../themed-view";
import { ThemedText } from "../themed-text";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface ItemProductListProps {
    imageUrl: string | null;
    id: string;
    name: string;
    price: number;
    sku: string;
}

export default function ItemProductList(props: ItemProductListProps) {
    const theme = useColorScheme();
    const { imageUrl, name, price, sku } = props;

    const handlePress = () => {
        router.push({
            pathname: '/(tabs)/product/details-product',
            params: { id: props.id }
        });
    };

    return (
        <ThemedView style={styles.container} lightColor="#fff" darkColor="#1E1E1E">
            <ThemedView style={styles.productView}>
                <Image src={imageUrl || 'https://placehold.co/600x400/png'} style={styles.imageProduct}  />
            </ThemedView>
            <ThemedView style={styles.infoView}>
                <ThemedText style={styles.infoLabel}>Nome: 
                    <ThemedText style={{ fontWeight: 'semibold', fontSize: 13 }}> {name}</ThemedText>
                </ThemedText>
                <ThemedText style={styles.infoLabel}>SKU: 
                    <ThemedText style={{ fontWeight: 'semibold', fontSize: 13 }}> {sku}</ThemedText>
                </ThemedText>
                <ThemedText style={styles.infoLabel}>Preço: 
                    <ThemedText style={{ fontWeight: 'semibold', fontSize: 13 }}> R${price.toFixed(2).replace('.', ',')}</ThemedText>
                    </ThemedText>
            </ThemedView>
            <ThemedView style={styles.detailsView}>
                <TouchableOpacity onPress={handlePress} style={[styles.detailsButton, theme === 'dark' ? styles.detailsButtonDark : styles.detailsButtonLight]}>
                    <ThemedText darkColor="#7BF2A8" lightColor="#162C23" style={styles.detailsButtonLabel}>Visualizar</ThemedText>
                    <Ionicons color={theme === 'dark' ? '#7BF2A8' : '#162C23'} name="arrow-forward-outline" size={14} />
                </TouchableOpacity>
            </ThemedView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 5,
        padding: 10,
        borderRadius: 4,
        elevation: 2,
        marginBottom: 10
    },
    productView: {
        flex: 0.7,
        height: 80
    },
    infoView: {
        flex: 1,
        marginLeft: 10,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    detailsView: {
        flex: 0.7
    },
    imageProduct: {
        width: '100%',
        height: '100%',
        borderRadius: 4
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
    infoLabel: {
        fontSize: 13,
        lineHeight: 15,
        fontWeight: 'bold'
    }
});