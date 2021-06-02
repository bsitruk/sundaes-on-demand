import { Topping } from "../../types";

type ToppingOptionsProps = Topping;

export const ToppingOptions = ({ name, imagePath }: ToppingOptionsProps) => {
  return (
    <>
      <img src={imagePath} alt={`${name} topping`} />
    </>
  );
};

export default ToppingOptions;
