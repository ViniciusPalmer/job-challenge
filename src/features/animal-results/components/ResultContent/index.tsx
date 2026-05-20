import { IAnimal } from "../../../../shared/types/animal";

interface ResultContentProps {
  animal: Readonly<IAnimal>;
  id?: string;
}

export function ResultContent({ animal, id }: ResultContentProps) {
  const metadata = [
    { label: "Habitat", value: animal.habitat },
    { label: "Type", value: animal.type },
    { label: "Lifespan", value: animal.lifespan },
    { label: "Diet", value: animal.diet },
  ];

  return (
    <article
      id={id}
      aria-label={`${animal.title} details`}
      className="w-full rounded-[32px] border border-white/10 bg-slate-950/90 p-5 shadow-[0_20px_60px_rgba(2,6,23,0.4)] lg:sticky lg:top-6 lg:max-w-[32rem] lg:p-8"
    >
      <img className="mb-6 h-64 w-full rounded-[24px] object-cover" src={animal.image} alt={animal.title} />
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-lime-200">Selected result</p>
      <span className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
        {animal.type}
      </span>
      <h2 className="mb-3 text-3xl font-semibold text-slate-50 lg:text-4xl">{animal.title}</h2>
      <p className="mb-5 text-base leading-7 text-slate-300">{animal.description}</p>
      <div className="mb-6 rounded-[24px] border border-white/10 bg-white/5 p-4 text-slate-200">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">At a glance</p>
        <p className="mt-2 text-lg font-medium text-slate-50">{animal.summaryTag}</p>
      </div>
      <dl className="grid w-full grid-cols-2 gap-3">
        {metadata.map((item) => (
          <div key={item.label} className="rounded-[20px] border border-white/10 bg-slate-900 px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{item.label}</dt>
            <dd className="mt-2 text-base font-medium text-slate-50">{item.value}</dd>
          </div>
        ))}
      </dl>
      <a
        className="mt-6 inline-flex text-sm font-semibold text-lime-200 hover:text-lime-100"
        href={animal.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit source
      </a>
    </article>
  );
}
