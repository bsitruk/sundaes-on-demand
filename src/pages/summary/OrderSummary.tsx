import { useOrderCtx } from "src/contexts/OrderContext";
import { PageProps } from "src/types";
import { toCurrency } from "src/utils/toCurrency";
import SummaryForm from "./SummaryForm";

export default function OrderSummary({ next }: PageProps) {
  const { totals, scoops, toppings } = useOrderCtx();

  return (
    <div>
      <h1>Order Summary</h1>
      <div>
        <h2>Scoops: {toCurrency(totals.scoops)}</h2>
        <ul>
          {Array.from(scoops).map(([name, count]) => (
            <li key={name}>
              {count} {name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Toppings: {toCurrency(totals.toppings)}</h2>
        <ul>
          {Array.from(toppings).map(([name, _]) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
      <h2>Total {toCurrency(totals.grandTotal)}</h2>
      <SummaryForm onConfirm={next} />
    </div>
  );
}
