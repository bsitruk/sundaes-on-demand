import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { PageProps } from "src/types";

export const OrderConfirmation = ({ next }: PageProps) => {
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  useEffect(() => {
    axios.post<string>("/order", {}).then((response) => {
      setOrderNumber(response.data);
    });
  }, []);

  if (!orderNumber) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Thank you!</h1>
      <p>Your order number is {orderNumber}</p>
      <p>as per our terms and conditions, nothing will happen now</p>
      <Button variant="primary" onClick={next}>
        Create new order
      </Button>
    </div>
  );
};

export default OrderConfirmation;
