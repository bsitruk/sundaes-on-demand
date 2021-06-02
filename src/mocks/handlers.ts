import { rest } from "msw";

type ScoopsResponse = {
  name: string;
  imagePath: string;
};

export const handlers = [
  rest.get<{}, ScoopsResponse[]>("/scoops", (_req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Chocolate", imagePath: "/images/chocolate.png" },
        { name: "Vanilla", imagePath: "/images/vanilla.png" },
      ])
    );
  }),
];
