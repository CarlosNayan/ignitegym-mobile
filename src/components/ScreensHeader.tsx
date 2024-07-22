import styled from "styled-components/native";

type props = {
  title: string;
};

export function ScreensHeader({ title }: props) {
  return (
    <Container>
      <Text>{title}</Text>
    </Container>
  );
}

const Container = styled.View`
  padding: 24px;
  padding-top: 62px;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.gray[600]};
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.gray[100]};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-family: ${({ theme }) => theme.fonts.body};
  text-align: center;
`;
