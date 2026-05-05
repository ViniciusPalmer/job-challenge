import { HomeContainer, HomeContent, GoogleImg } from "./styles";

import GoogleLogo from "../../assets/google_icon.png";

import { Footer } from "../../components/Footer";
import { HomeHeader } from "./components/HomeHeader";
import { SearchMenuBar } from "../../components/SearchMenuBar";
import { SeoMetadata } from "../../components/SeoMetadata";

export function Home() {
  return (
    <HomeContainer>
      <SeoMetadata title="Animal Search" description="Search for various animals by type or name" />
      <HomeHeader />
      <HomeContent>
        <GoogleImg src={GoogleLogo} alt="Logo Google" />
        <SearchMenuBar />
      </HomeContent>
      <Footer />
    </HomeContainer>
  );
}
