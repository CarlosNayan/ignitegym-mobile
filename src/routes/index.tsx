import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";
import { useTheme } from "styled-components/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useAuth } from "@hooks/useAuth";

export function Routes() {
  const { colors } = useTheme();

  const { user } = useAuth();

  const theme = DefaultTheme;

  theme.colors.background = colors.gray[700];

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
