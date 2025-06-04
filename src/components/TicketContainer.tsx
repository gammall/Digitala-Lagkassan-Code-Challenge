import { Box, Typography } from "@mui/material";
import TicketAccordion from "./TicketAccordion";

function TicketContainer() {
  return (
    <>
      <Box
        sx={{
          width: { xs: "95%", md: "60%" },
          height: { xs: "90%", md: "70%" },
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: 50 }}>Tickets</Typography>
        <TicketAccordion />
      </Box>
    </>
  );
}
export default TicketContainer;
