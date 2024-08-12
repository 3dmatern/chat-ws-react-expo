import { StyleSheet, TextInput, View } from "react-native";

import FormContainer from "@/components/form/FormContainer";
import TextInputField from "@/components/form/TextInputField";

export default function Index() {
  return (
    <View style={styles.container}>
      <FormContainer
        title="Авторизация"
        footer={{
          text: "Хотели бы увидеть код?",
          url: "https://github.com/3dmatern/chat-nuxt",
          urlText: "GitHub"
        }}
      >
        <TextInputField />
      </FormContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
