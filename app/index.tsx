import { ThemedView } from "@/components/themed-view";
import { desktopBaseURL } from "@/constants/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { Alert, Image, StyleSheet } from "react-native";

export default function Index() {
    const checkLogin = async () => {
        const token = await AsyncStorage.getItem('access_token');
        if (!token) return router.replace('/login');

        try {
            const requestCheckToken = await fetch(`${desktopBaseURL}/api/auth/user`, {
                headers: { 'Content-Type': 'application/json', 'Authorization': token }
            })

            if (requestCheckToken.ok) return router.replace('/(tabs)/product');

            await AsyncStorage.removeItem('access_token');
            Alert.alert('Atenção', 'Sua sessão expirou! Faça login novamente! Status: ' + requestCheckToken.status);
            return router.replace('/login');
        } catch (error) {
            Alert.alert('Atenção', `Houve falha ao verficar o login! Tente novamente mais tarde! Erro: ${error}`);
            return router.replace('/login');
        }
    }

    useEffect(() => {
        checkLogin();
    }, [])
    return (
        <ThemedView lightColor="#0049ff" darkColor="#004177" style={styles.container}>
            <Image source={require('../assets/images/splash-icon.png')} style={styles.imageSplash} resizeMode="contain"/>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        gap: 15
    },
    imageSplash: {
        width: '100%'
    }
})