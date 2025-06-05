import { Box, Typography } from "@mui/material";
import TicketCard from "./TicketCard";

function TicketContainer() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography sx={{ fontSize: 50 }}>Tickets</Typography>
      <TicketCard />
    </Box>
  );
}
export default TicketContainer;
