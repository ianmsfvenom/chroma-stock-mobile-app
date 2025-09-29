import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";

export default function LogoutScreen() {
    const theme = useColorScheme();

    const handleLogout = async () => {
        Alert.alert('Atenção', 'Deseja realmente fazer logout?', [
            {
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: async () => {
                    await AsyncStorage.removeItem('access_token');
                    router.replace('/login');
                }
            }
        ]);
    }

    return (
        <ThemedView lightColor="#fff" darkColor="#0D0D12" style={[styles.container]}>
            <View style={styles.logoutGroup}>
                <ThemedText lightColor="#000" darkColor="#fff" style={styles.logoutLabel}>Para fazer o logout</ThemedText>
                <ThemedText lightColor="#000" darkColor="#fff" style={styles.logoutLabel}>Clique no botão abaixo: </ThemedText>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons size={28} name="log-out-outline" color={'white'} />
                    <Text style={styles.logoutButtonLabel}>Fazer Logout</Text>
                </TouchableOpacity>
            </View>
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
    logoutButton: {
        backgroundColor: '#007CE2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 5,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 4,
        marginTop: 15
    },
    logoutLabel: {
        fontSize: 18
    },
    logoutButtonLabel: {
        color: 'white',
        fontWeight: 'semibold',
        fontSize: 16
    },
    logoutGroup: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    }
});