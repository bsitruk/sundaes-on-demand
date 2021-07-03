import Container from "react-bootstrap/Container";
import AppRouter from "./AppRouter";
import { OrderProvider } from "./contexts/OrderContext";

function App() {
  return (
    <Container>
      <OrderProvider>
        <AppRouter />
      </OrderProvider>
    </Container>
  );
}

export default App;
