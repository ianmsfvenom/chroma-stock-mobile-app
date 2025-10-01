import ItemBoxMovementList from "@/components/box/item-box-movement-list";
import ItemProductBoxMovementList from "@/components/box/item-product-box-movement-list";
import ItemProductInBoxList from "@/components/box/item-product-in-box-list";
import AddProductInBox from "@/components/box/modals/add-product-in-box";
import RemoveProductInBox from "@/components/box/modals/remove-product-in-box";
import ReturnBox from "@/components/box/modals/return-box";
import TransferBox from "@/components/box/modals/transfer-box";
import TransferProductInBox from "@/components/box/modals/transfer-product-in-box";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { desktopBaseURL } from "@/constants/url";
import { BoxDetailsResponse, BoxMovementBoxDetailsResponse, CreateBoxMovementResponse, ProductInBoxDetailsResponse, ProductMovementsBoxDetailsResponse } from "@/types/response";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, TouchableOpacity, useColorScheme, View } from "react-native";
import { refreshBoxData } from ".";

export default function DetailsBoxScreen() {
    const { id } = useLocalSearchParams();
    const [ details, setDetails ] = useState<BoxDetailsResponse>();
    const [ productInBoxData, setProductInBoxData ] = useState<ProductInBoxDetailsResponse[]>([]);
    const [ productBoxMovementData, setProductBoxMovementData ] = useState<ProductMovementsBoxDetailsResponse[]>([]);
    const [ boxMovementData, setBoxMovementData ] = useState<BoxMovementBoxDetailsResponse[]>([]);


    const [ visibleAddProductInBox, setVisibleAddProductInBox ] = useState<boolean>(false);
    const [ visibleRemoveProductInBox, setVisibleRemoveProductInBox ] = useState<boolean>(false);
    const [ visibleTransferProductInBox, setVisibleTransferProductInBox ] = useState<boolean>(false);
    const [ visibleTransferBox , setVisibleTransferBox ] = useState<boolean>(false);
    const [ visibleReturnBox , setVisibleReturnBox ] = useState<boolean>(false);

    const theme = useColorScheme();

    useEffect(() => {
        const getBoxDetails = async () => {
            const token = await AsyncStorage.getItem('access_token');
            if (!token) 
                return Alert.alert('Atenção', 'Sua sessão expirou! Faça login novamente!', [{ text: 'OK', onPress: () => router.replace('/login') }]);
            
            try {
                const response = await fetch(`${desktopBaseURL}/api/box/details/${id}`, { headers: { 'Authorization': token } });
                if (!response.ok) {
                    if (response.status === 401) {
                        await AsyncStorage.removeItem('access_token');
                        Alert.alert('Atenção', 'Sua sessão expirou! Faça login novamente!');
                        return router.replace('/login');
                    }
                    return Alert.alert('Atenção', 'Ocorreu um erro ao carregar os dados! Status: ' + response.status);
                }
                const data: BoxDetailsResponse = await response.json();
                setDetails(data);
                setProductInBoxData(data.products_in_box);
                setProductBoxMovementData(data.product_box_movements);
                setBoxMovementData(data.box_movements);
            } catch (error) {
                return Alert.alert('Atenção', `Erro ao carregar os detalhes da caixa: ${error}`);
            }
        }

        getBoxDetails();
    }, [id]);

    const handleAddProductInBox = () => {
        setVisibleRemoveProductInBox(false);
        setVisibleTransferProductInBox(false);
        setVisibleAddProductInBox(true);
    }
    const handleRemoveProductInBox = () => {
        setVisibleRemoveProductInBox(true);
        setVisibleTransferProductInBox(false);
        setVisibleAddProductInBox(false);
        setVisibleTransferBox(false);
    }
    const handleTransferProductInBox = () => {
        setVisibleRemoveProductInBox(false);
        setVisibleTransferProductInBox(true);
        setVisibleAddProductInBox(false);
        setVisibleTransferBox(false);
    }


    const handleTransferBox = () => {
        setVisibleRemoveProductInBox(false);
        setVisibleTransferProductInBox(false);
        setVisibleAddProductInBox(false);
        setVisibleTransferBox(true);
    }
    const handleReturnBox = () => {
        setVisibleAddProductInBox(false);
        setVisibleRemoveProductInBox(false);
        setVisibleTransferProductInBox(false);
        setVisibleTransferBox(false);
        setVisibleReturnBox(true);
    }
    const handleRemoveBox = () => {
        Alert.alert('Tem certeza?', 'Deseja realmente remover a caixa do estoque?', [{ 
            text: 'Não',
            style: 'cancel'
        },{ 
            text: 'Sim', 
            onPress: async () => {
                const token = await AsyncStorage.getItem('access_token');
                if (!token) {
                    Alert.alert('Atenção', 'Sua sessão expirou! Faça login novamente!');
                    return router.replace('/login');
                }
                const resRemoveBox = await fetch(`${desktopBaseURL}/api/box/box-movement/remove`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify({
                        box_id: id
                    })
                });

                if(!resRemoveBox.ok) {
                    if(resRemoveBox.status === 401) {
                        await AsyncStorage.removeItem('access_token');
                        return Alert.alert('Atenção', 'Sua sessão expirou! Faça login novamente!', 
                            [{ text: 'OK', onPress: () => router.replace('/login') }]
                        );
                    }
                    return Alert.alert('Atenção', 'Ocorreu um erro ao remover a caixa! Status: ' + resRemoveBox.status);
                }

                Alert.alert('Sucesso', 'Caixa removida com sucesso!');
                if(!details) return;
                const editedDetails: BoxDetailsResponse = {
                    ...details,
                    status: 'out of stock',
                    actual_deposit: 'Fora de estoque',
                    actual_location: 'Fora de estoque'
                }
                setDetails(editedDetails);

                const removeBoxData: CreateBoxMovementResponse = await resRemoveBox.json();
                setBoxMovementData([{
                    id: removeBoxData.id,
                    movement_type: removeBoxData.movement_type,
                    author: removeBoxData.author,
                    destination_deposit: removeBoxData.destination_deposit,
                    destination_location: removeBoxData.destination_location,
                    origin_deposit: removeBoxData.origin_deposit,
                    origin_location: removeBoxData.origin_location,
                    obs: removeBoxData.obs,
                    moved_at: removeBoxData.moved_at
                }, ...boxMovementData]);
                
                refreshBoxData();
            }
        }], {
            cancelable: true
        });
    }

    return (
        <ThemedView lightColor="#fff" darkColor="#0D0D12" style={styles.container}>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
                <ThemedView style={styles.cardDetailBox} lightColor="#f1f1f1ff" darkColor="#18181B">
                    <View style={styles.infoBox}>
                        <ThemedText style={styles.infoBoxTitle}>Informações da Caixa</ThemedText>
                        <View style={styles.infoBoxDivider}>
                            <View style={styles.infoBoxGroup}>
                                <ThemedText style={styles.detailsLabel}>Código:
                                    <ThemedText style={[{ fontWeight: 'bold' }, styles.detailsLabel]}> {details?.code}</ThemedText>
                                </ThemedText>
                                <ThemedText style={styles.detailsLabel}>Tipo:
                                    <ThemedText style={[{ fontWeight: 'bold' }, styles.detailsLabel]}> {details?.type_box}</ThemedText>
                                </ThemedText>
                                <ThemedText style={styles.detailsLabel}>Status:
                                    <ThemedText style={[{ fontWeight: 'bold' }, styles.detailsLabel]}> {details?.status === 'in stock' ? ' Em estoque' : ' Fora de estoque'}</ThemedText>
                                </ThemedText>
                                <ThemedText style={styles.detailsLabel}>Última movimentação:
                                    <ThemedText style={[{ fontWeight: 'bold' }, styles.detailsLabel]}> {details?.moved_at ? new Date(details?.moved_at).toLocaleString() : 'Nenhuma movimentação'}</ThemedText>
                                </ThemedText>
                            </View>

                            <View style={styles.infoBoxGroup}>
                                <ThemedText style={styles.detailsLabel}>Depósito atual:
                                    <ThemedText style={[{ fontWeight: 'bold' }, styles.detailsLabel]}> {details?.actual_deposit}</ThemedText>
                                </ThemedText>
                                <ThemedText style={styles.detailsLabel}>Localização atual:
                                    <ThemedText style={[{ fontWeight: 'bold' }, styles.detailsLabel]}> {details?.actual_location}</ThemedText>
                                </ThemedText>
                                
                                <ThemedText style={styles.detailsLabel}>Reponsável:
                                    <ThemedText style={[{ fontWeight: 'bold' }, styles.detailsLabel]}> {details?.moved_by}</ThemedText>
                                </ThemedText>
                            </View>
                        </View>

                        <ThemedText style={[styles.detailsLabel, { marginTop: 5 }]}>Observações:
                            <ThemedText style={{ fontWeight: 'bold' }}> {details?.obs}</ThemedText>
                        </ThemedText>
                    </View>
                </ThemedView>
                <ThemedView style={styles.cardDetailBox} lightColor="#f1f1f1ff" darkColor="#18181B">
                    <View style={styles.productsInBox}>
                        <ThemedText style={styles.productsInBoxTitle}>Produtos na Caixa</ThemedText>
                        <View style={styles.actionsButton}>
                            <TouchableOpacity 
                                onPress={handleAddProductInBox} 
                                style={[styles.productInBoxButton, theme === 'dark' ? styles.addProductInBoxButtonDark : styles.addProductInBoxButtonLight]}
                            >
                                <ThemedText style={{ fontSize: 12, color: theme == 'dark' ? '#7BF2A8' : '#162C23' }}>Adicionar</ThemedText>
                                <Ionicons name="add-circle-outline" size={20} color={theme == 'dark' ? '#7BF2A8' : '#162C23'} />
                            </TouchableOpacity>
                             <TouchableOpacity 
                                onPress={handleRemoveProductInBox} 
                                style={[styles.productInBoxButton, theme === 'dark' ? styles.removeProductInBoxButtonDark : styles.removeProductInBoxButtonLight]}
                            >
                                <ThemedText style={{ fontSize: 12, color: theme == 'dark' ? '#FF3F3F' : '#2C1616' }}>Remover</ThemedText>
                                <Ionicons name="remove-circle-outline" size={20} color={theme == 'dark' ? '#FF3F3F' : '#2C1616'} />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={handleTransferProductInBox} 
                                style={[styles.productInBoxButton, theme === 'dark' ? styles.transferProductInBoxButtonDark : styles.transferProductInBoxButtonLight]}
                            >
                                <ThemedText style={{ fontSize: 12, color: theme == 'dark' ? '#9ACAFF' : '#222733' }}>Transferir</ThemedText>
                                <Ionicons name="swap-horizontal-outline" size={20} color={theme == 'dark' ? '#9ACAFF' : '#222733'} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView 
                            style={styles.productsInBoxScroll} 
                            nestedScrollEnabled={true}
                            contentContainerStyle={styles.productsInBoxScrollContent}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        >
                            {productInBoxData?.map((product, index) => 
                                <ItemProductInBoxList 
                                    key={index} 
                                    product={product}
                                />
                            )}
                        </ScrollView>
                    </View>
                </ThemedView>
                <ThemedView style={styles.cardDetailBox} lightColor="#f1f1f1ff" darkColor="#18181B">
                    <View style={styles.productBoxMovement}>
                        <ThemedText style={styles.productBoxMovementTitle}>Movimentações de Produtos</ThemedText>
                        <ScrollView style={styles.productBoxMovementScroll} 
                            contentContainerStyle={styles.productBoxMovementScrollContent}
                            nestedScrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        >
                            {productBoxMovementData?.map((productBoxMovement, index) => 
                                <ItemProductBoxMovementList 
                                    key={index} 
                                    productBoxMovement={productBoxMovement}
                                />
                            )}
                        </ScrollView>
                    </View>
                </ThemedView>
                <ThemedView style={styles.cardDetailBox} lightColor="#f1f1f1ff" darkColor="#18181B">
                    <View style={styles.boxMovement}>
                        <ThemedText style={styles.boxMovementTitle}>Movimentações de Caixas</ThemedText>
                        <View style={styles.actionsButton}>
                            <TouchableOpacity 
                                onPress={handleRemoveBox} 
                                style={[
                                    details?.status === 'in stock' ? { display: 'flex' } : { display: 'none' },
                                    styles.productInBoxButton, 
                                    theme === 'dark' ? styles.removeProductInBoxButtonDark : styles.removeProductInBoxButtonLight
                                ]}
                            >
                                <ThemedText style={{ fontSize: 12, fontWeight: 'bold', color: theme == 'dark' ? '#FF3F3F' : '#2C1616' }}>Remover do estoque</ThemedText>
                                <Ionicons name="remove-circle-outline" size={20} color={theme == 'dark' ? '#FF3F3F' : '#2C1616'} />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={handleReturnBox} 
                                style={[
                                    details?.status === 'out of stock' ? { display: 'flex' } : { display: 'none' },
                                    styles.productInBoxButton, 
                                    theme === 'dark' ? styles.addProductInBoxButtonDark : styles.addProductInBoxButtonLight
                                ]}
                            >
                                <ThemedText style={{ fontSize: 12, fontWeight: 'bold', color: theme == 'dark' ? '#7BF2A8' : '#162C23' }}>Retornar do estoque</ThemedText>
                                <Ionicons name="return-up-back-outline" size={20} color={theme == 'dark' ? '#7BF2A8' : '#162C23'} />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={handleTransferBox} 
                                style={[
                                    details?.status === 'in stock' ? { display: 'flex' } : { display: 'none' },
                                    styles.productInBoxButton, 
                                    theme === 'dark' ? styles.transferProductInBoxButtonDark : styles.transferProductInBoxButtonLight
                                ]}
                            >
                                <ThemedText style={{ fontSize: 12, fontWeight: 'bold', color: theme == 'dark' ? '#9ACAFF' : '#222733' }}>Transferir caixa</ThemedText>
                                <Ionicons name="swap-horizontal-outline" size={20} color={theme == 'dark' ? '#9ACAFF' : '#222733'} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={styles.boxMovementScroll}
                            contentContainerStyle={styles.boxMovementScrollContent}
                            nestedScrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        >
                            {boxMovementData?.map((boxMovement, index) => 
                                <ItemBoxMovementList 
                                    key={index} 
                                    boxMovement={boxMovement}
                                />
                            )}
                        </ScrollView>
                    </View>
                </ThemedView>
            </ScrollView>
            <AddProductInBox 
                visible={visibleAddProductInBox} 
                setVisible={setVisibleAddProductInBox} 
                box_id={id}
                setProductInBoxData={setProductInBoxData}
                productInBoxData={productInBoxData || []}
                productBoxMovementData={productBoxMovementData || []}
                setProductBoxMovementData={setProductBoxMovementData}
            />
            <RemoveProductInBox 
                visible={visibleRemoveProductInBox} 
                setVisible={setVisibleRemoveProductInBox} 
                box_id={id}
                setProductInBoxData={setProductInBoxData}
                productInBoxData={productInBoxData || []}
                productBoxMovementData={productBoxMovementData || []}
                setProductBoxMovementData={setProductBoxMovementData}
            />
            <TransferProductInBox
                visible={visibleTransferProductInBox}
                setVisible={setVisibleTransferProductInBox}
                box_id={id}
                setProductInBoxData={setProductInBoxData}
                productInBoxData={productInBoxData || []}
                productBoxMovementData={productBoxMovementData || []}
                setProductBoxMovementData={setProductBoxMovementData}
            />
            <TransferBox
                visible={visibleTransferBox}
                setVisible={setVisibleTransferBox}
                box_id={id}
                boxMovementData={boxMovementData}
                setBoxMovementData={setBoxMovementData}
                details={details}
                setDetails={setDetails}
            />
            <ReturnBox
                box_id={id}
                visible={visibleReturnBox}
                setVisible={setVisibleReturnBox}
                boxMovementData={boxMovementData}
                setBoxMovementData={setBoxMovementData}
                details={details}
                setDetails={setDetails}
            />
        </ThemedView>

    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    scroll: {
        width: "100%",
        height: "100%"
    },
    scrollContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        paddingVertical: 20
    },
    cardDetailBox: {
        width: "95%",
        borderRadius: 6,
        elevation: 5,
    },
    detailsLabel: {
        fontSize: 12
    },


    infoBoxTitle: {
        fontSize: 18,
        lineHeight: 20,
        fontWeight: 'bold'
    },
    infoBox: {
        width: "100%",
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        padding: 15
    },
    infoBoxGroup: {
        width: "48%",
        maxWidth: '50%',
    },
    infoBoxDivider: {
        width: "100%",
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 10
    },


    productsInBox: {
        display: 'flex',
        flexDirection: 'column',
        width: "100%",
        height: 300
    },
    productsInBoxTitle: {
        fontSize: 18,
        lineHeight: 20,
        fontWeight: 'bold',
        padding: 15
    },
    productsInBoxScroll: {
        width: '100%',
        height: '100%',
        marginBottom: 15
    },
    productsInBoxScrollContent: {
        gap: 10,
        paddingHorizontal: 15,
        paddingBottom: 15
    },
    actionsButton: {
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        paddingHorizontal: 15,
        marginBottom: 15
    },
    productInBoxButton: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 5
    },
    addProductInBoxButtonLight: {
        backgroundColor: '#7BF2A8',
        borderColor: '#162C23',
    },
    addProductInBoxButtonDark: {
        borderColor: '#7BF2A8',
        backgroundColor: '#162C23',
    },
    removeProductInBoxButtonLight: {
        backgroundColor: '#FF3F3F',
        borderColor: '#2C1616',
    },
    removeProductInBoxButtonDark: {
        backgroundColor: '#2C1616',
        borderColor: '#FF3F3F',
    },
    transferProductInBoxButtonLight: {
        backgroundColor: '#9ACAFF',
        borderColor: '#222733',
    },
    transferProductInBoxButtonDark: {
        borderColor: '#9ACAFF',
        backgroundColor: '#222733',
    },    


    productBoxMovement: {
        display: 'flex',
        flexDirection: 'column',
        width: "100%",
        height: 300
    },
    productBoxMovementTitle: {
        fontSize: 18,
        lineHeight: 20,
        fontWeight: 'bold',
        padding: 15
    },
    productBoxMovementScroll: {
        width: '100%',
        height: '100%',
        marginBottom: 15
    },
    productBoxMovementScrollContent: {
        gap: 10,
        paddingHorizontal: 15,
        paddingBottom: 15
    },


    boxMovement: {
        display: 'flex',
        flexDirection: 'column',
        width: "100%",
        height: 300
    },
    boxMovementTitle: {
        fontSize: 18,
        lineHeight: 20,
        fontWeight: 'bold',
        padding: 15
    },
    boxMovementScroll: {
        width: '100%',
        height: '100%',
        marginBottom: 15
    },
    boxMovementScrollContent: {
        gap: 10,
        paddingHorizontal: 15,
        paddingBottom: 15
    },

});