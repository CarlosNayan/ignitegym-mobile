import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

export function Loading() {
  return (
    <Center>
      <ActivityIndicator color="green.500" />
    </Center>
  );
}

const Center = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
