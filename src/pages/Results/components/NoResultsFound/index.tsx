interface INoResultsFound {
  searchText?: string;
  suggestionList: string[];
}

export function NoResultsFound({
  searchText,
  suggestionList,
}: INoResultsFound) {
  const noSuggestionsErrorDescription = () => {
    return <h1>API is not working, try restart your app.</h1>;
  };

  const isEmptyArray = (value: string[]) => {
    return value.length > 0 ? false : true;
  };

  return (
    <>
      {isEmptyArray(suggestionList) ? (
        noSuggestionsErrorDescription()
      ) : (
        <div className="flex flex-col">
          {searchText && (
            <span className="text-base mb-8">
              No Results Found for: <b>{searchText}</b>{" "}
            </span>
          )}
          <span className="text-base">
            Try looking for:{" "}
            {suggestionList.map((item, index) => (
              <b key={index}>
                {index > 0 && ","} {item}
              </b>
            ))}
            .
          </span>
        </div>
      )}
    </>
  );
}
