interface INoResultsFound {
  searchText?: string;
  suggestionList: string[];
}

export function NoResultsFound({
  searchText,
  suggestionList,
}: INoResultsFound) {
  const hasSuggestions = suggestionList.length > 0;

  return (
    <section className="flex min-h-[320px] w-full items-center justify-center rounded-[28px] border border-dashed border-white/10 bg-slate-950/60 px-6 py-10 text-center shadow-[0_20px_50px_rgba(2,6,23,0.3)]">
      <div className="max-w-xl">
        {searchText ? (
          <p className="text-xl font-semibold text-slate-50">No matches found for {searchText}.</p>
        ) : (
          <p className="text-xl font-semibold text-slate-50">Start searching to explore the animal catalog.</p>
        )}
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Try a broader term or browse one of the available animal types from the local dataset.
        </p>
        {hasSuggestions ? (
          <div className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Try one of these animal types:
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {suggestionList.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
