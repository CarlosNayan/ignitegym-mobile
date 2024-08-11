import { HistoryCard } from "@components/HistoryCard";
import { Loading } from "@components/Loading";
import { ScreensHeader } from "@components/ScreensHeader";
import { useToast } from "@contexts/ToastContext";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useCallback, useState } from "react";
import { Platform, SectionList } from "react-native";
import styled from "styled-components/native";

export function History() {
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { showToast } = useToast();

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const response = await api.get("/history");
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate loading
      setExercises(response.data);
    } catch (error) {
      console.error("@screens/History > fetchHistory > error", error);
      if (error instanceof AppError) return showToast.error(error.message);
    } finally {
      setIsLoading(false);
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
      <Container Platform={Platform.OS}>
        {isLoading ? (
          <Loading />
        ) : (
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
        )}
      </Container>
    </>
  );
}
const Container = styled.SafeAreaView<{ Platform: string }>`
  flex: 1;
  padding: ${({ Platform }) =>
    Platform === "ios" ? "24px 24px 100px" : "0 0 24px"};
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
