export const createHistogram = (values, binCount = 10, min = null, max = null) => {
  if (!Array.isArray(values) || values.length === 0) {
    return { labels: [], bins: [] };
  }

  // Use provided min/max or compute from data
  const dataMin = min !== null ? min : Math.min(...values);
  const dataMax = max !== null ? max : Math.max(...values);

  const range = dataMax - dataMin;

  // Edge case: all values identical
  if (range === 0) {
    return {
      labels: [`${dataMin.toFixed(6)}`],
      bins: [values.length]
    };
  }

  const binWidth = range / binCount;

  const bins = new Array(binCount).fill(0);

  // Fill bins
  values.forEach((v) => {
    let index = Math.floor((v - dataMin) / binWidth);

    // Edge case: max value falls outside
    if (index === binCount) index = binCount - 1;

    bins[index]++;
  });

  // Create labels
  const labels = bins.map((_, i) => {
    const start = dataMin + i * binWidth;
    const end = start + binWidth;
    return `${(start * 1000).toFixed(3)}–${(end * 1000).toFixed(3)} ms`;
  });

  return { labels, bins };
};