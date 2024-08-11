import React, { useState } from "react";
import { TextInputProps } from "react-native";
import styled from "styled-components/native";

interface InputProps extends TextInputProps {
  bgColor?: string;
  width?: string | number;
  isInvalid?: boolean;
}

export function Input({ bgColor, isInvalid, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <TextInput
      ref={null}
      onFocus={handleFocus}
      onBlur={handleBlur}
      isFocused={isFocused}
      isInvalid={isInvalid}
      bgColor={bgColor}
      {...props}
    />
  );
}

const TextInput = styled.TextInput.attrs<{ bgColor: string | undefined }>(
  ({ theme, bgColor }) => ({
    placeholderTextColor: theme.colors.gray[300],
  })
)<{ isFocused: boolean; isInvalid: boolean | undefined }>`
  background-color: ${({ theme, bgColor }) =>
    bgColor || theme.colors.gray[700]};
  height: 50px;
  padding: 10px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme, editable }) =>
    editable ? theme.colors.gray[100] : theme.colors.gray[300]};
  border-width: 1px;
  border-color: ${({ theme, isFocused, isInvalid }) =>
    isFocused
      ? theme.colors.green[500]
      : isInvalid
      ? theme.colors.red[500]
      : theme.colors.gray[400]};
  border-radius: 5px;
  margin-bottom: 12px;
`;
