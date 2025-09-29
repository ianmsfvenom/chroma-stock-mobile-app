import BasicDropdown from "@/components/basic-dropdown";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { desktopBaseURL } from "@/constants/url";
import { BoxDetailsResponse, BoxListResponse, CreateProductBoxMovementResponse, ProductInBoxDetailsResponse, ProductListResponse, ProductMovementsBoxDetailsResponse } from "@/types/response";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import fetch from 'node-fetch';
import { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";

interface TransferProductInBoxProps {
    visible: boolean;
    setVisible: (value: boolean) => void;
    box_id: string | string[];

    productInBoxData: ProductInBoxDetailsResponse[];
    setProductInBoxData: (value: ProductInBoxDetailsResponse[]) => void;

    productBoxMovementData: ProductMovementsBoxDetailsResponse[]
    setProductBoxMovementData: (value: ProductMovementsBoxDetailsResponse[]) => void
}

export default function TransferProductInBox(props: TransferProductInBoxProps) {
    const { visible, box_id, setVisible } = props;

    const [productId, setProductId] = useState<string>('');
    const [productsData, setProductsData] = useState<{ label: string; value: string }[]>([]);

    const [obs, setObs] = useState<string>();
    const [disabledButton, setDisabledButton] = useState<boolean>(false);

    const [destinationBoxId, setDestinationBoxId] = useState<string>('');
    const [destinationBoxData, setDestinationBoxData] = useState<{ label: string; value: string }[]>([]);

    const [quantity, setQuantity] = useState<string>();
    const theme = useColorScheme();


    const loadProducts = async () => {
        const token = await AsyncStorage.getItem('access_token');
        if (!token) {
            await AsyncStorage.removeItem('access_token');
            Alert.alert('Atenção', 'Sua sessão expirou!');
            return router.replace('/login');
        };
        try {
            const resProductList = await fetch(`${desktopBaseURL}/api/box/details/${box_id}`, { headers: { 'Authorization': token } });
            if (!resProductList.ok) {
                if (resProductList.status === 401) {
                    await AsyncStorage.removeItem('access_token');
                    Alert.alert('Atenção', 'Sua sessão expirou!');
                    return router.replace('/login');
                }
                return Alert.alert('Atenção', 'Ocorreu um erro ao carregar os dados! Status: ' + resProductList.status);
            }
            const dataProductList: BoxDetailsResponse = await resProductList.json();
            setProductsData(dataProductList.products_in_box.map((product) => ({ label: `Nome: ${product.product_name}\nQnt: ${product.quantity}`, value: product.id.toString() })));


            const resBoxList = await fetch(`${desktopBaseURL}/api/box/list`, { headers: { 'Authorization': token } });
            const dataBoxList: BoxListResponse[] = await resBoxList.json();
            const filteredBoxList = dataBoxList.filter((box) => box.id !== Number(box_id));
            setDestinationBoxData(filteredBoxList.map((box) => ({ label: box.code, value: box.id.toString() })));
        } catch (error) {
            return Alert.alert('Atenção', `Erro ao carregar os dados: ${error}`);
        }
    }


    useEffect(() => {
        if (visible) loadProducts();
    }, [visible])

    const handleSubmitButton = async () => {
        if (!quantity || !productId || productId == '' || !destinationBoxId || destinationBoxId == '')
            return Alert.alert('Atenção', 'Preencha todos os campos!');
        setDisabledButton(true);
        const token = await AsyncStorage.getItem('access_token');
        if (!token) {
            AsyncStorage.removeItem('access_token');
            Alert.alert('Atenção', 'Sua sessão expirou!');
            setDisabledButton(false);
            setVisible(false);
            return router.replace('/login');
        };
        try {
            const resTransferProduct = await fetch(`${desktopBaseURL}/api/box/product-box-movement/transfer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    origin_box_id: Number(box_id),
                    destination_box_id: Number(destinationBoxId),
                    product_id: Number(productId),
                    amount: Number(quantity),
                    obs: obs
                })
            });

            if (!resTransferProduct.ok) {
                if (resTransferProduct.status === 401) {
                    await AsyncStorage.removeItem('access_token');
                    Alert.alert('Atenção', 'Sua sessão expirou!');
                    setDisabledButton(false);
                    setVisible(false);
                    return router.replace('/login');
                }
                setDisabledButton(false);
                const transferProductData = await resTransferProduct.json();
                return Alert.alert('Atenção', `Ocorreu um erro ao transferir o produto!\nStatus: ${resTransferProduct.status}\nMensagem: ${transferProductData.message}`);
            }

            const transferProductData: CreateProductBoxMovementResponse = await resTransferProduct.json();

            props.setProductBoxMovementData([{
                id: transferProductData.id,
                origin_box_code: transferProductData.origin_box_code,
                destination_box_code: transferProductData.destination_box_code,
                movement_type: transferProductData.movement_type,
                product_name: transferProductData.product_name,
                image_url: transferProductData.product_image_url,
                moved_at: transferProductData.moved_at,
                author: transferProductData.author,
                obs: transferProductData.obs
            }, ...props.productBoxMovementData]);

            const hasProductInBox = props.productInBoxData.some(product => product.id == Number(productId));
            if (hasProductInBox) {
                for (const i in props.productInBoxData) {
                    const product = props.productInBoxData[i];
                    if (product.id != Number(productId)) continue
                    props.productInBoxData[i].quantity -= Number(quantity);
                    if (props.productInBoxData[i].quantity <= 0) props.productInBoxData.splice(Number(i), 1);
                    props.setProductInBoxData([...props.productInBoxData]);
                }
            }

            Alert.alert('Sucesso', 'Produto transferido com sucesso!', [{
                text: 'OK',
                onPress: () => {
                    setObs('');
                    setProductId('');
                    setQuantity('');
                    setDestinationBoxId('');
                    setDisabledButton(false);
                    setVisible(false);
                    loadProducts();
                }
            }], {
                cancelable: false
            });
        } catch (error) {
            return Alert.alert('Atenção', `Erro ao transferir o produto: ${error}`);
        }
    }

    return (
        <Modal
            animationType="fade"
            visible={visible}
            onRequestClose={() => setVisible(false)}
            transparent={true}
        >
            <View style={styles.container}>
                <ThemedView style={styles.cardForm} lightColor="#fff" darkColor="#18181B">
                    <View style={styles.cardHeader}>
                        <ThemedText style={styles.cardTitle}>Transferir Produto</ThemedText>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Ionicons size={28} name="close-outline" color={theme === 'light' ? '#000' : '#fff'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cardBody}>
                        <View style={styles.inputGroup}>
                            <ThemedText style={styles.inputLabel}>Produto:</ThemedText>
                            <BasicDropdown
                                placeholder="Selecione um produto..."
                                data={productsData}
                                value={productId}
                                setOnChange={(value) => setProductId(value.value)}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <ThemedText style={styles.inputLabel}>Produto:</ThemedText>
                            <BasicDropdown
                                placeholder="Selecione a caixa de destino..."
                                data={destinationBoxData}
                                value={destinationBoxId}
                                setOnChange={(value) => setDestinationBoxId(value.value)}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <ThemedText style={styles.inputLabel}>Quantidade:</ThemedText>
                            <TextInput
                                style={styles.textInput}
                                placeholderTextColor={'#828282'}
                                placeholder="Digite a quantidade..."
                                keyboardType="numeric"
                                value={quantity}
                                onChangeText={(value) => setQuantity(value)}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <ThemedText style={styles.inputLabel}>Observação:</ThemedText>
                            <TextInput
                                style={styles.textInput}
                                placeholderTextColor={'#828282'}
                                placeholder="Observação..."
                                value={obs}
                                onChangeText={(value) => setObs(value)}
                            />
                        </View>
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity
                                style={[styles.button, theme === 'dark' ? styles.darkButton : styles.lightButton]}
                                onPress={handleSubmitButton}
                                disabled={disabledButton}
                            >
                                <ThemedText style={[styles.buttonText, theme === 'dark' ? styles.darkButtonText : styles.lightButtonText]}>Transferir</ThemedText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ThemedView>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    cardForm: {
        width: '90%',
        borderRadius: 6,
        padding: 15
    },

    cardHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    cardBody: {
        marginTop: 10
    },

    inputLabel: {
        fontSize: 14
    },

    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 10
    },

    textInput: {
        height: 30,
        fontSize: 16,
        width: '100%',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#828282',
        color: '#828282',
        backgroundColor: '#D9D9D9',
        paddingVertical: 0
    },

    buttonGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20
    },

    darkButton: {
        backgroundColor: '#222733',
        borderColor: '#9ACAFF',
    },
    lightButton: {
        borderColor: '#222733',
        backgroundColor: '#9ACAFF',
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 30,
        borderRadius: 4,
        borderWidth: 1
    },

    darkButtonText: {
        color: '#9ACAFF'
    },
    lightButtonText: {
        color: '#222733'
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold'
    }
})