import React, { useContext, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { ThemeConsumer, useTheme } from "styled-components";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

export function SignIn() {
  const [isLoading, setisLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();
  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setisLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Google");
      setisLoading(false);
    }
  }
  async function handleSignInWithApple() {
    try {
      setisLoading(true);
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Apple");
      setisLoading(false);
    }
  }
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>{`Controle suas\nfinanças de forma\nmuito simples`}</Title>
        </TitleWrapper>
        <SignInTitle>{`Faça seu login com\numa das contas abaixo`}</SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          <SignInSocialButton
            title="Apple"
            svg={AppleSvg}
            onPress={handleSignInWithApple}
          />
        </FooterWrapper>
        {isLoading && (
          <ActivityIndicator
            color={theme.colors.shape}
            style={{ marginTop: 18 }}
          />
        )}
      </Footer>
    </Container>
  );
}
