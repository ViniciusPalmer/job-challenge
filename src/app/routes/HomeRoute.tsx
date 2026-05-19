import { SeoMetadata } from "../../shared/components/SeoMetadata";
import { SearchHero } from "./components/SearchHero";

export function HomeRoute() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(124,255,124,0.18),_transparent_28%),linear-gradient(180deg,#06070b_0%,#0e1118_100%)]">
      <SeoMetadata title="Animal Search" description="Search for various animals by type or name" />
      <SearchHero />
    </main>
  );
}
