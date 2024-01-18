import path from "path";

const { BigQuery } = require("@google-cloud/bigquery");

export const queryCrUX = async ({ urls }: { urls: string[] }) => {
  // Create a client
  const bigqueryClient = new BigQuery({
    keyFilename: path.resolve(__dirname, "../../big-query.json"),
    projectId: process.env.GCP_PROJECT_ID,
  });

  // The SQL query to run
  const sqlQuery = `SELECT date, origin, p75_fcp, p75_lcp, p75_cls
                FROM chrome-ux-report.materialized.metrics_summary
                WHERE origin in (${urls.map((url) => `'${url}'`).join(", ")})
                ORDER BY date DESC
                LIMIT 50 `;

  const options = {
    query: sqlQuery,
    // Location must match that of the dataset(s) referenced in the query.
    location: "US",
    params: {},
  };

  // Run the query
  const data = await bigqueryClient.query(options);
  return data;
};
