import { Box } from "@mui/material";
import TicketContainer from "../components/TicketContainer";

function MainPage() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "gray",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TicketContainer />
    </Box>
  );
}

export default MainPage;
