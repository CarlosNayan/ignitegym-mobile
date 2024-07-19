import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { NativeBaseProvider } from "native-base";
import { StatusBar, Text, View } from "react-native";
import { Loading } from "src/components/Loading";
import { THEME } from "src/theme/index";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <View>
        <StatusBar translucent barStyle="light-content" />
        {!fontsLoaded ? (
          <Text style={{ fontFamily: "Roboto_700Bold" }}>
            Open up App.tsx to start working on your app!
          </Text>
        ) : (
          <Loading />
        )}
      </View>
    </NativeBaseProvider>
  );
}
