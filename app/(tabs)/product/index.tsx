import BasicDropdown from "@/components/basic-dropdown";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useState } from "react";
import { StyleSheet, TextInput, useColorScheme, View } from "react-native";

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

export default function ProductScreen() {
    const theme = useColorScheme();
    const [ category , setCategory ] = useState('');
    const [ subCategory , setSubCategory ] = useState('');

    return (
        <ThemedView lightColor="#fff" darkColor="#0D0D12" style={styles.container}>
            <ThemedView style={styles.cardProducts} lightColor="#f1f1f1ff" darkColor="#18181B">
                <View style={styles.headerCard}>
                    <View style={styles.searchFieldGroup}>
                        <ThemedText lightColor="#000" darkColor="#fff" style={{ fontWeight: 'bold' }}>Produtos</ThemedText>
                        <TextInput style={styles.textInput} placeholder="Pesquisar..."></TextInput>  
                    </View>
                    <ThemedView style={styles.line} lightColor="#000" darkColor="#fff"></ThemedView>
                    <View style={styles.searchCategoryGroup}>
                        <View style={styles.categorySelectGroup}>
                            <ThemedText>Categoria:</ThemedText>
                            <BasicDropdown data={data} value={category} setValue={setCategory}/>
                        </View>
                        <View style={styles.categorySelectGroup}>
                            <ThemedText>Sub-categoria:</ThemedText>
                            <BasicDropdown data={data} value={subCategory} setValue={setSubCategory}/>
                        </View>
                    </View>
                </View>
                <View style={styles.listProducts}>
                    <ThemedView style={styles.headerListProduct} lightColor="#006DC7" darkColor="#004177">
                        <ThemedText style={styles.labelListProduct}>Produto</ThemedText>
                        <ThemedText style={styles.labelListProduct}>Info.</ThemedText>
                        <ThemedText style={styles.labelListProduct}>Detalhes</ThemedText>
                    </ThemedView>
                </View>
            </ThemedView>
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
    cardProducts: {
        width: "95%",
        height: "95%",
        borderRadius: 6,
        elevation: 5,
    },
    headerCard: {
        width: "100%"
    },
    searchFieldGroup: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 7
    },
    searchCategoryGroup: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        padding: 7
    },
    categorySelectGroup: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
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
        width: "100%",
        height: 1
    },
    dropdown: {
        backgroundColor: '#D9D9D9',
        color: '#828282',
        borderRadius: 4,
        width: '100%',
        paddingVertical: 0,
        fontSize: 12
    },
    listProducts: {
        width: "100%",
        height: "100%",
        padding: 7,
        marginTop: 5
    },
    headerListProduct: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 4,
        elevation: 4
    },
    labelListProduct: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 22
    }
});