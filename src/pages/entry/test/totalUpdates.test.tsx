import { render, screen } from "../../../test-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("Update scoops subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);

  // make sure total starts out at $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // Update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  // Remove all text in the input.
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // Update chocolate scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("Update toppings subtotal when toppings change", async () => {
  render(<Options optionType="toppings" />);

  // Topping subtotal should start at $0.00
  const toppingTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingTotal).toHaveTextContent("0.00");

  // Add cherries should update the price to 1.50
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesCheckbox);
  expect(toppingTotal).toHaveTextContent("1.50");

  // Add M&Ms should update the price to 3.00
  const mnmsCheckbox = await screen.findByRole("checkbox", {
    name: "M&Ms",
  });
  userEvent.click(mnmsCheckbox);
  expect(toppingTotal).toHaveTextContent("3.00");

  // Uncheck Cherries should update the price to 1.50
  userEvent.click(cherriesCheckbox);
  expect(toppingTotal).toHaveTextContent("1.50");
});

describe("Grand Total", () => {
  beforeEach(() => {
    render(<OrderEntry />);
  });

  it("should update properly if scoops is added first", async () => {
    const grandTotal = screen.getByText("Grand total: $", { exact: false });

    // Check that the Grand Total starts out at $0.00
    expect(grandTotal).toHaveTextContent("0.00");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    expect(grandTotal).toHaveTextContent("2.00");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: /cherries/i,
    });
    userEvent.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent("3.50");
  });

  it("should update properly if toppings is added first", async () => {
    const grandTotal = screen.getByText("Grand total: $", { exact: false });

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: /cherries/i,
    });
    userEvent.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    expect(grandTotal).toHaveTextContent("3.50");
  });

  it("should update properly if item is removed", async () => {
    const grandTotal = screen.getByText("Grand total: $", { exact: false });

    // Add two scoops
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");

    // Add two toppings
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: /cherries/i,
    });
    userEvent.click(cherriesCheckbox);

    const mnmsCheckbox = await screen.findByRole("checkbox", {
      name: "M&Ms",
    });
    userEvent.click(mnmsCheckbox);

    // Remove a topping and check Grand Total
    userEvent.click(mnmsCheckbox);
    expect(grandTotal).toHaveTextContent("5.50");

    // Remove a scoop a and check Grand Total
    userEvent.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("3.50");

    // Reset a scoop and check Grand Total
    userEvent.clear(vanillaInput);
    expect(grandTotal).toHaveTextContent("1.50");
  });
});
