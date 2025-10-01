import ItemBoxList from "@/components/box/item-box-list";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { desktopBaseURL } from "@/constants/url";
import { BoxListResponse } from "@/types/response";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, TextInput, View } from "react-native";

export let refreshBoxData: () => Promise<void>;

export default function BoxScreen() {
    const [search, setSearch] = useState('');
    const [boxesData, setBoxesData] = useState<BoxListResponse[]>([]);
    const [filteredBoxes, setFilteredBoxes] = useState<BoxListResponse[]>([]);

    refreshBoxData = async () => {
        const token = await AsyncStorage.getItem('access_token');
        if (!token)
            return Alert.alert('Atenção', 'Sua sessão expirou! Faça login novamente!', [{ text: 'OK', onPress: () => router.replace('/login') }]);

        try {
            const response = await fetch(`${desktopBaseURL}/api/box/list`, { headers: { 'Authorization': token } });
            if (!response.ok) {
                if (response.status === 401) {
                    await AsyncStorage.removeItem('access_token');
                    return Alert.alert('Atenção', 'Sua sessão expirou! Faça login novamente!', 
                        [{ text: 'OK', onPress: () => router.replace('/login') }]
                    );
                }
                return Alert.alert('Atenção', 'Ocorreu um erro ao carregar os dados! Status: ');
            }
            const data = await response.json();
            setBoxesData(data);
            setFilteredBoxes(data);
        } catch (error) {
            return Alert.alert('Atenção', `Erro ao carregar os dados: ${error}`);
        }
    }

    useEffect(() => {
        refreshBoxData();
    }, []);

    useEffect(() => {
        const filtered = boxesData.filter(box => box.code.toLowerCase().includes(search.toLowerCase()));
        setFilteredBoxes(filtered);
    }, [search]);

    return (
        <ThemedView style={styles.container} lightColor="#fff" darkColor="#0D0D12">
            <ThemedView style={styles.cardBoxes} lightColor="#f1f1f1ff" darkColor="#18181B">
                <View style={styles.headerCard}>
                    <ThemedText lightColor="#000" darkColor="#fff" style={{ fontWeight: 'bold' }}>Caixas</ThemedText>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Pesquisar..."
                        value={search}
                        onChangeText={(text) => {
                            setSearch(text);
                        }}
                    >
                    </TextInput>
                </View>
                <ThemedView lightColor="#fff" darkColor="#000" style={styles.line} />
                <ScrollView style={styles.boxList} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    {filteredBoxes.map((box) => (
                        <ItemBoxList
                            key={box.id}
                            id={box.id}
                            code={box.code}
                            typeBox={box.type_box}
                            status={box.status}
                            actual_deposit={box.actual_deposit}
                            actual_location={box.actual_location}
                        />
                    ))}
                </ScrollView>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardBoxes: {
        width: "95%",
        height: "95%",
        borderRadius: 6,
        elevation: 5,
    },
    headerCard: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 7
    },
    textInput: {
        height: 25,
        fontSize: 14,
        width: 180,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#828282',
        color: '#828282',
        backgroundColor: '#D9D9D9',
        paddingVertical: 0
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#D9D9D9'
    },
    boxList: {
        width: '100%',
        height: '80%',
        marginVertical: 10,
        paddingHorizontal: 10
    }
});