import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";

type props = TouchableOpacityProps & {
  name: string;
  pressed: boolean;
};

export function Group({ name, pressed, ...rest }: props) {
  return (
    <Pressable pressed={pressed} {...rest}>
      <Text pressed={pressed}>{name}</Text>
    </Pressable>
  );
}

const Pressable = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 1,
}))<{ pressed: boolean }>`
  background-color: ${({ theme }) => theme.colors.gray[600]};
  margin-right: 12px;
  width: 96px;
  height: 40px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  ${({ theme, pressed }) =>
    pressed &&
    `
		border: 1px solid ${theme.colors.green[500]}
	`}
`;

const Text = styled.Text<{ pressed: boolean }>`
  color: ${({ theme, pressed }) =>
    pressed ? theme.colors.green[500] : theme.colors.gray[100]};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: bold;
  text-transform: uppercase;
`;
