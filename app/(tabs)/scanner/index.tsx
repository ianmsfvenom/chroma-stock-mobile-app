
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { router } from "expo-router";

export default function ScannerScreen() {
    const [ permission, requestPermission ] = useCameraPermissions();

    const handlePress = async (scanType: 'qrCode' | 'barCode') => {
        if(permission?.granted) {
            if(scanType === 'qrCode') {
                return router.push('/(tabs)/scanner/qrcode-scanner');
            } else if(scanType === 'barCode') 
                return router.push('/(tabs)/scanner/barcode-scanner');
        }

        const newPermission = await requestPermission();

        if(!newPermission.granted) {
            Alert.alert('Permissão negada!', 'É necessário permitir o uso da câmera para usar o leitor de QRCode ou Código de Barras!');
        } else {
            if(scanType === 'qrCode') {
                return router.push('/(tabs)/scanner/qrcode-scanner');
            } else if(scanType === 'barCode') 
                return router.push('/(tabs)/scanner/barcode-scanner');
        }
    };

    return (
        <ThemedView lightColor="#fff" darkColor="#0D0D12" style={styles.container}>
            <View style={styles.buttonGroup}>
                <ThemedText style={{ textAlign: 'center' }}>Use o leitor de QRCode para fazer a leitura de caixas</ThemedText>
                <TouchableOpacity style={styles.buttonScanner} onPress={() => handlePress('qrCode')}>  
                    <Ionicons name="qr-code-outline" size={40} color="white"/>
                    <Text style={styles.buttonLabel}>QR Code</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonGroup}>
                <ThemedText style={{ textAlign: 'center' }}>Use leitor de código de barras para fazer a leitura de produtos</ThemedText>
                <TouchableOpacity style={styles.buttonScanner} onPress={() => handlePress('barCode')}>  
                    <Ionicons name="barcode-outline" size={40} color="white"/>
                    <Text style={styles.buttonLabel}>Código de Barras</Text>
                </TouchableOpacity>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50
    },
    buttonGroup: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 10,
        paddingHorizontal: 50
    },
    buttonScanner: {
        backgroundColor: '#007CE2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: 135,
        paddingVertical: 8,
        borderRadius: 4
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 14
    }
});