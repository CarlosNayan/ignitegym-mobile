import React, { useRef, useEffect } from "react";
import { Animated, View } from "react-native";

type Props = {
  height: number;
  width: number;
  borderRadius?: number;
  startColor?: string;
  endColor?: string;
};

export function SkeletonComponent({
  height = 20,
  width = 100,
  borderRadius = 0,
  startColor = "#303030",
  endColor = "#101010",
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
      style={{
        backgroundColor: backgroundColorInterpolation,
        borderRadius: borderRadius,
        height: height, // Convert string to number if possible
        width: width, // Convert string to number if possible
      }}
    />
  );
}
