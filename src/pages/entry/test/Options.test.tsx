import { render, screen } from "@testing-library/react";
import { ReactElement } from "react";
import { OrderProvider } from "../../../contexts/OrderContext";
import Options from "../Options";

const customRender = (ui: ReactElement) =>
  render(ui, { wrapper: OrderProvider });

test("displays image for each scoop option from the server", async () => {
  customRender(<Options optionType="scoops" />);

  // find images
  const scoopImages = (await screen.findAllByRole("img", {
    name: /scoop$/i,
  })) as HTMLImageElement[];
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each topping option from the server", async () => {
  customRender(<Options optionType="toppings" />);

  // find images
  const scoopImages = (await screen.findAllByRole("img", {
    name: /topping$/i,
  })) as HTMLImageElement[];
  expect(scoopImages).toHaveLength(3);

  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
