import { StyleSheet, Text, useColorScheme, View } from "react-native";

interface TagMovementProps {
    tagMovement: string;
}

export default function TagBoxMovement(props: TagMovementProps) {
    const { tagMovement } = props;
    const theme = useColorScheme();
    var background;
    var fontColor;
    var borderColor;
    var label;
    switch (tagMovement) {
        case 'product in':
        case 'stock in':
            label = 'Entrada';
            if (theme === 'dark') {
                background = '#162C23';
                fontColor = '#7BF2A8';
                borderColor = '#7BF2A8';
            } else {
                background = '#7BF2A8';
                fontColor = '#162C23';
                borderColor = '#162C23';
            }
            break;
        case 'product out':
        case 'stock out':
            label = 'Saída';
            if (theme === 'dark') {
                background = '#2C1616';
                fontColor = '#FF3F3F';
                borderColor = '#FF3F3F';
            } else {
                background = '#FF3F3F';
                fontColor = '#2C1616';
                borderColor = '#2C1616';
            }
            break;
        case 'transfer':
            label = 'Transferência';
            if (theme === 'dark') {
                background = '#222733';
                fontColor = '#9ACAFF';
                borderColor = '#9ACAFF';
            } else {
                background = '#9ACAFF';
                fontColor = '#222733';
                borderColor = '#222733';
            }
            break;
        default:
            label = 'Desconhecido';
            if (theme === 'dark') {
                background = '#222733';
                fontColor = '#9ACAFF';
                borderColor = '#9ACAFF';
            } else {
                background = '#9ACAFF';
                fontColor = '#222733';
                borderColor = '#222733';
            }
            break;
    }

    return (
        <View style={[styles.container, { backgroundColor: background, borderColor }]}>
            <Text style={[styles.label, { color: fontColor }]}>
                {label}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 5,
        borderRadius: 4,
        borderWidth: 1,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 10,
        textAlign: 'center',
        wordWrap: 'no-wrap'
    }
});