## SITE CHROMEUX (CrUX) REPORT

<p>Web application to search the [CrUX](https://developer.chrome.com/docs/crux/bigquery/) data from Google BigQuery API for multiple websites</p>

### Tech Stack

- React Frontend + TypeScript
- Node.js Backend

### Other Tools

- Axios for client side api handling
- Express for Backend api route hanlding
- Bootstrap for styling on the Frontend
- [nodejs-bigquery](https://github.com/googleapis/nodejs-bigquery) library for managing query requests to BigQuery Database

### Instructions To Configure

- Clone the project using `git clone <repo_url>` command
- run `cd client && touch .env && cd ..`
- run `cd  server && touch .env && cd ..`
- under `client/.env` add the following key `REACT_APP_API_BASE_URL="http://localhost:4000"`
- under `server/.env` add the following key `GCP_PROJECT_ID=<your gcp project id>`
- Download `service account credentials` from gcp and save it under `server/big-query.json`. [Refer here for more](https://codelabs.developers.google.com/codelabs/cloud-bigquery-nodejs/index.html?index=..%2F..index#0)