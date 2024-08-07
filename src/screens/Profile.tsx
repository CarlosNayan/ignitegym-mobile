import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreensHeader } from "@components/ScreensHeader";
import { SkeletonComponent } from "@components/SkelletonElement";
import { UserPhoto } from "@components/UserPhoto";
import { useState } from "react";
import styled, { useTheme } from "styled-components/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";

export function Profile() {
  const [loading, setLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(
    "https://github.com/carlosnayan.png"
  );

  const PHOTO_SIZE = 128;

  const { colors } = useTheme();

  async function handleUserPhotoSelect() {
    try {
      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        aspect: [4, 4],
      });
      setLoading(true);

      if (selectedPhoto.canceled) return;

      if (selectedPhoto.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          selectedPhoto.assets[0].uri
        );
        if (photoInfo && "size" in photoInfo) {
          if (photoInfo.size / 1024 / 1024 > 5) {
            Alert.alert("Essa imagem é muito grande. Escolha uma de até 5MB.");
            return;
          }
        }
      } else {
        return Alert.alert("Não foi possível selecionar a imagem.");
      }

      setUserPhoto(selectedPhoto.assets[0].uri);
    } catch (error) {
      console.error(
        "screens/Profile.tsx > handleUserPhotoSelect > error",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ScreensHeader title="Perfil" />
      <Container>
        {loading ? (
          <SkeletonComponent
            height={PHOTO_SIZE}
            width={PHOTO_SIZE}
            borderRadius={100}
            startColor={colors.gray[500]}
            endColor={colors.gray[400]}
          />
        ) : (
          <UserPhoto
            size={PHOTO_SIZE}
            source={userPhoto ? { uri: userPhoto } : undefined}
            alt="Imagem do usuário"
            marginRight={8}
          />
        )}
        <ProfileButton onPress={handleUserPhotoSelect}>
          <TextProfileButton> Alterar imagem</TextProfileButton>
        </ProfileButton>
        <Input placeholder="Nome" bgColor={colors.gray[600]} width="100%" />
        <Input
          placeholder="Email"
          bgColor={colors.gray[650]}
          width="100%"
          editable={false}
        />
        <Text>Alterar senha</Text>
        <Input
          placeholder="Senha antiga"
          bgColor={colors.gray[600]}
          width="100%"
          secureTextEntry
        />
        <Input
          placeholder="Nova senha"
          bgColor={colors.gray[600]}
          width="100%"
          secureTextEntry
        />
        <Input
          placeholder="Confirme a nova senha"
          bgColor={colors.gray[600]}
          width="100%"
          secureTextEntry
        />
        <Button marginTop={"24px"} title="Salvar alterações" type="SOLID" />
      </Container>
    </>
  );
}
const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: "center",
    paddingBottom: 56,
  },
})`
  flex: 1;
  padding: 24px;
  gap: 20px;
`;

const ProfileButton = styled.TouchableOpacity``;

const TextProfileButton = styled.Text`
  color: ${({ theme }) => theme.colors.green[500]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.heading};
  margin-top: 8px;
  margin-bottom: 24px;
  transform: translateX(-8px);
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.gray[100]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.body};
  margin-top: 24px;
  margin-bottom: 24px;
  text-align: start;
  width: 100%;
`;
