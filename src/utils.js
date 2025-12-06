export const numToDollar = (number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 3,
  }).format(number);

export const dollarToNum = (dollars) =>
  parseInt(dollars.split(".")[0].replaceAll(",", "").replace("$", "") || "0");

export const moreInt = (value) => {
  if (value <= 0) return 1;

  const exponent = Math.floor(Math.log10(value));
  const scale = Math.pow(10, Math.max(0, exponent - 1));

  const normalized = Math.floor(value / scale);
  const nextNormalized = normalized + 1;

  return nextNormalized * scale;
};

export const lessInt = (value) => {
  if (value <= 1) return 0;

  const exponent = Math.floor(Math.log10(value));
  const scale = Math.pow(10, Math.max(0, exponent - 1));

  const normalized = Math.floor(value / scale);
  const prevNormalized = normalized - 1;

  const result = prevNormalized * scale;
  return result >= 0 ? result : 0;
}
