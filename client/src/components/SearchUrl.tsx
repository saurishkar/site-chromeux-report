import { FC, FormEvent, useEffect, useState } from "react";
import { getValidAndInvalidEmails } from "../utils/dataParser";

export const SearchUrl: FC<{ onSubmit: Function }> = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  const validateSearchQuery = () => {
    let response = { error: true, msg: "", emails: [] };
    if (searchQuery.length === 0) {
      response.msg = "Search input cannot be empty";
      return response;
    }

    const { valid, invalid } = getValidAndInvalidEmails(searchQuery);
    if (valid.length > 10) {
      response.msg = "Only 10 unique emails allowed";
      return response;
    }
    if (invalid.length) {
      response.msg = `Some emails in the query are invalid: ${invalid.join(
        ", "
      )}`;
      return response;
    }
    return {
      error: false,
      msg: "",
      emails: valid,
    };
  };
  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { error, msg, emails } = validateSearchQuery();
    if (error) {
      setError(msg);
      return;
    }
    onSubmit(emails);
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
    <div className="container search-form text-start">
      <form onSubmit={onFormSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            id="searchInput"
            className="form-control"
            placeholder="https://www.example.com,https://www.google.com"
            aria-label="Add comma separated urls to search CrUX data"
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
