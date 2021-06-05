import { Scoop } from "../../types";

type ScoopOptionsProps = Scoop & {
  count: number;
  updateCount: (newCount: string) => void;
};

export const ScoopOptions = ({ name, imagePath }: ScoopOptionsProps) => {
  return (
    <>
      <img src={imagePath} alt={`${name} scoop`} />
    </>
  );
};

export default ScoopOptions;
