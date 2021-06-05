import { SCOOPS_PRICE, TOPPINGS_PRICE } from "../../contants";
import Options from "./Options";

export default function OrderEntry() {
  return (
    <div>
      <h2>Scoops</h2>
      <p>{SCOOPS_PRICE}</p>
      <Options optionType="scoops" />

      <h2>Toppings</h2>
      <p>{TOPPINGS_PRICE}</p>
      <Options optionType="toppings" />
    </div>
  );
}
