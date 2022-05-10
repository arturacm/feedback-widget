import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Widget from "./src/components/Widget";
import { theme } from "./src/theme";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from "@expo-google-fonts/inter";

export default function App() {
  const [fontLoader] = useFonts({ Inter_400Regular, Inter_500Medium });

  if (!fontLoader) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Widget />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
