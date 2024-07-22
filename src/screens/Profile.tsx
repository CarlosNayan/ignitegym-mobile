import { ScreensHeader } from "@components/ScreensHeader";
import { SkeletonComponent } from "@components/SkelletonElement";
import { UserPhoto } from "@components/UserPhoto";
import { useState } from "react";
import styled, { useTheme } from "styled-components/native";

export function Profile() {
  const [loading, setLoading] = useState(false);

  const PHOTO_SIZE = 128;

  const { colors } = useTheme();

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
            source={{
              uri: "https://github.com/carlosnayan.png",
            }}
            alt="Imagem do usuário"
            marginRight={8}
          />
        )}
      </Container>
    </>
  );
}
const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: "center",
  },
})`
  flex: 1;
  padding: 24px;
  gap: 20px;
`;