
import OverlayBarcode from '@/components/scanner/overlay-barcode';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CameraView} from 'expo-camera';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';


const CAMERA_WIDTH = 300
const CAMERA_HEIGHT = 200

export default function BarcodeScanner() {
    const theme = useColorScheme()
    const [ scanned, setScanned ] = useState(false);

    return (
        <ThemedView lightColor="#fff" darkColor="#0D0D12" style={styles.container}>
            <View style={styles.cameraGroup}>
                <ThemedText style={styles.cameraLabel}>Alinhe o código de barras dentro da moldura</ThemedText>
                <CameraView 
                    style={styles.viewCamera} 
                    onBarcodeScanned={({ data }) => { console.log(data); setScanned(true) }}
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