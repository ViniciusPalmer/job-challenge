import GoogleLogo from "../../assets/google_icon.png";
import { SearchMenuBar } from "../../features/animal-search/components/SearchMenuBar";
import { Footer } from "../../shared/components/Footer";
import { SeoMetadata } from "../../shared/components/SeoMetadata";
import { HomeHeader } from "./components/HomeHeader";

export function HomeRoute() {
  return (
    <main className="w-screen h-screen flex flex-col items-center">
      <SeoMetadata title="Animal Search" description="Search for various animals by type or name" />
      <HomeHeader />
      <div className="w-[40vw] flex flex-col items-center justify-around fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[80vw]">
        <h1 className="sr-only">Animal Search Home</h1>
        <img className="w-3/4 mb-6" src={GoogleLogo} alt="" />
        <SearchMenuBar />
      </div>
      <Footer />
    </main>
  );
}
