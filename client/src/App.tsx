import "./App.css";
import { SearchUrl } from "./SearchUrl";

function App() {
  const onSubmit = () => {};
  return (
    <div className="App container py-5">
      <div className="mx-auto text-center">
        <h1 className="title">Site ChromeUX Report</h1>
        <p className="mb-5 text-secondary">
          Generate web vitals report for your website
        </p>
      </div>
      <SearchUrl onSubmit={onSubmit} />
    </div>
  );
}

export default App;
