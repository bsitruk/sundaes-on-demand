import { SCOOPS_PRICE, TOPPINGS_PRICE } from "../../contants";
import { useOrderCtx } from "../../contexts/OrderContext";
import { toCurrency } from "../../utils/toCurrency";
import Options from "./Options";

export default function OrderEntry() {
  const { totals } = useOrderCtx();

  return (
    <div>
      <h2>Scoops</h2>
      <p>{SCOOPS_PRICE} each</p>
      <Options optionType="scoops" />

      <h2>Toppings</h2>
      <p>{TOPPINGS_PRICE} each</p>
      <Options optionType="toppings" />

      <h2>Grand total: {toCurrency(totals.grandTotal)}</h2>
    </div>
  );
}
