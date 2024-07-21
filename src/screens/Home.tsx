import React from "react";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { FlatList, View, ListRenderItem } from "react-native";
import styled from "styled-components/native";

export function Home() {
  const [selectedGroup, setSelectedGroup] = React.useState<string | null>(null);

  const groups: string[] = ["Costas", "Bíceps", "Tríceps", "Ombro"];

  return (
    <Container>
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
      <VStack>
        <HStack>
          <Heading>Exercícios</Heading>
          <Text>{groups.length}</Text>
        </HStack>
      </VStack>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  gap: 20px;
`;

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
  padding: 0 24px;
  max-height: 40px;
`;

const HStack = styled.View`
  padding: 0 24px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const VStack = styled.View``;

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
