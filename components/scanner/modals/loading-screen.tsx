import { Modal, StyleSheet, Text, View } from "react-native";


interface LoadingScrenProps {
    visible: boolean
    setVisible: (value: boolean) => void
}
export function LoadingScren(props: LoadingScrenProps) {

    const { visible, setVisible } = props;
    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setVisible(false)}
        >
            <View style={styles.container}>
                <Text style={styles.title}>
                    Carregando, aguarde um instante...
                </Text>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },

    title: {
        color: 'white',
        textAlign: 'center',
        fontSize: 26,
        fontWeight: 'bold'
    }
})