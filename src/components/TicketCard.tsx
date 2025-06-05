import {
  Box,
  Typography,
  Chip,
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useTicketContext } from "../contexts/TicketContext";
import { getTicketStatusColors } from "../assets/colors/ColorPalette";
import { useEffect, useState } from "react";
import TicketDialog from "./TicketDialog";

function TicketCard() {
  const { state: TicketState, actions: TicketAction } = useTicketContext();
  const { tickets } = TicketState;
  const [statusFilter, setStatusFilter] = useState<string>("Open");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState<
    "Open" | "In Progress" | "Closed"
  >("Open");

  useEffect(() => {
    TicketAction.fetchTickets();
  }, []);
  const filteredTickets = tickets
    .filter((ticket) => {
      if (statusFilter === "All") return true;
      return ticket.status === statusFilter;
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const handleFilterChange = (status: string) => {
    setStatusFilter(status);
    setSelectedTicket(null);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const handleSaveTicket = async (ticketData: any) => {
    try {
      await TicketAction.createTicket(
        ticketData.title,
        ticketData.description,
        ticketData.status
      );
      console.log("Ticket skapad:", ticketData);
    } catch (error) {
      console.error("Fel vid skapande av ticket:", error);
    }
  };
  const handleTicketClick = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsEditing(false);
    setEditDescription(ticket.description);
    setEditStatus(ticket.status);
  };

  const handleEditStart = () => {
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditDescription(selectedTicket.description);
    setEditStatus(selectedTicket.status);
  };

  const handleEditSave = async () => {
    try {
      await TicketAction.updateTicket({
        ...selectedTicket,
        description: editDescription,
        status: editStatus,
      });
      setSelectedTicket({
        ...selectedTicket,
        description: editDescription,
        status: editStatus,
      });
      setIsEditing(false);
      console.log("Ticket uppdaterad");
    } catch (error) {
      console.error("Fel vid uppdatering av ticket:", error);
    }
  };
  return (
    <Box
      sx={{
        width: "80%",
        height: "70%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "end",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
          width: "100%",
          height: "10%",
        }}
      >
        <Box>
          <ButtonGroup variant="outlined" size="medium" sx={{ ml: 2 }}>
            <Button
              variant={statusFilter === "All" ? "contained" : "outlined"}
              onClick={() => handleFilterChange("All")}
            >
              Alla
            </Button>
            <Button
              variant={statusFilter === "Open" ? "contained" : "outlined"}
              onClick={() => handleFilterChange("Open")}
            >
              Open
            </Button>
            <Button
              variant={
                statusFilter === "In Progress" ? "contained" : "outlined"
              }
              onClick={() => handleFilterChange("In Progress")}
            >
              In Progress
            </Button>
            <Button
              variant={statusFilter === "Closed" ? "contained" : "outlined"}
              onClick={() => handleFilterChange("Closed")}
            >
              Closed
            </Button>
          </ButtonGroup>
        </Box>
        <Button variant="contained" onClick={handleOpenDialog} sx={{ mr: 2 }}>
          Ny Ticket
        </Button>
      </Box>

      <Box sx={{ display: "flex", width: "100%", height: "80%" }}>
        <List
          sx={{
            overflow: "auto",
            width: "30%",
          }}
        >
          {filteredTickets.map((ticket) => {
            const statusColors = getTicketStatusColors(ticket.status);
            const isSelected = selectedTicket?.id === ticket.id;

            return (
              <ListItem key={ticket.id} disablePadding>
                <ListItemButton
                  selected={isSelected}
                  onClick={() => handleTicketClick(ticket)}
                  sx={{
                    backgroundColor: isSelected
                      ? statusColors.primary
                      : statusColors.light,
                    color: "black",
                    "&:hover": {
                      backgroundColor: "white",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "white",
                      "&:hover": {
                        backgroundColor: "white",
                      },
                    },
                    minHeight: "60px",
                    mb: 0.5,
                    mx: 0.5,
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {ticket.title}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Box
          sx={{
            width: "70%",
            p: 3,
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          {" "}
          {selectedTicket ? (
            <>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
                {selectedTicket.title}
              </Typography>

              <Box
                sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}
              >
                {isEditing ? (
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={editStatus}
                      label="Status"
                      onChange={(e) =>
                        setEditStatus(
                          e.target.value as "Open" | "In Progress" | "Closed"
                        )
                      }
                    >
                      <MenuItem value="Open">Open</MenuItem>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Closed">Closed</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <Chip
                    label={selectedTicket.status}
                    sx={{
                      backgroundColor: getTicketStatusColors(
                        selectedTicket.status
                      ).primary,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                )}

                {!isEditing ? (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleEditStart}
                  >
                    Redigera
                  </Button>
                ) : (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleEditSave}
                    >
                      Spara
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleEditCancel}
                    >
                      Avbryt
                    </Button>
                  </Box>
                )}
              </Box>

              <Typography variant="h6" sx={{ mb: 1 }}>
                Beskrivning:
              </Typography>

              {isEditing ? (
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  sx={{ mb: 3 }}
                />
              ) : (
                <Typography variant="body1" sx={{ mb: 3 }}>
                  {selectedTicket.description}
                </Typography>
              )}
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "text.secondary",
              }}
            >
              <Typography variant="h6">
                Välj en ticket för att se detaljerna
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <TicketDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveTicket}
      />
    </Box>
  );
}

export default TicketCard;
