import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import BodySvg from "../assets/body.svg";
import SeriesSvg from "../assets/series.svg";
import RepetitionsSvg from "../assets/repetitions.svg";
import { Button } from "@components/Button";

export function Exercise() {
  const navigation = useNavigation();
  return (
    <>
      <Header>
        <Box>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftIcon name="arrow-left" />
          </TouchableOpacity>
          <Heading>Remada unilateral</Heading>
        </Box>
        <Box>
          <BodySvg />
          <Text>Costa</Text>
        </Box>
      </Header>
      <Container>
        <Image
          source={{
            uri: "https://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg",
          }}
        />
        <BottomCard>
          <HStack>
            <Box>
              <SeriesSvg />
              <Text>3 séries</Text>
            </Box>
            <Box>
              <RepetitionsSvg />
              <Text>12 repetições</Text>
            </Box>
          </HStack>
          <HStack>
            <Button onPress={() => {}} title="Marcar como realizado" />
          </HStack>
        </BottomCard>
      </Container>
    </>
  );
}

const Header = styled.View`
  padding: 24px;
  padding-top: 62px;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray[600]};
  align-items: start;
  flex-direction: row;
  justify-content: space-between;
`;

const Box = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const Heading = styled.Text`
  color: ${({ theme }) => theme.colors.gray[100]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const ArrowLeftIcon = styled(Feather).attrs(({ theme }) => ({
  color: theme.colors.green[500],
  size: 24,
}))``;

const Container = styled.ScrollView`
  flex: 1;
  padding: 12px;
  margin-top: 12px;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.gray[200]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: 10px 0;
  font-family: ${({ theme }) => theme.fonts.body};
  text-align: center;
`;

const Image = styled.Image`
  width: "full";
  height: 320px;
  margin: 12px;
  border-radius: 8px;
  resize: center;
`;

const BottomCard = styled.View`
  align-items: center;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.colors.gray[600]};
  padding: 12px;
  margin: 0 12px;
  border-radius: 8px;
  width: max-content;
  height: max-content;
`;

const HStack = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  gap: 8px;
  background-color: ${({ theme }) => theme.colors.gray[600]};
  padding: 6px;
  border-radius: 8px;
  width: 100%;
  flex-shrink: 1;
`;
