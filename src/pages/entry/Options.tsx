import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Scoop, Topping } from "../../types";
import ScoopOptions from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";
import Alert from "react-bootstrap/Alert";
import { useOrderCtx } from "../../contexts/OrderContext";

type OptionsProps = {
  optionType: "scoops" | "toppings";
};

export const Options = ({ optionType }: OptionsProps) => {
  const [items, setItems] = useState<Scoop[] | Topping[]>([]);
  const [error, setError] = useState("");
  const { scoops, toppings, updateItemCount } = useOrderCtx();

  useEffect(() => {
    axios
      .get<Scoop[] | Topping[]>(`/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error: AxiosError) => {
        if (error.response?.data.message) {
          setError(error.response?.data.message);
        }
      });
  }, [optionType]);

  let scoopsOrToppings = null;
  if (optionType === "scoops") {
    scoopsOrToppings = (items as Scoop[]).map((item) => (
      <ScoopOptions
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
        count={scoops.get(item.name) || 0}
        updateCount={(count: string) =>
          updateItemCount(item.name, count, "scoops")
        }
      />
    ));
  } else {
    scoopsOrToppings = (items as Topping[]).map((item) => (
      <ToppingOptions
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
        count={toppings.get(item.name) || 0}
        updateCount={(count: string) =>
          updateItemCount(item.name, count, "toppings")
        }
      />
    ));
  }

  return (
    <>{error ? <Alert variant="warning">{error}</Alert> : scoopsOrToppings}</>
  );
};

export default Options;
