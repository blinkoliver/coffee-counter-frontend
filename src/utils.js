export const getSum = (prices) => {
  return prices
    .map((element) => element.value)
    .reduce((a, b) => a + b, 0)
    .toFixed(2);
};

export const Fetch = (url, params) => {
  return fetch(url).then(response => response.json());
};