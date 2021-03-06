import { rest } from "msw";
import { Scoop, Topping } from "../types";

export const handlers = [
  rest.get<{}, Scoop[]>("/scoops", (_req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Chocolate", imagePath: "/images/chocolate.png" },
        { name: "Vanilla", imagePath: "/images/vanilla.png" },
      ])
    );
  }),

  rest.get<{}, Topping[]>("/toppings", (_req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Cherries", imagePath: "/images/cherries.png" },
        { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
        { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
      ])
    );
  }),

  rest.post("/order", (_req, res, ctx) => {
    return res(ctx.text("1234567890"));
  }),
];
