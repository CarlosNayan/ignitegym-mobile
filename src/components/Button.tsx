import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";

interface Props extends TouchableOpacityProps {
  title: string;
  type?: "SOLID" | "OUTLINE";
  marginTop?: string;
  isLoading?: boolean;
}

export function Button({
  title,
  type = "SOLID",
  marginTop,
  isLoading = false,
  ...rest
}: Props) {
  return (
    <Container type={type} marginTop={marginTop} disabled={isLoading} {...rest}>
      {isLoading ? <ActivityIndicator color="#fff" /> : <Title>{title}</Title>}
    </Container>
  );
}

const Container = styled(TouchableOpacity)<{
  type?: "SOLID" | "OUTLINE";
  marginTop?: string;
}>`
  flex: 1;
  min-height: 56px;
  max-height: 56px;
  background-color: ${({ theme, type }) =>
    type === "SOLID" ? theme.colors.green[700] : "transparent"};
  border: ${({ theme, type }) =>
    type === "SOLID" ? "none" : `1px solid ${theme.colors.green[700]}`};
  border-radius: 6px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: ${({ marginTop }) => marginTop || 0};
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;
