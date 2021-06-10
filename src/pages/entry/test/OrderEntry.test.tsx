import { render, screen, waitFor } from "../../../test-utils";
import { server } from "../../../mocks/server";
import { rest } from "msw";
import OrderEntry from "../OrderEntry";

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

  render(<OrderEntry />);

  // Wait until the two expected Alert component are displayed
  await waitFor(() => expect(screen.getAllByRole("alert")).toHaveLength(2));
});
