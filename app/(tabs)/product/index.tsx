import BasicDropdown from "@/components/basic-dropdown";
import ItemProductList from "@/components/product/item-product-list";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { desktopBaseURL } from "@/constants/url";
import { CategoryResponse } from "@/types/responses/category-response";
import { ProductListResponse } from "@/types/responses/product-response";
import { SubcategoryResponse } from "@/types/responses/subcategory-response";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, TextInput, View } from "react-native";

export default function ProductScreen() {
    const [ category, setCategory ] = useState('');
    const [ subCategory, setSubCategory ] = useState('');
    const [ categoriesData, setCategoriesData ] = useState<CategoryResponse[]>([]);
    const [ subCategoriesData, setSubCategoriesData ] = useState<SubcategoryResponse[]>([]);
    const [ search, setSearch ] = useState('');
    const [ filteredProducts, setFilteredProducts ] = useState<ProductListResponse[]>([]);
    const [ allProductsData, setAllProductsData ] = useState<ProductListResponse[]>([]);
    
    useEffect(() => {
       const getDatas = async () => {
            const token = await AsyncStorage.getItem('access_token');
            if (!token) 
                return Alert.alert('Atenção', 'Credenciais não encontradas3! Faça login novamente!', 
                    [{ text: 'OK', onPress: () => router.replace('/login') }]
                );
            
            try {
                const responseCategory = await fetch(`${desktopBaseURL}/api/category/list`, { headers: { 'Authorization': token} });
                if(!responseCategory.ok) {
                    if(responseCategory.status === 401) {
                        await AsyncStorage.removeItem('access_token');
                        return Alert.alert('Atenção', 'Sua sessão expirou! Faça login novamente!', 
                            [{ text: 'OK', onPress: () => router.replace('/login') }]
                        );
                    }
                    return Alert.alert('Atenção', 'Ocorreu um erro ao carregar os dados! Status: ');
                }

                const dataCategory = await responseCategory.json();
                setCategoriesData(dataCategory);

                const responseProducts = await fetch(`${desktopBaseURL}/api/product/list`, { headers: { 'Authorization': token} });
                if(!responseProducts.ok) {
                    if(responseProducts.status === 401) {
                        await AsyncStorage.removeItem('access_token');
                        Alert.alert('Atenção', 'Sua sessão expirou! Faça login novamente!');
                        return router.replace('/login');
                    }
                    return Alert.alert('Atenção', 'Ocorreu um erro ao carregar lista de produtos! Status: ' + responseProducts.status);
                }

                const dataProducts = await responseProducts.json();
                setFilteredProducts(dataProducts);
                setAllProductsData(dataProducts);
            } catch (error) {
                return Alert.alert('Atenção', `Erro ao carregar lista de produtos: ${error}`);
            }
       }

       getDatas();
    }, [])

    const reloadProductList = (searchText: string = search) => {
        const query = {
            search: searchText,
            category: Number(category),
            subCategory: Number(subCategory)
        }
        
        const filteredProducts = allProductsData.filter(product => {
            if(query.search && !product.name.toLowerCase().includes(query.search.toLowerCase())) 
                return false;

            if(!isNaN(query.category) && query.category !== 0) 
                if(product.category_id !== query.category) return false;
            
            if(!isNaN(query.subCategory) && query.subCategory !== 0) 
                if(product.subcategory_id !== query.subCategory) return false;
            
        
            return true;
        });
        setFilteredProducts(filteredProducts);
    }
    
    useEffect(() => {
        reloadProductList();
    }, [category, subCategory, search])

    const setOnChangeCategory = async (itemSelected: { _index: number; label: string; value: string }) => {
        if(itemSelected.value === category) return;
        setCategory(itemSelected.value);

        const token = await AsyncStorage.getItem('access_token');
        if(!token) 
            return Alert.alert('Atenção', 'Credenciais não encontradas! Faça login novamente!', 
                [{ text: 'OK', onPress: () => router.replace('/login') }]
            );
        
        try {
            const responseSubCategory = await fetch(`${desktopBaseURL}/api/category/${itemSelected.value}/subcategories`, { headers: { 'Authorization': token } });
            if(!responseSubCategory.ok) {
                if(responseSubCategory.status === 401) {
                    await AsyncStorage.removeItem('access_token');
                    Alert.alert('Atenção', 'Sua sessão expirou! Faça login novamente!');
                    return router.replace('/login');
                }
                return Alert.alert('Atenção', 'Ocorreu um erro ao carregar subcategorias! Status: ' + responseSubCategory.status);
            }

            const dataSubCategory = await responseSubCategory.json();
            setSubCategoriesData(dataSubCategory);
        } catch (error) {
            return Alert.alert('Atenção', `Erro ao carregar subcategorias: ${error}`);
        }
    }

    const setOnChangeSubCategory = (itemSelected: { _index: number; label: string; value: string }) => {
        if(itemSelected.value === subCategory) return;
        setSubCategory(itemSelected.value);
    }

    return (
        <ThemedView lightColor="#fff" darkColor="#0D0D12" style={styles.container}>
            <ThemedView style={styles.cardProducts} lightColor="#f1f1f1ff" darkColor="#18181B">
                <View style={styles.headerCard}>
                    <View style={styles.searchFieldGroup}>
                        <ThemedText lightColor="#000" darkColor="#fff" style={{ fontWeight: 'bold' }}>Produtos</ThemedText>
                        <TextInput
                            style={styles.textInput} 
                            placeholder="Pesquisar..." 
                            placeholderTextColor="#8C8787"
                            value={search} onChangeText={(text) => {
                                setSearch(text);
                                reloadProductList(text);
                            }}>
                        </TextInput>  
                    </View>
                    <ThemedView style={styles.line} lightColor="#000" darkColor="#fff"></ThemedView>
                    <View style={styles.searchCategoryGroup}>
                        <View style={styles.categorySelectGroup}>
                            <ThemedText>Categoria:</ThemedText>
                            <BasicDropdown 
                                data={[{ label: 'Todas', value: '0' }, ...categoriesData.map(category => { return { label: category.name, value: category.id.toString()}})]} 
                                value={category} 
                                setOnChange={setOnChangeCategory}
                            />
                        </View>
                        <View style={styles.categorySelectGroup}>
                            <ThemedText>Sub-categoria:</ThemedText>
                            <BasicDropdown 
                                data={[{ label: 'Todas', value: '0' }, ...subCategoriesData.map(subcategory => { return { label: subcategory.name, value: subcategory.id.toString()}})]} 
                                value={subCategory} 
                                setOnChange={setOnChangeSubCategory}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.listProducts}>
                    <ThemedView style={styles.headerListProduct} lightColor="#006DC7" darkColor="#004177">
                        <ThemedText style={styles.labelListProduct}>Produto</ThemedText>
                        <ThemedText style={styles.labelListProduct}>Info.</ThemedText>
                        <ThemedText style={styles.labelListProduct}>Detalhes</ThemedText>
                    </ThemedView>
                    <ScrollView style={styles.scrollListProduct} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                        {filteredProducts.map(product => {
                            return <ItemProductList 
                                name={product.name} 
                                price={product.price} 
                                sku={product.sku} 
                                imageUrl={product.image_url} 
                                id={product.id.toString()} 
                                key={product.id} 
                            />
                        })}
                    </ScrollView>
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
        marginTop: 5
    },
    headerListProduct: {
        marginHorizontal: 7,
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
    },
    scrollListProduct: {
        marginTop: 7,
        paddingHorizontal: 7,
        width: "100%",
        maxHeight: '72%',
        overflowX: 'visible',
        overflowY: 'scroll'
    }
});