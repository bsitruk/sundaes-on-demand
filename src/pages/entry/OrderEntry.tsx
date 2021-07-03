import Button from "react-bootstrap/Button";
import { SCOOPS_PRICE, TOPPINGS_PRICE } from "src/contants";
import { useOrderCtx } from "src/contexts/OrderContext";
import { toCurrency } from "src/utils/toCurrency";
import Options from "./Options";
import { PageProps } from "src/types";

export default function OrderEntry({ next }: PageProps) {
  const { totals } = useOrderCtx();

  return (
    <div>
      <h2>Scoops</h2>
      <p>{toCurrency(SCOOPS_PRICE)} each</p>
      <Options optionType="scoops" />

      <h2>Toppings</h2>
      <p>{toCurrency(TOPPINGS_PRICE)} each</p>
      <Options optionType="toppings" />

      <h2>Grand total: {toCurrency(totals.grandTotal)}</h2>

      <Button onClick={next} variant="primary">
        Order Sundae
      </Button>
    </div>
  );
}
