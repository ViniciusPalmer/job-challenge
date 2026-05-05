import { FooterContainer, FooterText } from "./styles";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <FooterContainer>
      <FooterText>© Google {currentYear}</FooterText>
      <FooterText>version 0.1.0</FooterText>
    </FooterContainer>
  );
}
