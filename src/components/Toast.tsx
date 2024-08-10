import React, { useEffect, useState } from "react";
import { Animated, Easing, Text } from "react-native";
import { useTheme } from "styled-components";

interface ToastProps {
  type: "SUCCESS" | "ERROR";
  message: string;
  visible: boolean;
  onDismiss?: () => void;
}

export function Toast({ type, message, visible = false, onDismiss }: ToastProps) {
  const [animatedValue] = useState(new Animated.Value(130)); // Inicia fora da tela

  const { colors } = useTheme();

  useEffect(() => {
    if (visible) {
      Animated.timing(animatedValue, {
        toValue: 0, // Move para a posição visível
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();

      // Dismiss after a delay
      const timer = setTimeout(() => {
        Animated.timing(animatedValue, {
          toValue: -130, // Move de volta para fora da tela
          duration: 200,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }).start(onDismiss);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      Animated.timing(animatedValue, {
        toValue: -130, // Move para fora da tela
        duration: 200,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start(onDismiss);
    }
  }, [visible]);

  return (
    <Animated.View
      style={[
        {
          width: "90%",
          height: 60,
          position: "absolute",
          top: 70,
          left: "5%",
          backgroundColor: colors.gray[500],
          borderRadius: 4,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "black",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.2,
          shadowRadius: 15,
          zIndex: 10,

          borderLeftWidth: 10,
          borderLeftColor: type === "SUCCESS" ? colors.green[500] : colors.red[500],

          transform: [{ translateY: animatedValue }],
          opacity: animatedValue.interpolate({
            inputRange: [0, 130],
            outputRange: [1, 0],
          }),
        },
      ]}
    >
      <Text style={{ fontSize: 16, color: colors.white }}>{message}</Text>
    </Animated.View>
  );
}
