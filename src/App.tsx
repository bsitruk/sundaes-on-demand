import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderProvider } from "./contexts/OrderContext";

function App() {
  return (
    <Container>
      <OrderProvider>
        <OrderEntry />
      </OrderProvider>
    </Container>
  );
}

export default App;
