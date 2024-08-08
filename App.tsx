import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { Routes } from "@routes/index";
import { StatusBar } from "react-native";
import { Loading } from "src/components/Loading";
import { AuthContextProvider } from "@contexts/AuthContext";
import { theme } from "src/theme/index";
import { ThemeProvider } from "styled-components/native";
import { ToastProvider } from "@contexts/ToastContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <StatusBar translucent barStyle="light-content" />
        <AuthContextProvider>
          {fontsLoaded ? <Routes /> : <Loading />}
        </AuthContextProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
