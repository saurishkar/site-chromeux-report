import { ChangeEvent, useEffect, useState } from "react";

import { UXReport } from "./components/UXReport";
import { SearchUrl } from "./components/SearchUrl";
import { Loader } from "./components/Loader";
import { DataFilters } from "./components/Filters";

import { resultDataType } from "./utils/dataParser";

import { getCrUXApi } from "./utils/api";

import {
  DEFAULT_FILTERS,
  FORM_FIELDS_MAPPING,
  filtersType,
} from "./constants/api";

import { useSortBy } from "./hooks/useSortBy";

import "./App.css";

const { date } = FORM_FIELDS_MAPPING;

function App() {
  const [uxData, setUXData]: [resultDataType[], Function] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [apiError, setApiError]: [string, Function] = useState("");
  const [sortedBy, setSortedBy] = useSortBy(date);
  const [queryEmails, setQueryEmails]: [string[], Function] = useState([]);
  const [filters, setFilters]: [filtersType, Function] =
    useState(DEFAULT_FILTERS);

  const fetchCrUXData = (
    urls: string[],
    { cb, sortBy = sortedBy }: { cb?: Function; sortBy: string }
  ) => {
    setIsFetching(true);
    return getCrUXApi({ urls, sortBy })
      .then((response) => {
        if (typeof cb === "function") cb();
        setQueryEmails(urls);
        setUXData(response.data.data);
      })
      .catch((err: Error) => setApiError(err.message))
      .finally(() => setIsFetching(false));
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters((currState: filtersType) => {
      return { ...currState, [e.target.name]: e.target.checked };
    });
  };

  useEffect(() => {
    if (isFetching && apiError) {
      setApiError();
    }
  }, [isFetching]);

  useEffect(() => {
    if (sortedBy && queryEmails.length) {
      fetchCrUXData(queryEmails, { sortBy: sortedBy });
    }
    return () => setQueryEmails([]);
  }, [sortedBy]);

  return (
    <div className="App container py-5">
      <div className="mx-auto text-center">
        <h1 className="title">Site ChromeUX Report</h1>
        <p className="mb-5 text-secondary">
          Generate web vitals report for your website
        </p>
        <SearchUrl onSubmit={fetchCrUXData} />
        {apiError && <p className="text-danger">{apiError}</p>}
      </div>
      <DataFilters onFilterChange={handleFilterChange} filters={filters} />
      <div
        className="mx-auto text-center mt-5 table-responsive"
        style={{ maxHeight: "345px" }}
      >
        <Loader loading={isFetching} className="">
          <UXReport
            data={uxData}
            onClickHeading={setSortedBy}
            sortedBy={sortedBy}
            filters={filters}
          />
        </Loader>
      </div>
    </div>
  );
}

export default App;
