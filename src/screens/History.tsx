import { HistoryCard } from "@components/HistoryCard";
import { ScreensHeader } from "@components/ScreensHeader";
import { useToast } from "@contexts/ToastContext";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useCallback, useState } from "react";
import { SectionList } from "react-native";
import styled from "styled-components/native";

export function History() {
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  const { showToast } = useToast();

  async function fetchHistory() {
    try {
      const response = await api.get("/history");
      setExercises(response.data);
    } catch (error) {
      console.error("@screens/History > fetchHistory > error", error);
      if (error instanceof AppError) return showToast.error(error.message);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <>
      <ScreensHeader title="Histórico de exercícios" />
      <Container>
        <SectionList
          sections={exercises}
          keyExtractor={({ id, name }) => `${id}${name}`}
          renderItem={({ item }) => <HistoryCard data={item} />}
          renderSectionHeader={({ section }) => (
            <Heading>{section.title}</Heading>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            exercises.length === 0
              ? {
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }
              : { padding: 24, paddingBottom: 100 }
          }
          ListEmptyComponent={() => (
            <Text>
              Não há registros ainda.{"\n"} Vamos fazer exercícios hoje?
            </Text>
          )}
        />
      </Container>
    </>
  );
}
const Container = styled.SafeAreaView`
  flex: 1;
  padding: 24px;
  gap: 20px;
`;

const Heading = styled.Text`
  color: ${({ theme }) => theme.colors.gray[100]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.heading};
  margin-bottom: 12px;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.gray[100]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.body};
  text-align: center;
`;
