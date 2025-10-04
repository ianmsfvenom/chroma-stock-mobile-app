import ItemBoxMovementList from "@/components/movement/item-box-movement-list";
import ItemProductBoxMovementList from "@/components/movement/item-product-box-movement-list";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { desktopBaseURL } from "@/constants/url";
import { BoxMovementListResponse } from "@/types/responses/box-movement-response";
import { ProductBoxMovementListResponse } from "@/types/responses/product-box-movement-response";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";

export default function MovementScreen() {
    const theme = useColorScheme();
    const [ boxMovements, setBoxMovements ] = useState<BoxMovementListResponse[]>([]);
    const [ productBoxMovement, setProductBoxMovement ] = useState<ProductBoxMovementListResponse[]>([]);
    
    useEffect(() => {
        const loadMovements = async () => {
            const token = await AsyncStorage.getItem('access_token');
            if (!token) 
                return Alert.alert('Atenção', 'Credenciais não encontradas2! Faça login novamente!', 
                    [{ text: 'OK', onPress: () => router.replace('/login') }]
                );

            try {
                const resBoxMovement = await fetch(`${desktopBaseURL}/api/box-movement/list`, { headers: { 'Authorization': token } });
                const resProductBoxMovement = await fetch(`${desktopBaseURL}/api/product-box-movement/list`, { headers: { 'Authorization': token } });

                if(!resBoxMovement.ok || !resProductBoxMovement.ok) {
                    if(resBoxMovement.status === 401 || resProductBoxMovement.status === 401) {
                        await AsyncStorage.removeItem('access_token');
                        return Alert.alert('Atenção', 'Sua sessão expirou! Faça login novamente!', 
                            [{ text: 'OK', onPress: () => router.replace('/login') }]
                        );
                    }
                    return Alert.alert('Atenção', 'Ocorreu um erro ao carregar os dados! Status: ' + resBoxMovement.status);
                }

                const dataBoxMovement: BoxMovementListResponse[] = await resBoxMovement.json();
                const dataProductBoxMovement: ProductBoxMovementListResponse[] = await resProductBoxMovement.json();

                setBoxMovements(dataBoxMovement);
                setProductBoxMovement(dataProductBoxMovement);
            } catch (error) {
                return Alert.alert('Atenção', `Erro ao carregar as movimentações: ${error}`);
            }
        }
        loadMovements();
    }, []);

    return (
        <ThemedView lightColor="#fff" darkColor="#0D0D12" style={styles.container}>
            <ThemedView lightColor="#f1f1f1ff" darkColor="#18181B" style={styles.cardMovement}>
                <ThemedText style={styles.cardMovementTitle}>
                    Movimentações de Produtos
                </ThemedText>
                <ThemedView lightColor="#000" darkColor="#fff" style={styles.line} />
                <ScrollView 
                    style={styles.cardMovementScroll}
                    contentContainerStyle={styles.cardMovementScrollContent}
                >
                    {productBoxMovement.map((productBoxMovement, index) => (
                        <TouchableOpacity
                            onPress={() => router.push({ pathname: '/(tabs)/movement/details-product-box-movement', params: { id: productBoxMovement.id } })} 
                            key={index}
                        >
                            <ItemProductBoxMovementList key={index} productBoxMovement={productBoxMovement} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </ThemedView>
            <ThemedView lightColor="#f1f1f1ff" darkColor="#18181B" style={styles.cardMovement}>
                <ThemedText style={styles.cardMovementTitle}>
                    Movimentações de Caixas
                </ThemedText>
                <ThemedView lightColor="#000" darkColor="#fff" style={styles.line} />
                <ScrollView 
                    style={styles.cardMovementScroll}
                    contentContainerStyle={styles.cardMovementScrollContent}
                >
                {boxMovements.map((boxMovement, index) => (
                    <TouchableOpacity
                        onPress={() => router.push({ pathname: '/(tabs)/movement/details-box-movement', params: { id: boxMovement.id } })} 
                        key={index}
                    >
                        <ItemBoxMovementList key={index} boxMovement={boxMovement} />
                    </TouchableOpacity>
                ))}
                </ScrollView>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        gap: 15
    },
    cardMovement: {
        width: "100%",
        flex: 1,
        borderRadius: 6,
        elevation: 4
    },
    cardMovementTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10
    },
    cardMovementScroll: {
        paddingHorizontal: 10,
        marginVertical: 10
    },
    cardMovementScrollContent: {
        gap: 15,
        paddingVertical: 10
    },
    line: {
        height: 1,
        width: "100%"
    }
});