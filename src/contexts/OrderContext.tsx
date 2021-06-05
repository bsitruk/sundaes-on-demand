import React, { useCallback, useMemo, useState } from "react";
import { SCOOPS_PRICE, TOPPINGS_PRICE } from "../contants";
import { calculateSubTotal } from "../utils/calculateSubtotal";
import { createCtx } from "./ContextCreator";

type OptionCountsType = {
  scoops: Map<string, number>;
  toppings: Map<string, number>;
};

type TotalsType = {
  scoops: number;
  toppings: number;
  grandTotal: number;
};

type OrderContextType = OptionCountsType & {
  updateItemCount: (
    itemName: string,
    newItemCount: string,
    optionType: keyof OptionCountsType
  ) => void;

  totals: TotalsType;
};

const [useOrderCtx, CtxProvider] = createCtx<OrderContextType>();

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [optionCounts, setOptionCounts] = useState<OptionCountsType>({
    scoops: new Map(),
    toppings: new Map(),
  });

  const updateItemCount: OrderContextType["updateItemCount"] = useCallback(
    (itemName, newItemCount, optionType) => {
      const newOptionCounts = { ...optionCounts };
      newOptionCounts[optionType].set(itemName, parseInt(newItemCount));
      setOptionCounts(newOptionCounts);
    },
    [optionCounts]
  );

  const totals: TotalsType = useMemo(() => {
    const scoopsSubTotal = calculateSubTotal(
      "scoops",
      optionCounts,
      SCOOPS_PRICE
    );
    const toppingsSubTotal = calculateSubTotal(
      "toppings",
      optionCounts,
      TOPPINGS_PRICE
    );

    return {
      scoops: scoopsSubTotal,
      toppings: toppingsSubTotal,
      grandTotal: scoopsSubTotal + toppingsSubTotal,
    };
  }, [optionCounts]);

  return (
    <CtxProvider value={{ ...optionCounts, updateItemCount, totals }}>
      {children}
    </CtxProvider>
  );
}

export { useOrderCtx };
