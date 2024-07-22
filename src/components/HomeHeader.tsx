import styled from "styled-components/native";
import { UserPhoto } from "./UserPhoto";

import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export function HomeHeader() {
  return (
    <HStack>
      <UserPhoto
        size={64}
        source={{
          uri: "https://media.licdn.com/dms/image/D4D03AQF-lH5Y3cdsbA/profile-displayphoto-shrink_200_200/0/1679594832410?e=1727308800&v=beta&t=jWOyItd2nySCHE4H17c0AhFTsDIaXbhnyWbtD1jy-Bw",
        }}
        alt="Imagem do usuário"
        marginRight={8}
      />
      <VStack>
        <Text>Olá,</Text>
        <Heading>Carlos</Heading>
      </VStack>
      <TouchableOpacity>
        <LogoutIcon name="logout" />
      </TouchableOpacity>
    </HStack>
  );
}
const HStack = styled.View`
  padding: 24px;
  padding-top: 48px;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.gray[600]};
  align-items: center;
`;

const VStack = styled.View`
  align-items: flex-start;
  flex: 1;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.gray[100]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.body};
`;

const Heading = styled.Text`
  color: ${({ theme }) => theme.colors.gray[100]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const LogoutIcon = styled(MaterialIcons).attrs(({ theme }) => ({
  color: theme.colors.gray[100],
  size: 24,
}))``;
