import styled from "styled-components/native";

export function HistoryCard({ data }: { data: HistoryDTO }) {
  return (
    <HStack>
      <VStack>
        <Heading>{data.group}</Heading>
        <Text>{data.name}</Text>
      </VStack>

      <Text>{data.hour}</Text>
    </HStack>
  );
}

const HStack = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background-color: ${({ theme }) => theme.colors.gray[600]};
  padding: 20px 16px;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const VStack = styled.View`
  align-items: flex-start;
  flex: 1;
`;

const Heading = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: "tail",
})`
  color: ${({ theme }) => theme.colors.gray[100]};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-family: ${({ theme }) => theme.fonts.heading};
  text-transform: capitalize;
`;

const Text = styled.Text.attrs({
  numberOfLines: 2,
  ellipsizeMode: "tail",
})`
  color: ${({ theme }) => theme.colors.gray[100]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.body};
  text-align: center;
  text-transform: capitalize;
`;
