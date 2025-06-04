import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { useTicketContext } from "../contexts/TicketContext";
import { getTicketStatusColors } from "../assets/colors/ColorPalette";
import { useEffect, useState } from "react";
import TicketDialog from "./TicketDialog";

function TicketAccordion() {
  const { state: TicketState, actions: TicketAction } = useTicketContext();
  const { tickets } = TicketState;
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    TicketAction.fetchTickets();
  }, []);

  const filteredTickets = tickets.filter((ticket) => {
    if (statusFilter === "All") return true;
    return ticket.status === statusFilter;
  });

  const handleFilterChange = (event: any) => {
    setStatusFilter(event.target.value);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveTicket = (ticketData: any) => {
    // Här kan du lägga till logik för att spara ticket
    console.log("Spara ticket:", ticketData);
  };

  return (
    <Box sx={{ width: "70%", height: "90%" }}>
      {/* Header med filter och ny ticket knapp */}
      <Box
        sx={{
          mb: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Filtrera på status</InputLabel>
            <Select
              value={statusFilter}
              label="Filtrera på status"
              onChange={handleFilterChange}
            >
              <MenuItem value="All">Alla</MenuItem>
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </Select>
          </FormControl>

          {/* Visa antal tickets */}
          <Chip
            label={`${filteredTickets.length} av ${tickets.length} tickets`}
            variant="outlined"
          />
        </Box>

        {/* Ny ticket knapp */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Ny Ticket
        </Button>
      </Box>

      {/* Tickets accordion */}
      {filteredTickets.map((ticket) => {
        const statusColors = getTicketStatusColors(ticket.status);
        return (
          <Accordion
            key={ticket.id}
            sx={{
              borderLeft: `4px solid ${statusColors.primary}`,
              backgroundColor: statusColors.light,
              marginBottom: 1,
              "&:hover": {
                backgroundColor: statusColors.light,
                boxShadow: `0 2px 8px ${statusColors.primary}40`,
              },
              "&.Mui-expanded": {
                backgroundColor: statusColors.light,
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${ticket.id}-content`}
              id={`panel${ticket.id}-header`}
            >
              <Typography
                sx={{ fontSize: 20, fontWeight: "bold" }}
                component="span"
              >
                {ticket.title}
              </Typography>
            </AccordionSummary>{" "}
            <AccordionDetails>{ticket.description}</AccordionDetails>
          </Accordion>
        );
      })}

      {/* Ticket Dialog */}
      <TicketDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveTicket}
      />
    </Box>
  );
}

export default TicketAccordion;
