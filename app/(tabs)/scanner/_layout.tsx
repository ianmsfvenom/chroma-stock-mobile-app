import { desktopBaseURL } from "@/constants/url";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Linking, TouchableOpacity } from "react-native";

export default function ScannerLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: "#0869B9" },
                headerTintColor: "#fff",
                headerRight: () => (
                    <TouchableOpacity onPress={() => Linking.openURL(desktopBaseURL)}>
                        <Ionicons size={28} name="desktop-outline" color="#fff" />
                    </TouchableOpacity>
                )
            }}
        >
            <Stack.Screen name="index" options={{ title: "Scanner" }} />
            <Stack.Screen name="barcode-scanner" options={{ title: "Leitor de Código de Barras" }} />
            <Stack.Screen name="qrcode-scanner" options={{ title: "Leitor de QRCode" }} />
        </Stack>
    );
}