import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useToast } from "@contexts/ToastContext";
import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, ScrollView } from "react-native";
import styled from "styled-components/native";

export function SignIn() {
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);

  const { showToast } = useToast();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string; password: string }>({});

  const { signIn } = useAuth();

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardIsVisible(true);
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardIsVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (errors.email || errors.password) {
      showToast("Por favor, preencha todos os campos");
    }
  }, [isSubmitting]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} accessible={false}>
      <Container keyBoardIsVisible={keyboardIsVisible}>
        <Background
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
        />
        <Center>
          <LogoSvg />
          <Text>Treine sua mente e seu corpo</Text>
          <Heading>Acesse sua conta</Heading>
        </Center>
        <Controller
          control={control}
          name="email"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Input
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder={"E-mail"}
              onChangeText={onChange}
              value={value}
              isInvalid={errors.email !== undefined}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Input
              secureTextEntry
              placeholder="Senha"
              onChangeText={onChange}
              value={value}
              isInvalid={errors.password !== undefined}
            />
          )}
        />
        <Button
          title="Acessar"
          onPress={handleSubmit((data) => signIn(data.email, data.password))}
        />
        <Footer>
          <Text>Não tem uma conta?</Text>
          <Button
            title="Criar nova conta"
            type="OUTLINE"
            onPress={() => navigation.navigate("SignUp")}
          />
        </Footer>
      </Container>
    </ScrollView>
  );
}

const Container = styled.View<{ keyBoardIsVisible: boolean }>`
  flex: 8;
  padding: 24px;
  gap: 20px;
  padding-bottom: ${({ keyBoardIsVisible }) =>
    keyBoardIsVisible ? "100%" : "24px"};
`;

const Background = styled.Image`
  flex: 1;
  position: absolute;
  top: 0;
  resize: contain;
`;

const Center = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30%;
`;

const Heading = styled.Text`
  color: ${({ theme }) => theme.colors.gray[100]};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-family: ${({ theme }) => theme.fonts.heading};
  margin-top: 50%;
  margin-bottom: 10px;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.gray[100]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: 10px 0;
  font-family: ${({ theme }) => theme.fonts.body};
  text-align: center;
`;

const Footer = styled.View`
  position: absolute;
  padding: 0 24px;
  gap: 10px;
  bottom: 5%;
  right: 0;
  left: 0;
`;
