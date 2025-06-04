import "./App.css";
import { TicketProvider } from "./contexts/TicketContext";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <>
      <TicketProvider>
        <MainPage />
      </TicketProvider>
    </>
  );
}

export default App;
