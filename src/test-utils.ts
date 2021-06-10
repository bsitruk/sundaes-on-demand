import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { OrderProvider } from "./contexts/OrderContext";

const renderWithContext = (ui: ReactElement) =>
  render(ui, { wrapper: OrderProvider });

export * from "@testing-library/react";

export { renderWithContext as render };
