import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const popover = (
  <Popover id="termsandconditions-popover">
    <Popover.Content>No ice cream will actually be delivered</Popover.Content>
  </Popover>
);

const checkboxLabel = (
  <span>
    I agree to{" "}
    <OverlayTrigger overlay={popover} placement="right">
      <span style={{ color: "blue" }}>Terms and Conditions</span>
    </OverlayTrigger>
  </span>
);

export default function SummaryForm() {
  const [tcChecked, setTcChecked] = useState(false);

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={(e) => setTcChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!tcChecked}>
        Confirm order
      </Button>
    </Form>
  );
}
