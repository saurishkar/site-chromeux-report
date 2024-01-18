import { useEffect, useState } from "react";

import { UXReport } from "./components/UXReport";
import { SearchUrl } from "./components/SearchUrl";
import { Loader } from "./components/Loader";

import { resultDataType } from "./utils/dataParser";

import { getCrUXApi } from "./utils/api";

import "./App.css";

function App() {
  const [uxData, setUXData]: [resultDataType[], Function] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [apiError, setApiError]: [string, Function] = useState("");

  const onSubmit = (urls: string[]) => {
    setIsFetching(true);
    return getCrUXApi({ urls })
      .then((response) => setUXData(response.data.data))
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
      <div
        className="mx-auto text-center mt-5 table-responsive"
        style={{ maxHeight: "345px" }}
      >
        <Loader loading={isFetching} className="">
          <UXReport data={uxData} />
        </Loader>
      </div>
    </div>
  );
}

export default App;
