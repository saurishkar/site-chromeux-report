import { useEffect, useState } from "react";

import { UXReport } from "./components/UXReport";
import { SearchUrl } from "./components/SearchUrl";
import { Loader } from "./components/Loader";

import { getSiteUXReport } from "./constants/api";

import { parseUXData, resultDataType } from "./utils/dataParser";

import "./App.css";

function App() {
  const [uxData, setUXData]: [resultDataType, Function] = useState(
    {} as resultDataType
  );
  const [isFetching, setIsFetching] = useState(false);
  const [apiError, setApiError]: [string, Function] = useState("");

  const onSubmit = (url: string) => {
    setIsFetching(true);
    fetch(getSiteUXReport.replace(":url", encodeURIComponent(url)))
      .then((response) => response.json())
      .then((response) => setUXData(parseUXData(response)))
      .catch((err: Error) => setApiError(err.message))
      .finally(() => setIsFetching(false));
  };

  useEffect(() => {
    if (isFetching && apiError) {
      setApiError();
    }
  }, [isFetching]);

  return (
    <div className="App container py-5">
      <div className="mx-auto text-center">
        <h1 className="title">Site ChromeUX Report</h1>
        <p className="mb-5 text-secondary">
          Generate web vitals report for your website
        </p>
        <SearchUrl onSubmit={onSubmit} />
        {apiError && <p className="text-danger">{apiError}</p>}
      </div>
      <div className="mx-auto text-center mt-5">
        <Loader loading={isFetching} className="">
          <UXReport data={uxData} />
        </Loader>
      </div>
    </div>
  );
}

export default App;
