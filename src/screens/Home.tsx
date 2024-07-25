import React from "react";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { FlatList, View, ListRenderItem, FlatListProps } from "react-native";
import styled from "styled-components/native";
import { ExerciseCard } from "@components/ExerciseCard";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function Home() {
  const [selectedGroup, setSelectedGroup] = React.useState<string | null>(null);

  const navigate = useNavigation<AppNavigatorRoutesProps>();
  
  const groups: string[] = ["Costas", "Bíceps", "Tríceps", "Ombro"];

  const exercises = [
    {
      id: "1",
      name: "Remada unilateral",
    },
    {
      id: "2",
      name: "Remada Smith",
    },
  ];

  return (
    <>
      <HomeHeader />
      <HFlatList
        data={groups}
        keyExtractor={(item: string) => item}
        renderItem={({ item }) => (
          <Group
            onPress={() =>
              setSelectedGroup((prev) => (prev === item ? null : item))
            }
            key={item}
            pressed={selectedGroup === item}
            name={item}
          />
        )}
      />
      <Container>
        <HStack>
          <Heading>Exercícios</Heading>
          <Text>{exercises.length}</Text>
        </HStack>
        <VFlatList
          data={exercises}
          keyExtractor={(item: { id: string; name: string }) =>
            `${item.id}-${item.name}`
          }
          renderItem={({}) => (
            <ExerciseCard onPress={() => navigate.navigate("Exercise")} />
          )}
        />
      </Container>
    </>
  );
}

const HFlatList = styled.FlatList.attrs({
  contentContainerStyle: {
    paddingRight: 24,
  },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})<{
  renderItem: ListRenderItem<string>;
  keyExtractor: (item: string) => string;
}>`
  flex-direction: row;
  margin-top: 24px;
  margin-left: 24px;
  max-height: 40px;
`;

const VFlatList = styled.FlatList.attrs({
  contentContainerStyle: {
    paddingBottom: 24,
  },
  showsVerticalScrollIndicator: false,
})<{
  renderItem: ListRenderItem<{ id: string; name: string }>;
  keyExtractor: (item: { id: string; name: string }) => string;
}>`
  flex: 1;
  padding: 0 24px;
`;

const Container = styled.SafeAreaView`
  flex: 1;
  gap: 24px;
`;

const HStack = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 24px;
  padding: 0 24px;
`;

const Heading = styled.Text`
  color: ${({ theme }) => theme.colors.gray[100]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.gray[100]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.body};
`;
