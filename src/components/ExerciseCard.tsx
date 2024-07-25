import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import { Entypo } from "@expo/vector-icons";

type props = TouchableOpacityProps & {};

export function ExerciseCard({ ...rest }) {
  return (
    <Container {...rest}>
      <HStack>
        <Image
          source={{
            uri: "https://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg",
          }}
        />
        <VStack>
          <Heading>Remada unilateral</Heading>
          <Text>3 séries x 12 repetições</Text>
        </VStack>
        <ArrowIcon name="chevron-right" />
      </HStack>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  margin-bottom: 12px;
`;

const VStack = styled.View`
  justify-content: center;
  flex: 1;
`;

const HStack = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.gray[500]};
  align-items: center;
  padding: 8px;
  padding-right: 16px;
  border-radius: 8px;
`;

const Image = styled.Image`
  resize: cover;
  width: 64px;
  height: 64px;
  border-radius: 8px;
  margin-right: 16px;
`;

const Heading = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const Text = styled.Text.attrs({
  numberOfLines: 2,
})`
  color: ${({ theme }) => theme.colors.gray[200]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.body};
`;

const ArrowIcon = styled(Entypo).attrs(({ theme }) => ({
  color: theme.colors.gray[300],
  size: 24,
}))``;
