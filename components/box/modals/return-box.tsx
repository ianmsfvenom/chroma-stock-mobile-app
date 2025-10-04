import { refreshBoxData } from "@/app/(tabs)/box";
import BasicDropdown from "@/components/basic-dropdown";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { desktopBaseURL } from "@/constants/url";
import { CreateBoxMovementResponse } from "@/types/responses/box-movement-response";
import { BoxDetailsResponse, BoxMovementBoxDetailsResponse } from "@/types/responses/box-response";
import { DepositResponse } from "@/types/responses/deposit-response";
import { LocationResponse } from "@/types/responses/location-response";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, TouchableOpacity, useColorScheme, View } from "react-native";

interface ReturnBoxProps {
    box_id: string | string[];

    visible: boolean;
    setVisible: (value: boolean) => void

    boxMovementData: BoxMovementBoxDetailsResponse[];
    setBoxMovementData: (value: BoxMovementBoxDetailsResponse[]) => void

    details: BoxDetailsResponse | undefined;
    setDetails: (value: BoxDetailsResponse) => void
}

export default function ReturnBox(props: ReturnBoxProps) {
    const { visible, setVisible, boxMovementData, box_id, setBoxMovementData, details, setDetails } = props;
    const theme = useColorScheme();
    
    const [ depositData, setDepositData ] = useState<DepositResponse[]>([]);
    const [ locationData, setLocationData ] = useState<LocationResponse[]>([]);

    const [ depositId, setDepositId ] = useState<string>('');
    const [ locationId, setLocationId ] = useState<string>('');

    const [ disabledButton, setDisabledButton ] = useState<boolean>(false);
    
    const [ filteredLocationData, setFilteredLocationData ] = useState<LocationResponse[]>([]);

    useEffect(() => {
        if(!visible) return

        const loadDeposits = async () => {
            const token = await AsyncStorage.getItem('access_token');
            if (!token) {
                await AsyncStorage.removeItem('access_token');
                Alert.alert('Atenção', 'Sua sessão expirou! Faça login novamente!');
                return router.replace('/login');
            };
            try {
                const resDepositList = await fetch(`${desktopBaseURL}/api/deposit/list`, { headers: { 'Authorization': token } });
                if (!resDepositList.ok) {
                    if (resDepositList.status === 401) {
                        await AsyncStorage.removeItem('access_token');
                        Alert.alert('Atenção', 'Sua sessão expirou! Faça login novamente!');
                        return router.replace('/login');
                    };
                    Alert.alert('Atenção', 'Erro ao carregar depósitos! Status: ' + resDepositList.status);
                };
                const dataDepositList: DepositResponse[] = await resDepositList.json();
                setDepositData(dataDepositList);

                const resLocationList = await fetch(`${desktopBaseURL}/api/location/list`, { headers: { 'Authorization': token } });
                if (!resLocationList.ok) {
                    if (resLocationList.status === 401) {
                        await AsyncStorage.removeItem('access_token');
                        Alert.alert('Atenção', 'Sua sessão expirou! Faça login novamente!');
                        return router.replace('/login');
                    };
                    Alert.alert('Atenção', 'Erro ao carregar localizações! Status: ' + resDepositList.status);
                }
                const dataLocationList: LocationResponse[] = await resLocationList.json();
                setLocationData(dataLocationList);
            } catch (error) {
                return Alert.alert('Atenção', `Erro ao carregar depósitos: ${error}`);
            }
        }
        loadDeposits();

    }, [visible]);

    const onChangeDeposit = (depositId: string) => {
        setDepositId(depositId);
        const filteredLocations = locationData.filter(location => location.deposit_id === parseInt(depositId));
        setFilteredLocationData(filteredLocations);
    }

    const handleSubmitButton = async () => {
        setDisabledButton(true);
        const token = await AsyncStorage.getItem('access_token');
        if (!token) {
            await AsyncStorage.removeItem('access_token');
            Alert.alert('Atenção', 'Sua sessão expirou! Faça login novamente!');
            setDepositId('');
            setLocationId('');
            setDisabledButton(false);
            setVisible(false);
            return router.replace('/login');
        };
        
        try {
            const response = await fetch(`${desktopBaseURL}/api/box/box-movement/return`, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    box_id: box_id,
                    location_id: locationId
                })
            });

            if (!response.ok) {
                setDepositId('');
                setLocationId('');
                setDisabledButton(false);
                setVisible(false);
                if (response.status === 401) {
                    await AsyncStorage.removeItem('access_token');
                    Alert.alert('Atenção', 'Sua sessão expirou! Faça login novamente!');
                    return router.replace('/login');
                }
                return Alert.alert('Atenção', 'Ocorreu um erro ao retornar a caixa! Status: ' + response.status);
            }
            const data: CreateBoxMovementResponse = await response.json();
            
            Alert.alert('Sucesso', 'Caixa retornada ao estoque com sucesso!');
            setBoxMovementData([
                {
                    id: data.id,
                    author: data.author,
                    destination_deposit: data.destination_deposit,
                    destination_location: data.destination_location,
                    origin_deposit: data.origin_deposit,
                    origin_location: data.origin_location,
                    movement_type: data.movement_type,
                    obs: data.obs,
                    moved_at: data.moved_at
                },
                ...boxMovementData
            ])

            if(!details) return;
            setDetails({
                ...details,
                actual_deposit: data.destination_deposit,
                actual_location: data.destination_location,
                status: 'in stock'
            });

            refreshBoxData();
        } catch (error) {
            return Alert.alert('Atenção', `Erro ao retornar a caixa: ${error}`);
        } finally {
            setDisabledButton(false);
            setVisible(false);
            setDepositId('');
            setLocationId('');
        }
    }

    return (
        <Modal
            visible={visible}
            onRequestClose={() => setVisible(false)}
            animationType="fade"
            transparent={true}
        >
            <View style={styles.container}>
                <ThemedView style={styles.cardForm} lightColor="#fff" darkColor="#18181B">
                    <View style={styles.cardHeader}>
                        <ThemedText style={styles.cardTitle}>Retornar Caixa</ThemedText>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Ionicons size={28} name="close-outline" color={theme === 'light' ? '#000' : '#fff'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cardBody}>
                        <View style={styles.inputGroup}>
                            <ThemedText style={styles.inputLabel}>Depósito:</ThemedText>
                            <BasicDropdown 
                                data={depositData.map(deposit => ({ value: deposit.id.toString(), label: deposit.name }))}
                                placeholder="Selecione um depósito..."
                                value={depositId}
                                setOnChange={(value) => onChangeDeposit(value.value)}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <ThemedText style={styles.inputLabel}>Localização:</ThemedText>
                            <BasicDropdown 
                                data={filteredLocationData.map(location => ({ value: location.id.toString(), label: `R${location.aisle}-E${location.shelf}-P${location.rack} (${location.status})` }))}
                                placeholder="Selecione uma localização..."
                                value={locationId}
                                setOnChange={(value) => setLocationId(value.value)}
                            />
                        </View>
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity
                                style={[styles.button, theme === 'dark' ? styles.darkButton : styles.lightButton]}
                                onPress={handleSubmitButton}
                                disabled={disabledButton}
                            >
                                <ThemedText style={[styles.buttonText, theme === 'dark' ? styles.darkButtonText : styles.lightButtonText]}>Retornar</ThemedText>
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

    buttonGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20
    },

    darkButton: {
        backgroundColor: '#162C23',
        borderColor: '#7BF2A8',
    },
    lightButton: {
        borderColor: '#162C23',
        backgroundColor: '#7BF2A8',
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 30,
        borderRadius: 4,
        borderWidth: 1
    },

    darkButtonText: {
        color: '#7BF2A8'
    },
    lightButtonText: {
        color: '#162C23'
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold'
    }
});