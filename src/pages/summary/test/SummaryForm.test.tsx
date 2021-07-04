import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

beforeEach(() => {
  render(<SummaryForm onConfirm={jest.fn()} />);
});

test("the checkbox is unchecked by default, and the button is disabled", () => {
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const button = screen.getByRole("button", { name: /confirm/i });
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test("the checkbox toggle the button", () => {
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");

  userEvent.click(checkbox);
  expect(button).toBeEnabled();

  userEvent.click(checkbox);
  expect(button).toBeDisabled();
});

test("popover responds to hover", async () => {
  // popover starts out hidden
  expect(
    screen.queryByText(/no ice cream will actually be delivered/i)
  ).not.toBeInTheDocument();

  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/Terms and Conditions/i);
  userEvent.hover(termsAndConditions);

  expect(
    screen.getByText(/no ice cream will actually be delivered/i)
  ).toBeInTheDocument();

  // popover disappears when we mouse out
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
