type percentiles = {
  percentiles: {
    p75: string | number;
  };
};

type metricsData = {
  key: {
    origin: string;
  };
  metrics: {
    cumulative_layout_shift: percentiles;
    first_contentful_paint: percentiles;
    first_input_delay: percentiles;
    largest_contentful_paint: percentiles;
  };
  collection_period: object;
};

export type resultDataType = {
  origin: string;
  cls: string | number;
  fcp: string | number;
  fid: string | number;
  lcp: string | number;
  period: object;
};

export const parseUXData = (data: metricsData): resultDataType => {
  const { key, metrics, collection_period } = data;
  const {
    cumulative_layout_shift,
    first_contentful_paint,
    first_input_delay,
    largest_contentful_paint,
  } = metrics;

  return {
    origin: key.origin,
    cls: cumulative_layout_shift.percentiles.p75,
    fcp: first_contentful_paint.percentiles.p75,
    fid: first_input_delay.percentiles.p75,
    lcp: largest_contentful_paint.percentiles.p75,
    period: collection_period,
  };
};
