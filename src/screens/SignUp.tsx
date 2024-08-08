import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Toast } from "@components/Toast";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, ScrollView } from "react-native";
import styled from "styled-components/native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormDataType = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "A senha deve ter pelo menos 6 digitos"),
  confirm_password: yup
    .string()
    .required("Confirmação de senha obrigatória")
    .min(6, "A confirmação de senha deve ter pelo menos 6 digitos")
    .oneOf([yup.ref("password")], "As senhas devem ser iguais"),
});

export function SignUp() {
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormDataType>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const navigation = useNavigation();

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500); // Duração do toast
  };

  function handleSignUp(data: FormDataType) {
    console.log(data);
  }

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
    if (
      errors.name ||
      errors.email ||
      errors.password ||
      errors.confirm_password
    ) {
      handleShowToast();
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
          <Heading>Criar sua conta</Heading>
        </Center>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Nome"
              onChangeText={onChange}
              value={value}
              isInvalid={errors.name !== undefined}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
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
        <Controller
          control={control}
          name="confirm_password"
          render={({ field: { onChange, value } }) => (
            <Input
              secureTextEntry
              placeholder="Confirme a senha"
              onChangeText={onChange}
              value={value}
              returnKeyType="send"
              isInvalid={errors.confirm_password !== undefined}
            />
          )}
        />
        <Button title="Criar" onPress={handleSubmit(handleSignUp)} />
        <Footer>
          <Button
            title="Voltar para o login"
            type="OUTLINE"
            onPress={() => navigation.goBack()}
          />
        </Footer>
      </Container>
      <Toast
        message={
          errors.name?.message ||
          errors.email?.message ||
          errors.password?.message ||
          errors.confirm_password?.message ||
          "Erro ao criar conta"
        }
        visible={showToast}
      />
    </ScrollView>
  );
}

const Container = styled.View<{ keyBoardIsVisible: boolean }>`
  flex: 8;
  padding: 24px;
  gap: 10px;
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
  margin-top: 20%;
`;

const Heading = styled.Text`
  color: ${({ theme }) => theme.colors.gray[100]};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-family: ${({ theme }) => theme.fonts.heading};
  margin-top: 40%;
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
