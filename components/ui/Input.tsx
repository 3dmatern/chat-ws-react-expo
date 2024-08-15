import { StyleSheet, TextInput } from "react-native";

export default function Input(rest: any) {
    return <TextInput style={styles.input} {...rest} />;
};

const styles = StyleSheet.create({
    input: {
        width: "100%",
        padding: 6,
        display: "flex",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#d1d5db",
        color: "#111827",
        backgroundColor: "#fff",
        boxShadow: "0 1px 2px 0 #0000000D"
    }
});