import { SeoMetadata } from "../../shared/components/SeoMetadata";
import { SearchHero } from "./components/SearchHero";

export function HomeRoute() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(163,230,53,0.1),_transparent_28%),linear-gradient(180deg,_#020617_0%,_#0f172a_52%,_#111827_100%)] text-slate-50">
      <SeoMetadata title="Animal Search" description="Search for various animals by type or name" />
      <SearchHero />
    </main>
  );
}
