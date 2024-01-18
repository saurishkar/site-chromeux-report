const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const getSiteUXReport = `${BASE_URL}/api/get_report`;

export const FORM_FIELDS_MAPPING = {
  date: "date",
  origin: "origin",
  p75_fcp: "p75_fcp",
  p75_lcp: "p75_lcp",
  p75_cls: "p75_cls",
};
export const SORT_TYPE = {
  asc: "ASC",
  desc: "DESC",
};
