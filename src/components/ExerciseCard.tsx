import { ListRenderItemInfo, TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import { Entypo } from "@expo/vector-icons";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { api } from "@services/api";

type props = {
  data: ListRenderItemInfo<ExerciseDTO>;
} & TouchableOpacityProps;

export function ExerciseCard({ data, ...rest }: props) {
  return (
    <Container {...rest}>
      <HStack>
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${data.item.thumb}`,
          }}
        />
        <VStack>
          <Heading>{data.item.name}</Heading>
          <Text>{`${data.item.series} séries X ${data.item.repetitions} repetições`}</Text>
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
