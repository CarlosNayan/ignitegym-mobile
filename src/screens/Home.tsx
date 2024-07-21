import { HomeHeader } from "@components/HomeHeader";
import styled from "styled-components/native";

export function Home() {
  return (
    <Container>
      <HomeHeader />
    </Container>
  );
}
const Container = styled.SafeAreaView`
  flex: 1;
  padding: 24px;
  gap: 20px;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.gray[100]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: 10px 0;
  font-family: ${({ theme }) => theme.fonts.body};
  text-align: center;
`;
