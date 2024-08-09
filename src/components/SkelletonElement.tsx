import React, { useEffect, useRef } from "react";
import { Animated, ViewProps } from "react-native";

type Props = {
  style: ViewProps["style"];
  startColor?: string;
  endColor?: string;
};

export function SkeletonComponent({
  startColor = "#303030",
  endColor = "#101010",
  style,
}: Props) {
  const animatedColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedColor, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(animatedColor, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }),
        ])
      ).start();
    };

    animate();

    return () => {
      animatedColor.stopAnimation();
    };
  }, []);

  const backgroundColorInterpolation = animatedColor.interpolate({
    inputRange: [0, 1],
    outputRange: [startColor, endColor], // Example colors
  });

  return (
    <Animated.View
      style={[
        {
          backgroundColor: backgroundColorInterpolation,
        },
        style,
      ]}
    />
  );
}
