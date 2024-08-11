import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { Loading } from "@components/Loading";
import { useToast } from "@contexts/ToastContext";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import React, { useCallback, useEffect } from "react";
import { FlatList, Platform, View } from "react-native";
import styled from "styled-components/native";

export function Home() {
  const [selectedGroup, setSelectedGroup] = React.useState<string | null>(null);
  const [groups, setGroups] = React.useState<string[]>([]);
  const [exercises, setExercises] = React.useState<ExerciseDTO[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigation<AppNavigatorRoutesProps>();
  const { showToast } = useToast();

  async function fetchGroups() {
    try {
      const response = await api.get("/groups");
      setGroups(response.data);
    } catch (error) {
      console.error("@screens/Home > fetchGroups > error", error);
      showToast.error("Erro ao carregar grupos");
    }
  }

  async function fetchExercisesByGroup(group: string) {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/bygroup/${group}`);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate loading

      setExercises(response.data);
    } catch (error) {
      console.error("@screens/Home > fetchExercisesByGroup > error", error);
      showToast.error("Erro ao carregar exercícios");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (selectedGroup) {
        fetchExercisesByGroup(selectedGroup);
      }
    }, [selectedGroup])
  );

  return (
    <>
      <HomeHeader />
      <Container>
        <FlatList
          horizontal
          data={groups}
          keyExtractor={(item: string) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            maxHeight: 40,
            height: 40,
            margin: Platform.OS === "ios" ? 12 : 0,
          }}
          renderItem={({ item }) => (
            <Group
              onPress={() =>
                setSelectedGroup((prev) => (prev === item ? null : item))
              }
              key={item}
              pressed={selectedGroup === item}
              disabled={isLoading}
              name={item}
            />
          )}
        />
        {isLoading ? (
          <View style={{ height: 200 }}>
            <Loading />
          </View>
        ) : (
          <>
            <HStack>
              <Heading>Exercícios</Heading>
              <Text>{exercises.length}</Text>
            </HStack>
            <FlatList
              data={exercises}
              keyExtractor={(item) => `${item.id}-${item.name}`}
              renderItem={(item) => (
                <ExerciseCard
                  data={item}
                  onPress={() =>
                    // @ts-ignore
                    navigate.navigate("Exercise", { exerciseId: item.item.id })
                  }
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 24 }}
            />
          </>
        )}
      </Container>
    </>
  );
}

const Container = styled.SafeAreaView`
  gap: 24px;
  padding: 24px;
`;

const HStack = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
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
