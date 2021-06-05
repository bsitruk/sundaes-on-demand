export function calculateSubTotal<
  T extends Record<string, Map<string, number>>
>(key: keyof T, mapObject: T, price: number) {
  return (
    Array.from(mapObject[key].values()).reduce((prev, curr) => {
      return prev + curr;
    }) * price
  );
}
