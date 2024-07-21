import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { Routes } from "@routes/index";
import { StatusBar, View } from "react-native";
import { Loading } from "src/components/Loading";
import { theme } from "src/theme/index";
import { ThemeProvider } from "styled-components/native";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" />
      {fontsLoaded ? <Routes /> : <Loading />}
    </ThemeProvider>
  );
}
