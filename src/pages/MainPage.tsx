import { Box, Typography } from "@mui/material";
import TicketCard from "../components/TicketCard";
import { ColorPalette } from "../assets/colors/ColorPalette";

function MainPage() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "lightgray",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: 40, sm: 50, md: 60, lg: 70, xl: 80 },
          fontWeight: 800,
          letterSpacing: -4,
          fontStyle: "italic",
          textTransform: "uppercase",
          color: ColorPalette.primary,
          fontFamily: "Arial, sans-serif",
        }}
      >
        Ticket Maker
      </Typography>
      <TicketCard />
    </Box>
  );
}

export default MainPage;
