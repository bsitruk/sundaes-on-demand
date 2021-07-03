export type Scoop = {
  name: string;
  imagePath: string;
};

export type Topping = {
  name: string;
  imagePath: string;
};

export type Phase = "in-progress" | "review" | "complete";

export type PageProps = {
  next: () => void;
};
