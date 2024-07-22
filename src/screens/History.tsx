import { HistoryCard } from "@components/HistoryCard";
import { ScreensHeader } from "@components/ScreensHeader";
import { useState } from "react";
import { SectionList, View } from "react-native";
import styled from "styled-components/native";

export function History() {
  const [exercises, setExercises] = useState<
    { title: string; data: string[] }[]
  >([
    {
      title: "10.10.22",
      data: ["Puxada frontal", "Remada unilateral", "Remada Smith"],
    },
    {
      title: "12.10.22",
      data: ["Puxada frontal", "Remada unilateral", "Remada Smith"],
    },
  ]);
  return (
    <>
      <ScreensHeader title="Histórico de exercícios" />
      <Container>
        <SectionList
          sections={exercises}
          keyExtractor={(title) => title}
          renderItem={() => <HistoryCard />}
          renderSectionHeader={({ section }) => (
            <Heading>{section.title}</Heading>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            exercises.length === 0
              ? { flex: 1, justifyContent: "center", alignItems: "center" }
              : { paddingBottom: 100 }
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
  font-family: ${({ theme }) => theme.fonts.body};
  margin-bottom: 12px;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.gray[100]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.body};
  text-align: center;
`;
