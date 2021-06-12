import Form from "react-bootstrap/Form";
import { Topping } from "../../types";

type ToppingOptionsProps = Topping & {
  updateCount: (newCount: string) => void;
};

export const ToppingOptions = ({
  name,
  imagePath,
  updateCount,
}: ToppingOptionsProps) => {
  return (
    <>
      <img src={imagePath} alt={`${name} topping`} />
      <Form.Group controlId={`${name}-checkbox`}>
        <Form.Check
          type="checkbox"
          label={<span>{name}</span>}
          onChange={(e) => updateCount(e.target.checked ? "1" : "0")}
        />
      </Form.Group>
    </>
  );
};

export default ToppingOptions;
