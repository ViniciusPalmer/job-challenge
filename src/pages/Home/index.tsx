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
        <h1 style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}>
          Animal Search Home
        </h1>
        <GoogleImg src={GoogleLogo} alt="" />
        <SearchMenuBar />
      </HomeContent>
      <Footer />
    </HomeContainer>
  );
}
