import React, { useState } from "react";
import { TextInputProps } from "react-native";
import styled from "styled-components/native";

interface InputProps extends TextInputProps {}

export function Input(props: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <TextInput
      ref={null}
      onFocus={handleFocus}
      onBlur={handleBlur}
      isFocused={isFocused}
      {...props}
    />
  );
}

const TextInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.gray[300],
}))<{ isFocused: boolean }>`
  background-color: ${({ theme }) => theme.colors.gray[700]};
  height: 50px;
  padding: 10px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.gray[100]};
  border-width: 1px;
  border-color: ${({ theme, isFocused }) =>
    isFocused ? theme.colors.green[500] : "transparent"};
  border-radius: 5px;
`;
