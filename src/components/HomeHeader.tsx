import defaultUserPhotoImg from "@assets/userPhotoDefault.png";
import styled from "styled-components/native";
import { UserPhoto } from "./UserPhoto";

import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "@hooks/useAuth";
import { useEffect, useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { SkeletonComponent } from "./SkelletonElement";

export function HomeHeader() {
  const { user, signOut } = useAuth();
  const [avatarLoading, setAvatarLoading] = useState(true);
  const [avatarSource, setAvatarSource] = useState<{ uri: string } | null>(
    null
  );

  useEffect(() => {
    if (user?.avatar) {
      // Usando Image.prefetch para carregar a imagem antecipadamente
      Image.prefetch(user.avatar)
        .then(() => {
          setAvatarSource({ uri: user.avatar });
          setAvatarLoading(false);
        })
        .catch(() => {
          setAvatarLoading(false);
        });
    } else {
      setAvatarLoading(false);
    }
  }, [user?.avatar]);

  return (
    <HStack>
      {avatarLoading ? (
        <SkeletonComponent
          style={{ marginRight: 8, width: 64, height: 64, borderRadius: 100 }}
        />
      ) : (
        <UserPhoto
          size={64}
          source={avatarSource || defaultUserPhotoImg}
          alt="Imagem do usuário"
          marginRight={8}
        />
      )}

      <VStack>
        <Text>Olá,</Text>
        <Heading>{user?.name}</Heading>
      </VStack>
      <TouchableOpacity onPress={signOut}>
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
