import axios from "axios";
import { useEffect, useState } from "react";
import { Scoop, Topping } from "../../types";
import ScoopOptions from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";

type OptionsProps = {
  optionType: "scoops" | "toppings";
};

export const Options = ({ optionType }: OptionsProps) => {
  const [items, setItems] = useState<unknown[]>([]);

  useEffect(() => {
    axios
      .get<unknown[]>(`/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => console.log(error));
  }, [optionType]);

  let scoopsOrToppings = null;
  if (optionType === "scoops") {
    scoopsOrToppings = (items as Scoop[]).map((item) => (
      <ScoopOptions
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
      />
    ));
  } else {
    scoopsOrToppings = (items as Topping[]).map((item) => (
      <ToppingOptions
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
      />
    ));
  }

  return <>{scoopsOrToppings}</>;
};

export default Options;
