import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { BoxMovementDetailsResponse } from "@/types/response";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";

export default function DetailsMovementScreen() {
    const { id } = useLocalSearchParams();
    const [ details, setDetails ] = useState<BoxMovementDetailsResponse>();
    const theme = useColorScheme();

    useEffect(() => {
        const loadMovementDetails = async () => {
            const token = await AsyncStorage.getItem('access_token');
            if (!token) 
                return Alert.alert('Atenção', 'Sua sessão expirou! Faça login novamente!', [{ text: 'OK', onPress: () => router.replace('/login') }]);

            try {
                const resMovementDetails = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/box-movement/details/${id}`, {
                    headers: { 'Authorization': token }
                });
                if (!resMovementDetails.ok) {
                    if(resMovementDetails.status === 401) {
                        await AsyncStorage.removeItem('access_token');
                        return Alert.alert('Atenção', 'Sua sessão expirou! Faça login novamente!', [{ text: 'OK', onPress: () => router.replace('/login') }]);
                    }
                    return Alert.alert('Atenção', 'Ocorreu um erro ao carregar os dados! Status: ' + resMovementDetails.status);
                }

                const dataMovementDetails: BoxMovementDetailsResponse = await resMovementDetails.json();
                setDetails(dataMovementDetails);
            } catch (error) {
                Alert.alert('Erro', `Erro ao carregar detalhes da movimentação: ${error}`);
            }
        }
        loadMovementDetails();
    }, [id]);

    return (
        <ThemedView lightColor="#fff" darkColor="#0D0D12" style={styles.container}>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentScrollContainer}>
                <ThemedView lightColor="#f1f1f1ff" darkColor="#18181B" style={styles.cardDetailMovement}>
                    <ThemedText lightColor="#000" darkColor="#fff" style={styles.cardDetailTitle}>Detalhes da Movimentação</ThemedText>
                    <ThemedView lightColor="#000" darkColor="#fff" style={styles.line} />
                    <ThemedView style={styles.infoCard}>
                        <ThemedView style={styles.infoGroup}>
                            <ThemedText style={styles.infoLabel}>Tipo de Movimentação: 
                                <ThemedText style={styles.infoLabelData}> { 
                                    details?.movement_type === 'transfer' ? 'Transferência' : 
                                    details?.movement_type === 'stock in' ? 'Entrada' : 
                                    details?.movement_type === 'stock out' ? 'Saida' : 'Desconhecido' 
                                }</ThemedText>
                            </ThemedText>
                            <ThemedText style={styles.infoLabel}>Movimentado em:
                                <ThemedText style={styles.infoLabelData}> {(new Date(details?.moved_at || '')).toLocaleString()}</ThemedText>
                            </ThemedText>
                            <ThemedText style={styles.infoLabel}>Autor:
                                <ThemedText style={styles.infoLabelData}> {details?.author}</ThemedText>
                            </ThemedText>
                            <ThemedText style={styles.infoLabel}>Caixa:
                                <ThemedText style={styles.infoLabelData}> {details?.box.code}</ThemedText>
                            </ThemedText>
                            <ThemedText>Observação: {details?.obs}</ThemedText>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>
                <ThemedView lightColor="#f1f1f1ff" darkColor="#18181B" style={styles.cardDetailMovement}>
                    <ThemedText lightColor="#000" darkColor="#fff" style={styles.cardDetailTitle}>Detalhes da Caixa</ThemedText>
                    <ThemedView lightColor="#000" darkColor="#fff" style={styles.line} />
                    <ThemedView style={styles.infoCard}>
                        <ThemedView style={styles.infoGroup}>
                            <ThemedText style={styles.infoLabel}>Código:
                                <ThemedText style={styles.infoLabelData}> {details?.box.code}</ThemedText>
                            </ThemedText>
                            <ThemedText style={styles.infoLabel}>Tipo de caixa:
                                <ThemedText style={styles.infoLabelData}> {details?.box.type_box}</ThemedText>
                            </ThemedText>
                            <ThemedText style={styles.infoLabel}>Status:
                                <ThemedText style={styles.infoLabelData}> {details?.box.status === 'in stock' ? 'Em estoque' : 'Fora de estoque'}</ThemedText>
                            </ThemedText>
                            <ThemedText style={styles.infoLabel}>Depósito Atual:
                                <ThemedText style={styles.infoLabelData}> {details?.box.actual_deposit}</ThemedText>
                            </ThemedText>
                            <ThemedText style={styles.infoLabel}>Localização Atual:
                                <ThemedText style={styles.infoLabelData}> {details?.box.actual_location}</ThemedText>
                            </ThemedText>
                            <ThemedText style={styles.infoLabel}>Observação:
                                <ThemedText style={styles.infoLabelData}> {details?.box.obs}</ThemedText>
                            </ThemedText>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>
                <ThemedView lightColor="#f1f1f1ff" darkColor="#18181B" style={styles.cardDetailMovement}>
                    <ThemedText lightColor="#000" darkColor="#fff" style={styles.cardDetailTitle}>Detalhes da Origem</ThemedText>
                    <ThemedView lightColor="#000" darkColor="#fff" style={styles.line} />
                    <ThemedView style={styles.infoCard}>
                        <ThemedView style={styles.infoGroup}>
                            <ThemedText style={styles.infoLabel}>Depósito:
                                <ThemedText style={styles.infoLabelData}> {details?.origin_deposit || 'N/A'}</ThemedText>
                            </ThemedText>
                            <ThemedText style={styles.infoLabel}>Localização:
                                <ThemedText style={styles.infoLabelData}> {details?.origin_location || 'N/A'}</ThemedText>
                            </ThemedText>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>
                <ThemedView lightColor="#f1f1f1ff" darkColor="#18181B" style={styles.cardDetailMovement}>
                    <ThemedText lightColor="#000" darkColor="#fff" style={styles.cardDetailTitle}>Detalhes do Destino</ThemedText>
                    <ThemedView lightColor="#000" darkColor="#fff" style={styles.line} />
                    <ThemedView style={styles.infoCard}>
                        <ThemedView style={styles.infoGroup}>
                            <ThemedText style={styles.infoLabel}>Depósito:
                                <ThemedText style={styles.infoLabelData}> {details?.destination_deposit || 'N/A'}</ThemedText>
                            </ThemedText>
                            <ThemedText style={styles.infoLabel}>Localização:
                                <ThemedText style={styles.infoLabelData}> {details?.destination_location || 'N/A'}</ThemedText>
                            </ThemedText>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>
                <ThemedView style={styles.buttonView}>
                    <TouchableOpacity style={[styles.backButton, theme === 'dark' ? styles.backButtonDark : styles.backButtonLight]} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={18} color={theme === 'dark' ? '#FF3F3F' : '#2C1616'} />
                        <ThemedText lightColor="#2C1616" darkColor="#FF3F3F" style={styles.backButtonLabel}>Voltar</ThemedText>
                    </TouchableOpacity>
                </ThemedView>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },

    cardDetailMovement: {
        width: "100%",
        borderRadius: 4,
        elevation: 5,
    },

    cardDetailTitle: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 15,
    },
    
    line: {
        width: "100%",
        height: 1
    },

    scrollContainer: {
        width: "100%",
        height: "100%",
    },

    contentScrollContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 20,
        paddingHorizontal: 10,
        paddingVertical: 15,
    },

    infoCard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: 'transparent',
        width: '100%'
    },
    infoGroup: {
        flex: 1,
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column'
    },

    infoLabel: {
        fontSize: 16,
        marginBottom: 5
    },

    infoLabelData: {
        fontWeight: 'bold',
        fontSize: 16
    },
    buttonView: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
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
});