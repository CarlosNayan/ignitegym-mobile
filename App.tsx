import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { Signin } from "@screens/Signin";
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
      <View style={{ flex: 1, backgroundColor: theme.colors.gray[700] }}>
        <StatusBar translucent barStyle="light-content" />
        {fontsLoaded ? <Signin /> : <Loading />}
      </View>
    </ThemeProvider>
  );
}
