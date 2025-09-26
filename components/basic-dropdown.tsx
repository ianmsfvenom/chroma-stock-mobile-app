import { AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface DropdownProps {
    data: { label: string; value: string }[];
    value: string;
    setOnChange: (value: { _index: number; label: string; value: string }) => void;
    placeholder?: string;
}

export default function BasicDropdown(props: DropdownProps) {
    const { data, value, setOnChange, placeholder } = props;

    return (
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            itemContainerStyle={styles.itemContainerStyle}
            itemTextStyle={styles.itemTextStyle}
            selectedTextStyle={styles.selectedTextStyle}
            containerStyle={styles.containerStyle}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={placeholder ?? 'Selecione...'}
            value={value}
            onChange={setOnChange}
        />
    )
}

const styles = StyleSheet.create({
    dropdown: {
      height: 30,
      borderBottomColor: '#828282',
      borderBottomWidth: 1,

      borderWidth: 1,
      borderColor: '#828282',
      
      borderRadius: 4,
      backgroundColor: '#D9D9D9',
      paddingHorizontal: 3
    },

    placeholderStyle: {
      fontSize: 16,
      color: '#828282'
    },

    selectedTextStyle: {
      fontSize: 16,
    },

    itemContainerStyle: {
        backgroundColor: "#D9D9D9",
        paddingVertical: 0,
        borderRadius: 6
    },

    itemTextStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 14,
        paddingVertical: 0,
        color: "#414141ff",
    },

    containerStyle: {
        borderRadius: 6,
        backgroundColor: "#D9D9D9",
        overflow: 'hidden'
    }
  });