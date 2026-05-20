import { IAnimal } from "../../../../shared/types/animal";

interface IResultCard {
  animal: Readonly<IAnimal>;
  isActive: boolean;
  onSelect: () => void;
  ariaControls?: string;
  ariaExpanded?: boolean;
}

export function ResultCard({ animal, isActive, onSelect, ariaControls, ariaExpanded }: IResultCard) {
  return (
    <article
      className={`mb-4 w-full rounded-[28px] border p-5 text-left transition-colors ${
        isActive
          ? "border-lime-300/70 bg-slate-900 shadow-[0_20px_50px_rgba(2,6,23,0.4)]"
          : "border-white/10 bg-slate-950/70 hover:border-lime-300/40"
      }`}
    >
      <span className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
        {animal.summaryTag}
      </span>
      <button
        type="button"
        onClick={onSelect}
        aria-controls={ariaControls}
        aria-expanded={ariaExpanded}
        className="mb-2 bg-transparent text-left text-2xl font-semibold text-slate-50 transition-all hover:text-lime-200"
      >
        {animal.title}
      </button>
      <p className="mb-4 text-sm font-medium text-slate-300">{animal.habitat}</p>
      <p className="mb-4 text-base leading-7 text-slate-400">{animal.description}</p>
      <div className="flex flex-wrap gap-3 text-sm text-slate-400">
        <span>{animal.lifespan}</span>
        <span className="text-slate-600">/</span>
        <span>{animal.diet}</span>
      </div>
    </article>
  );
}
