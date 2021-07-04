import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  // render app
  render(<App />);

  // add ice scream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: /cherries/i,
  });
  userEvent.click(cherriesCheckbox);

  // find and click order button
  const orderButton = screen.getByRole("button", { name: /order/i });
  userEvent.click(orderButton);

  // check summary information based on order
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsTotal = screen.getByText("Scoops: $", { exact: false });
  expect(scoopsTotal).toHaveTextContent("2.00");

  const toppingsTotal = screen.getByText("Toppings: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("1.50");

  const grandTotal = screen.getByText("Total $", { exact: false });
  expect(grandTotal).toHaveTextContent("3.50");

  const optionItems = screen.getAllByRole("listitem");
  const optionItemsText = optionItems.map((item) => item.textContent);
  expect(optionItemsText).toEqual(["1 Vanilla", "Cherries"]);

  // accept terms and conditions and click button to confirm order
  const tcCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  userEvent.click(tcCheckbox);

  const confirmOrderButton = screen.getByRole("button", { name: /confirm/i });
  userEvent.click(confirmOrderButton);

  // confirm order number on confirmation page
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = screen.getByText("Your order number is", {
    exact: false,
  });
  expect(orderNumber).toHaveTextContent("1234567890");

  // click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", { name: /new order/i });
  userEvent.click(newOrderButton);

  // check that scoops and topping subtotals have been reset
  expect(screen.getByText("Scoops total: $0.00")).toBeInTheDocument();
  expect(screen.getByText("Toppings total: $0.00")).toBeInTheDocument();

  // do we need to await anything to avoid test errors ?
  await screen.findByRole("spinbutton", { name: /vanilla/i });
  await screen.findByRole("checkbox", { name: /cherries/i });
});
