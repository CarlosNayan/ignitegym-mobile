import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Keyboard, Platform, ScrollView } from "react-native";
import styled from "styled-components/native";

export function SignUp() {
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);

  const navigation = useNavigation();

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
        <Input placeholder="Nome" />
        <Input
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="E-mail"
        />
        <Input secureTextEntry placeholder="Senha" />
        <Button title="Criar" />
        <Footer>
          <Button
            title="Voltar para o login"
            type="OUTLINE"
            onPress={() => navigation.goBack()}
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
