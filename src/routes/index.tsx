import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const { colors } = useTheme();

  const theme = DefaultTheme;

  theme.colors.background = colors.gray[700];

  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}
