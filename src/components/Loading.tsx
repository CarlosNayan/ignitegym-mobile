import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

export function Loading() {
  return (
    <Center>
      <LoadingIndicator />
    </Center>
  );
}

const Center = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray[700]};
`;

const LoadingIndicator = styled(ActivityIndicator).attrs(({ theme }) => ({
  color: theme.colors.green[700],
}))``;
