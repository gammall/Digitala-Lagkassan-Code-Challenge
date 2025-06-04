export const ColorPalette = {
  // Ticket status färger
  ticketStatus: {
    open: {
      primary: "#4CAF50", // Grön
      light: "#E8F5E8", // Ljus grön bakgrund
      dark: "#2E7D32", // Mörk grön
    },
    inProgress: {
      primary: "#FFC107", // Gul
      light: "#FFF8E1", // Ljus gul bakgrund
      dark: "#F57C00", // Mörk gul/orange
    },
    closed: {
      primary: "#F44336", // Röd
      light: "#FFEBEE", // Ljus röd bakgrund
      dark: "#C62828", // Mörk röd
    },
  },

  // Andra färger för framtida användning
  primary: "#1976D2",
  secondary: "#DC004E",
  background: "#F5F5F5",
  text: {
    primary: "#212121",
    secondary: "#757575",
  },
};

// Helper funktion för att få färger baserat på ticket status
export const getTicketStatusColors = (
  status: "Open" | "In Progress" | "Closed"
) => {
  switch (status) {
    case "Open":
      return ColorPalette.ticketStatus.open;
    case "In Progress":
      return ColorPalette.ticketStatus.inProgress;
    case "Closed":
      return ColorPalette.ticketStatus.closed;
    default:
      return ColorPalette.ticketStatus.open;
  }
};
