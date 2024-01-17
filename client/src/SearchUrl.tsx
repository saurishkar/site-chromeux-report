import { FC, FormEvent, useEffect, useState } from "react";

export const SearchUrl: FC<{ onSubmit: Function }> = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const validateSearchQuery = () => {
    let response = { error: true, msg: "" };
    if (searchQuery.length === 0) {
      response.msg = "Search input cannot be empty";
      return response;
    }
    if (!/^https:\/\/(www\.)?[a-z0-9]+(\.[a-z]+)+$/.test(searchQuery)) {
      response.msg = "Url provided is invalid";
      return response;
    }
    return {
      error: false,
      msg: "",
    };
  };
  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { error, msg } = validateSearchQuery();
    if (error) {
      setError(msg);
      return;
    }
    onSubmit(searchQuery);
  };
  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (error) {
      setError("");
    }
  }, [searchQuery]);

  return (
    <div className="container search-form w-75">
      <form onSubmit={onFormSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="https://www.example.com/"
            aria-label="Website url"
            aria-describedby="button-search"
            onChange={handleSearchQueryChange}
            value={searchQuery}
          />
          <button
            className="btn btn-outline-dark px-5"
            type="submit"
            id="button-search"
          >
            <span>&#128269; Search</span>
          </button>
        </div>
        {error && (
          <div className="error-block">
            <span className="text-danger">{error}</span>
          </div>
        )}
      </form>
    </div>
  );
};
