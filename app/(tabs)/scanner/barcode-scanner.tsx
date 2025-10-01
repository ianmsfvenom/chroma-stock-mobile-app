
import { LoadingScren } from '@/components/scanner/modals/loading-screen';
import OverlayBarcode from '@/components/scanner/overlay-barcode';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { desktopBaseURL } from '@/constants/url';
import { ProductListResponse } from '@/types/response';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CameraView } from 'expo-camera';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';


const CAMERA_WIDTH = 300
const CAMERA_HEIGHT = 200

export default function BarcodeScanner() {
    const theme = useColorScheme()
    const [ scanned, setScanned ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const onScanned = async (data: string) => {
        setScanned(true);
        setLoading(true);

        const token = await AsyncStorage.getItem('access_token');
        if (!token) {
            setLoading(false);
            setScanned(false);
            return Alert.alert('Atenção', 'Credenciais não encontradas! Faça login novamente!', [{
                text: 'OK',
                onPress: () => router.replace('/login')
            }])
        };

        try {
            const resSearchProduct = await fetch(`${desktopBaseURL}/api/product/search-by-barcode/${data}`, { headers: { 'Authorization': token } });
            if (!resSearchProduct.ok) {
                if (resSearchProduct.status === 401) {
                    await AsyncStorage.removeItem('access_token');
                    setLoading(false);
                    setScanned(false);
                    return Alert.alert('Atenção', 'Sua sessão expirou! Faça login novamente!', 
                        [{ text: 'OK', onPress: () => router.replace('/login') }]
                    );
                }
                setLoading(false);
                return Alert.alert('Atenção', 'Ocorreu um erro ao pesquisar o produto! Status: ' + resSearchProduct.status, [{
                    text: 'OK',
                    onPress: () => setScanned(false)
                }]);
            }
            const dataSearchProduct: ProductListResponse = await resSearchProduct.json();
            setLoading(false);
            router.replace({
                pathname: '/(tabs)/product/details-product',
                params: { id: dataSearchProduct.id }
            });
            
            setTimeout(() => {
                setScanned(false);
            }, 1000);

        } catch (error) {
            setLoading(false);
            Alert.alert('Atenção', `Erro ao pesquisar o produto: ${error}`, [{
                text: 'OK',
                onPress: () => setScanned(false)
            }]);
        }
    };
    return (
        <ThemedView lightColor="#fff" darkColor="#0D0D12" style={styles.container}>
            <LoadingScren visible={loading} setVisible={setLoading} />

            <View style={styles.cameraGroup}>
                <ThemedText style={styles.cameraLabel}>Alinhe o código de barras dentro da moldura</ThemedText>
                <CameraView 
                    style={styles.viewCamera} 
                    onBarcodeScanned={({ data }) => {
                        if(!scanned) onScanned(data);
                    }}
                    barcodeScannerSettings={{ barcodeTypes: [ 'ean13', 'ean8' ] }}
                >
                    <OverlayBarcode />
                </CameraView>
            </View>
            
            <TouchableOpacity style={[styles.backButton, theme === 'dark' ? styles.backButtonDark : styles.backButtonLight]} onPress={() => router.back()}>
                <ThemedText style={styles.backButtonLabel}>Voltar</ThemedText>
            </TouchableOpacity>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 80
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
    },
    cameraGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    cameraLabel: {
        textAlign: 'center',
        fontSize: 18,
        width: 250,
        fontWeight: 'bold'
    },
    
    viewCamera: {
        height: CAMERA_HEIGHT,
        width: CAMERA_WIDTH,
        borderRadius: 10
    }
})