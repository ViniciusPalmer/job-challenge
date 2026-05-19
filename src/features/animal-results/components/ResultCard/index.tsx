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
      className={`mb-4 w-full rounded-3xl border p-5 text-left transition-colors ${
        isActive ? "border-blue-200 bg-blue-50/70" : "border-gray-200 bg-white hover:border-blue-100"
      }`}
    >
      <span className="mb-3 inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
        {animal.summaryTag}
      </span>
      <button
        type="button"
        onClick={onSelect}
        aria-controls={ariaControls}
        aria-expanded={ariaExpanded}
        className="mb-2 bg-transparent text-left text-2xl font-semibold text-slate-900 transition-all hover:text-blue-500"
      >
        {animal.title}
      </button>
      <p className="mb-4 text-sm font-medium text-slate-500">{animal.habitat}</p>
      <p className="mb-4 text-base text-slate-600">{animal.description}</p>
      <div className="flex flex-wrap gap-3 text-sm text-slate-500">
        <span>{animal.lifespan}</span>
        <span className="text-slate-300">/</span>
        <span>{animal.diet}</span>
      </div>
    </article>
  );
}
