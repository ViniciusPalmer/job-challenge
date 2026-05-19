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
    <article id={id} aria-label={`${animal.title} details`} className="w-full rounded-[2rem] border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-6 lg:max-w-[32rem] lg:p-8">
      <img className="mb-6 h-64 w-full rounded-[1.5rem] object-cover" src={animal.image} alt={animal.title} />
      <span className="mb-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
        {animal.type}
      </span>
      <h2 className="mb-3 text-3xl font-semibold text-slate-900">{animal.title}</h2>
      <p className="mb-5 text-base leading-7 text-slate-600">{animal.description}</p>
      <div className="mb-6 rounded-2xl bg-slate-50 p-4 text-slate-700">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">At a glance</p>
        <p className="mt-2 text-lg font-medium">{animal.summaryTag}</p>
      </div>
      <dl className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {metadata.map((item) => (
          <div key={item.label} className="rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3">
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{item.label}</dt>
            <dd className="mt-2 text-base font-medium text-slate-900">{item.value}</dd>
          </div>
        ))}
      </dl>
      <a className="mt-6 inline-flex text-sm font-semibold text-blue-500 hover:text-blue-400" href={animal.url} target="_blank" rel="noopener noreferrer">
        Visit source
      </a>
    </article>
  );
}
