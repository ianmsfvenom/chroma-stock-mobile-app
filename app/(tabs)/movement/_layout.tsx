import { desktopBaseURL } from "@/constants/url";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Linking, TouchableOpacity } from "react-native";

export default function MovementLayout() {
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
            <Stack.Screen name="index" options={{ title: "Movimentação" }} />
            <Stack.Screen name="details-box-movement" options={{ title: "Mov. de Caixa" }} />
            <Stack.Screen name="details-product-box-movement" options={{ title: "Mov. de Produto" }} />
        </Stack>
    );
}