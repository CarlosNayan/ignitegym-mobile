import { Button } from "@components/Button";
import { SkeletonComponent } from "@components/SkelletonElement";
import { useToast } from "@contexts/ToastContext";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useEffect, useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import BodySvg from "../assets/body.svg";
import RepetitionsSvg from "../assets/repetitions.svg";
import SeriesSvg from "../assets/series.svg";

type routeParams = {
  exerciseId: string;
};

export function Exercise() {
  const [exercise, setExercise] = useState<ExerciseDTO | null>(null);
  const [demoLoading, setDemoLoading] = useState(true);
  const [demoSource, setDemoSource] = useState<{ uri: string } | null>(null);
  const [isSendingRegister, setIsSendingRegister] = useState(false);

  const navigation = useNavigation();
  const { params } = useRoute();

  const { showToast } = useToast();

  const { exerciseId } = params as routeParams;

  async function fetchExerciseById() {
    setDemoLoading(true);
    try {
      const response = await api.get(`/exercises/${exerciseId}`);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate loading

      setExercise(response.data);
    } catch (error) {
      console.error("@screens/Exercise > fetchExerciseById > error", error);
      if (error instanceof AppError)
        return showToast.error("Erro ao carregar exercício");
    }
  }

  async function handleExerciseHistoryRegister() {
    setIsSendingRegister(true);
    try {
      await api.post(`/history`, {
        exercise_id: exerciseId,
      });
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate loading
      showToast.success("Exercício registrado com sucesso");
      navigation.goBack();
    } catch (error) {
      console.error(
        "@screens/Exercise > handleExerciseHistoryRegister > error",
        error
      );
      if (error instanceof AppError)
        return showToast.error("Erro ao registrar o exercício");
    } finally {
      setIsSendingRegister(false);
    }
  }

  useEffect(() => {
    fetchExerciseById();
  }, [exerciseId]);

  useEffect(() => {
    if (exercise) {
      // Usando Image.prefetch para carregar a imagem antecipadamente
      Image.prefetch(`${api.defaults.baseURL}/exercise/demo/${exercise?.demo}`)
        .then(() => {
          setDemoSource({
            uri: `${api.defaults.baseURL}/exercise/demo/${exercise?.demo}`,
          });
          setDemoLoading(false);
        })
        .catch(() => {
          setDemoLoading(false);
        })
        .finally(() => {
          setDemoLoading(false);
        });
    } else {
      setDemoLoading(false);
    }
  }, [exercise]);

  return (
    <>
      <Header>
        <Box>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftIcon name="arrow-left" />
          </TouchableOpacity>
          <Heading>{exercise?.name}</Heading>
        </Box>
        <Box>
          <BodySvg />
          <Text>{exercise?.group}</Text>
        </Box>
      </Header>
      <Container>
        {demoLoading ? (
          <SkeletonComponent
            style={{ margin: 12, width: "auto", height: 350, borderRadius: 8 }}
          />
        ) : (
          <DemoImage source={demoSource!} />
        )}
        <BottomCard>
          <HStack>
            <Box>
              <SeriesSvg />
              <Text>{exercise?.series} séries</Text>
            </Box>
            <Box>
              <RepetitionsSvg />
              <Text>{exercise?.repetitions} repetições</Text>
            </Box>
          </HStack>
          <HStack>
            <Button
              onPress={handleExerciseHistoryRegister}
              title="Marcar como realizado"
              isLoading={isSendingRegister}
            />
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

const DemoImage = styled.Image`
  width: "full";
  height: 350px;
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
