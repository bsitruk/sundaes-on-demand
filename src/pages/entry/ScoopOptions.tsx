import { Scoop } from "../../types";
import Form from "react-bootstrap/Form";

type ScoopOptionsProps = Scoop & {
  count: number;
  updateCount: (newCount: string) => void;
};

export const ScoopOptions = ({
  name,
  imagePath,
  updateCount,
  count,
}: ScoopOptionsProps) => {
  return (
    <>
      <img src={imagePath} alt={`${name} scoop`} />
      <Form.Group controlId={`${name}-count`}>
        <Form.Label>{name}</Form.Label>
        <Form.Control
          type="number"
          defaultValue={count}
          onChange={(e) => updateCount(e.target.value)}
        />
      </Form.Group>
    </>
  );
};

export default ScoopOptions;
