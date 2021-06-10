const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function toCurrency(value: number) {
  return formatter.format(value);
}
