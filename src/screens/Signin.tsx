import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Image, Keyboard, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";

export function Signin() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          style={{
            flex: 1,
            position: "absolute",
            backgroundColor: "#121214",
          }}
        />
        <Center>
          <LogoSvg />
          <Text>Treine sua mente e seu corpo</Text>
          <Heading>Acesse sua conta</Heading>
        </Center>
        <Input keyboardType="email-address" placeholder="E-mail" />
        <Input secureTextEntry placeholder="Senha" />
        <Button title="Acessar" />
      </Container>
    </TouchableWithoutFeedback>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray[700]};
  padding: 24px;
  gap: 20px;
`;

const Center = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30%;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.gray[100]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: 10px 0;
  font-family: ${({ theme }) => theme.fonts.body};
`;

const Heading = styled.Text`
  color: ${({ theme }) => theme.colors.gray[100]};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-family: ${({ theme }) => theme.fonts.heading};
  margin-top: 70px;
  margin-bottom: 40px;
`;
