import { Link } from "expo-router";
import { useState } from "react";
import { Text, TextInput, StyleSheet, View } from "react-native";

import { useSession } from "@/context/ctx";

import Button from "@/components/ui/Button";

export default function Index() {
  const { signIn } = useSession();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.formTitle}>
          Авторизация
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Введите Ваше имя"
          placeholderTextColor="#9ca3af"
          onChangeText={(name) => setName(name)}
        />

        <Button label="Войти в чат" onPressFunc={() => signIn(name)} />

        <Text style={styles.formFooter}>
          <Text>Хотели бы увидеть код?</Text>{" "}
          <Link
            style={styles.formFooterLink}
            href="https://github.com/3dmatern/chat-nuxt"
            target="_blank"
          >
            GitHub
          </Link>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  form: {
    maxWidth: 384,
    width: "100%",
    padding: 16,
    gap: 24,
    alignItems: "center",
    borderRadius: 8,
    boxShadow: "0 1px 3px 0 #0000001A"
  },
  formTitle: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: "700",
    color: "#111827"
  },
  formFooter: {
    fontSize: 14,
    lineHeight: 20,
    color: "#6b7280"
  },
  formFooterLink: {
    fontWeight: "700",
    lineHeight: 24,
    color: "#4f46e5"
  },
  input: {
    width: "100%",
    padding: 6,
    display: "flex",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#d1d5db",
    color: "#111827",
    boxShadow: "0 1px 2px 0 #0000000D"
  },
  btnSubmit: {
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#4f46e5"
  },
  btnSubmitText: {
    color: "#ffffff",
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "600"
  }
});
