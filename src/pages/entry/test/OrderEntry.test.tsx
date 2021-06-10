import { render, screen, waitFor } from "@testing-library/react";
import { server } from "../../../mocks/server";
import { rest } from "msw";
import OrderEntry from "../OrderEntry";
import { OrderProvider } from "../../../contexts/OrderContext";

test("Failing to fetch scoops should display an error alert", async () => {
  // Override /scoops and /toppings route to fail
  const errorMessage = "An unexpected error occurred. Please try again later.";

  server.use(
    rest.get("/scoops", (_req, res, ctx) => {
      return res(
        ctx.status(404),
        ctx.json({
          message: errorMessage,
        })
      );
    }),
    rest.get("/toppings", (_req, res, ctx) => {
      return res(
        ctx.status(404),
        ctx.json({
          message: errorMessage,
        })
      );
    })
  );

  render(<OrderEntry />, { wrapper: OrderProvider });

  // Wait until the two expected Alert component are displayed
  await waitFor(() => expect(screen.getAllByRole("alert")).toHaveLength(2));
});
