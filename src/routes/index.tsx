import { useAuth } from "@hooks/useAuth";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { Loading } from "@components/Loading";
import { View } from "react-native";

export function Routes() {
  const { colors } = useTheme();

  const { user, isLoadingCachedUserData } = useAuth();

  const theme = DefaultTheme;

  theme.colors.background = colors.gray[700];

  if (isLoadingCachedUserData) {
    return (
        <Loading />
    );
  }

  return (
    <NavigationContainer>
      {user?.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
