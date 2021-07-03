import { useState } from "react";
import { useOrderCtx } from "./contexts/OrderContext";
import OrderConfirmation from "./pages/confirm/OrderConfirmation";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import { Phase } from "./types";

function AppRouter() {
  const [orderPhase, setOrderPhase] = useState<Phase>("in-progress");
  const { reset } = useOrderCtx();

  if (orderPhase === "in-progress") {
    return <OrderEntry next={() => setOrderPhase("review")} />;
  }

  if (orderPhase === "review") {
    return <OrderSummary next={() => setOrderPhase("complete")} />;
  }

  return (
    <OrderConfirmation
      next={() => {
        reset();
        setOrderPhase("in-progress");
      }}
    />
  );
}

export default AppRouter;
