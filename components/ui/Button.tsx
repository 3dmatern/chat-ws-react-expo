import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Button({ label, onPressFunc }: { label: any, onPressFunc: Function }) {
    return (
        <View style={styles.buttonContainer}>
            <Pressable
                style={styles.button}
                onPress={() => onPressFunc()}
            >
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  button: {
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 8,
    backgroundColor: "#4f46e5"
  },
  buttonLabel: {
    color: "#ffffff",
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "600"
  }
});