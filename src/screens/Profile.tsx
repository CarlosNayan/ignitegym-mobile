import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreensHeader } from "@components/ScreensHeader";
import { SkeletonComponent } from "@components/SkelletonElement";
import { UserPhoto } from "@components/UserPhoto";
import { useToast } from "@contexts/ToastContext";
import { UserDTO } from "@dtos/UserDTO";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image } from "react-native";
import styled, { useTheme } from "styled-components/native";
import * as yup from "yup";

type FormDataProps = {
  name: string;
  email?: string;
  old_password?: string;
  password?: string;
  confirm_password?: string;
};

const profileSchema = yup.object({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string(),
  old_password: yup
    .string()
    .transform((value) => (!!value ? value : undefined)),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 digitos")
    .transform((value) => (!!value ? value : undefined)),
  confirm_password: yup
    .string()
    .transform((value) => (!!value ? value : undefined))
    .oneOf(
      [yup.ref("password"), undefined],
      "A confirmação de senha não confere"
    )
    .when("password", {
      is: (field: any) => field, // Quando 'password' tiver um valor
      then: (schema) =>
        schema
          .required("A confirmação de senha é obrigatória")
          .min(6, "A confirmação de senha deve ter pelo menos 6 digitos"),
      otherwise: (schema) => schema.notRequired(), // Quando 'password' não tiver um valor
    }),
});

export function Profile() {
  const [loading, setLoading] = useState(false);
  const [isSubmittingUpdate, setIsSubmittingUpdate] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(true);
  const [avatarSource, setAvatarSource] = useState<{ uri: string } | null>(
    null
  );

  const PHOTO_SIZE = 128;

  const { colors } = useTheme();
  const { showToast } = useToast();
  const { user, updateUser } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      old_password: undefined,
      password: undefined,
      confirm_password: undefined,
    },
    resolver: yupResolver(profileSchema),
  });

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

      if (!selectedPhoto.assets[0]?.uri) {
        return showToast.error("Não foi possível selecionar a imagem.");
      }

      const photoInfo = await FileSystem.getInfoAsync(
        selectedPhoto.assets[0]?.uri
      );

      if (
        photoInfo.exists &&
        photoInfo.size &&
        photoInfo.size / 1024 / 1024 > 5
      ) {
        return showToast.error(
          "Essa imagem é muito grande. Escolha uma de até 5MB."
        );
      }

      const fileExtension = selectedPhoto.assets[0].uri.split(".").pop();
      const photoFile = {
        name: `${user?.name}.${fileExtension}`.toLowerCase(),
        uri: selectedPhoto.assets[0].uri,
        type: `image/${fileExtension}`,
      } as any;

      const userPhotoUploadForm = new FormData();
      userPhotoUploadForm.append("avatar", photoFile);

      const response = await api.patch("/users/avatar", userPhotoUploadForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const userUpdated = user as UserDTO;
      userUpdated.avatar = `${api.defaults.baseURL}/avatar/${response.data.avatar}`;
      await updateUser(userUpdated);
      showToast.success("Avatar atualizado");
    } catch (error) {
      console.error(
        "screens/Profile.tsx > handleUserPhotoSelect > error",
        error
      );

      if (error instanceof AppError) showToast.error(error.message);
      else showToast.error("Não foi possível selecionar a imagem.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (
      errors.name ||
      errors.old_password ||
      errors.password ||
      errors.confirm_password
    ) {
      showToast.error(
        errors.name?.message ||
          errors.old_password?.message ||
          errors.password?.message ||
          errors.confirm_password?.message ||
          "Algo deu errado"
      );
    }
  }, [isSubmitting]);

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

  async function handleProfileUpdate(updatedData: FormDataProps) {
    try {
      setIsSubmittingUpdate(true);

      await api.put("/users", updatedData);

      const userUpdated = user as UserDTO;
      if (updatedData.name) userUpdated.name = updatedData.name;

      await updateUser(userUpdated);
      showToast.success("Atualizado com sucesso");
    } catch (error) {
      console.error("screens/Profile.tsx > handleProfileUpdate > error", error);

      if (error instanceof AppError) return showToast.error(error.message);
      else return showToast.error("Algo deu errado");
    } finally {
      setIsSubmittingUpdate(false);
    }
  }

  return (
    <>
      <ScreensHeader title="Perfil" />
      <Container>
        {avatarLoading ? (
          <SkeletonComponent
            style={{
              marginRight: 8,
              width: PHOTO_SIZE,
              height: PHOTO_SIZE,
              borderRadius: 100,
            }}
            startColor={colors.gray[500]}
            endColor={colors.gray[400]}
          />
        ) : (
          <UserPhoto
            size={PHOTO_SIZE}
            source={avatarSource || undefined}
            alt="Imagem do usuário"
            marginRight={8}
          />
        )}
        <ProfileButton onPress={handleUserPhotoSelect}>
          <TextProfileButton> Alterar imagem</TextProfileButton>
        </ProfileButton>
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <Input
              placeholder="Nome"
              bgColor={colors.gray[600]}
              width="100%"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { value } }) => (
            <Input
              placeholder="Email"
              bgColor={colors.gray[650]}
              width="100%"
              editable={false}
              value={value}
            />
          )}
        />
        <Text>Alterar senha</Text>
        <Controller
          control={control}
          name="old_password"
          render={({ field: { onChange } }) => (
            <Input
              placeholder="Senha antiga"
              bgColor={colors.gray[600]}
              width="100%"
              secureTextEntry
              onChangeText={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange } }) => (
            <Input
              placeholder="Nova senha"
              bgColor={colors.gray[600]}
              width="100%"
              secureTextEntry
              isInvalid={errors.password !== undefined}
              onChangeText={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="confirm_password"
          render={({ field: { onChange } }) => (
            <Input
              placeholder="Confirme a nova senha"
              bgColor={colors.gray[600]}
              width="100%"
              secureTextEntry
              isInvalid={errors.confirm_password !== undefined}
              onChangeText={onChange}
            />
          )}
        />
        <Button
          marginTop={"24px"}
          title="Salvar alterações"
          type="SOLID"
          isLoading={isSubmitting}
          onPress={handleSubmit(handleProfileUpdate)}
        />
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
