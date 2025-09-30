import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { desktopBaseURL } from "@/constants/url";
import { ProductDetailsResponse } from "@/types/response";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, TouchableOpacity, useColorScheme, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DetailsProductScreen() {
    const theme = useColorScheme();
    const { id } = useLocalSearchParams();
    const [ product, setProduct ] = useState<ProductDetailsResponse>();

    useEffect(() => {
        const getProductDetails = async () => {
            const token = await AsyncStorage.getItem('access_token');
            if(!token) return;

            try {
                const response = await fetch(`${desktopBaseURL}/api/product/details/${id}`, { headers: { 'Authorization': token } });
                if(!response.ok) {
                    if(response.status === 401) {
                        await AsyncStorage.removeItem('access_token');
                        Alert.alert('Atenção', 'Sua sessão expirou!');
                        return router.replace('/login');
                    }
                    return Alert.alert('Atenção', 'Ocorreu um erro ao carregar os dados! Status: ' + response.status);
                }
                const data: ProductDetailsResponse = await response.json();
                setProduct(data);
            } catch (error) {
                return Alert.alert('Atenção', `Erro ao carregar os detalhes do produto: ${error}`);
            }
        }

        getProductDetails();
    }, [id]);

    return (
        <ThemedView lightColor="#fff" darkColor="#0D0D12" style={styles.container}>
            <ThemedView lightColor="#f1f1f1ff" darkColor="#18181B" style={styles.cardDetails}>
                <View style={styles.headerCard}>
                    <ThemedText lightColor="#000" darkColor="#fff" style={styles.headerTitle}>{product?.name || 'Carregando...'}</ThemedText>
                </View>
                <ThemedView style={styles.line} lightColor="#000" darkColor="#fff"></ThemedView>
                <View style={styles.imageProductView}>
                    <Image src={product?.image_url || 'https://placehold.co/600x400/png'} style={styles.imageProduct} />
                </View>
                <ScrollView style={styles.infoDetails} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <ThemedText>
                        Preço:
                        <ThemedText style={{ fontWeight: 'bold' }}> R${product?.price.toString().replace('.', ',')}</ThemedText>
                    </ThemedText>
                    <ThemedText>
                        Código de Barras:
                        <ThemedText style={{ fontWeight: 'bold' }}> {product?.barcode}</ThemedText>
                    </ThemedText>
                    <ThemedText>
                        Categoria:
                        <ThemedText style={{ fontWeight: 'bold' }}> {product?.category}</ThemedText>
                    </ThemedText>
                    <ThemedText>
                        Subcategoria:
                        <ThemedText style={{ fontWeight: 'bold' }}> {product?.subcategory}</ThemedText>
                    </ThemedText>
                    <ThemedText>
                        SKU:
                        <ThemedText style={{ fontWeight: 'bold' }}> {product?.sku}</ThemedText>
                    </ThemedText>
                    <ThemedText>
                        Min. Estoque:
                        <ThemedText style={{ fontWeight: 'bold' }}> {product?.min_stock}</ThemedText>
                    </ThemedText>
                    <ThemedText>
                        Status:
                        <ThemedText style={{ fontWeight: 'bold' }}>
                            {
                                product?.status_stock === 'Available' ? ' Disponível' : 
                                product?.status_stock === 'Low stock' ? ' Baixo estoque' :
                                ' Sem estoque'
                            }
                        </ThemedText>
                    </ThemedText>
                    <ThemedText>
                        Quantidade:
                        <ThemedText style={{ fontWeight: 'bold' }}> {product?.total_quantity}</ThemedText>
                    </ThemedText>
                    <ThemedText>
                        Observação:
                        <ThemedText style={{ fontWeight: 'bold' }}> {product?.obs}</ThemedText>
                    </ThemedText>
                </ScrollView>
            </ThemedView>
            <TouchableOpacity style={[styles.backButton, theme === 'dark' ? styles.backButtonDark : styles.backButtonLight]} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={18} color={theme === 'dark' ? '#FF3F3F' : '#2C1616'} />
                <ThemedText lightColor="#2C1616" darkColor="#FF3F3F" style={styles.backButtonLabel}>Voltar</ThemedText>
            </TouchableOpacity>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    cardDetails: {
        elevation: 4,
        borderRadius: 4,
        width: "95%",
        height: "85%"
    },
    headerCard: {
        width: "100%",
    },
    line: {
        width: "100%",
        height: 1
    },
    headerTitle: {
        fontSize: 20,
        width: '100%',
        fontWeight: "bold",
        padding: 10
    },
    imageProductView: {
        width: "100%",
        height: '45%',
        paddingHorizontal: 40,
        paddingVertical: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageProduct: {
        width: "100%",
        height: "100%"
    },
    infoDetails: {
        paddingHorizontal: 40,
        marginBottom: 20
    },
    backButtonLight: {
        backgroundColor: '#FF3F3F',
        borderColor: '#2C1616',
    },
    backButtonDark: {
        backgroundColor: '#2C1616',
        borderColor: '#FF3F3F',
    },
    backButton: {
        marginTop: 20,
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 4,
        elevation: 4,
    },
    backButtonLabel: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})