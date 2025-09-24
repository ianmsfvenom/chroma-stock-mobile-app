import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from "expo-router";


export default function LoginScreen() {
    const theme = useColorScheme();
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    
    return (
        <ThemedView style={[styles.container, theme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
            <ThemedView style={[styles.cardLogin, theme === 'dark' ? styles.darkCardLogin : styles.lightCardLogin]}>
                <ThemedText style={styles.title}>ChromaStock</ThemedText>

                <View style={styles.formGroup}>
                    <View style={styles.inputGroup}>
                        <ThemedText style={[styles.label, theme === 'dark' ? styles.darkLabel : styles.lightLabel]}>E-mail:</ThemedText>
                        <TextInput style={styles.textInput} placeholder="Seu E-mail" keyboardType="email-address"/>
                    </View>
                    <View style={styles.inputGroup}>
                        <ThemedText style={[styles.label, theme === 'dark' ? styles.darkLabel : styles.lightLabel]}>Senha:</ThemedText>
                        
                        <View style={styles.inputContainer}>
                            <TextInput style={[styles.iconTextInput]} placeholder="Sua Senha" secureTextEntry={!showPassword}/>
                            <TouchableOpacity style={styles.icon} onPress={() => setShowPassword(!showPassword)}>
                                <Icon name={showPassword ? "eye-off" : "eye"} size={22} color="#000000" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => {
                    router.replace('/(tabs)/product');
                }}>
                    <ThemedText style={styles.buttonText}>Entrar</ThemedText>
                </TouchableOpacity>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    darkContainer: { backgroundColor: '#03243F'},
    lightContainer: { backgroundColor: '#0869B9' },
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    darkCardLogin: { backgroundColor: '#004177' },
    lightCardLogin: { backgroundColor: '#FFFFFF' },
    cardLogin: {
        width: '90%',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 25
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },

    formGroup: {
        marginTop: 20,
        width: '85%',
    },

    inputGroup: {
        marginBottom: 10,
        gap: 5
    },
    
    lightLabel: { color: '#000000' },
    darkLabel: { color: '#FFFFFF' },

    label: {
        color: '#',
        fontWeight: 'bold',
        fontSize: 18
    },

    textInput: {
        backgroundColor: '#FFFFFF',
        borderColor: '#8C8787',
        borderWidth: 1,
        borderRadius: 4,
        height: 40,
        padding: 5,
        color: '#8C8787',
        fontWeight: 'bold',
    },

    iconTextInput: {
        flex: 1,
        color: '#8C8787',
        fontWeight: 'bold',
        padding: 5,
        height: 40
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#8C8787",
        backgroundColor: "#FFFFFF",
        borderRadius: 4,
        height: 40,
        paddingEnd: 5
    },
    icon: { padding: 5 },


    button: {
        marginTop: 20,
        width: '70%',
        height: 35,
        backgroundColor: '#0869B9',
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18
    }
});