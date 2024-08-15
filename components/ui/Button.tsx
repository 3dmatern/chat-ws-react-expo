import { PropsWithChildren, ReactElement } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ButtonProps = {
  style?: object,
  styleButton?: object,
  label?: any,
  onPressFunc: Function,
  children?: ReactElement
};

export default function Button({ style, styleButton, label, onPressFunc, children }: ButtonProps) {
    return (
        <View style={[styles.buttonContainer, style]}>
            <Pressable
                style={[styles.button, styleButton]}
                onPress={() => onPressFunc()}
            >
                {children && children}
                {label && <Text style={styles.buttonLabel}>{label}</Text>}
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