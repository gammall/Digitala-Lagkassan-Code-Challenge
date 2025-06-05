import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useState } from "react";

interface TicketDialogProps {
  open: boolean;
  onClose: () => void;
  onSave?: (ticketData: any) => void;
}

function TicketDialog({ open, onClose, onSave }: TicketDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (onSave) {
      onSave({
        title,
        description,
        status: "Open",
      });
    }
    setTitle("");
    setDescription("");
    onClose();
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    onClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Skapa ny ticket</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Titel"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Beskrivning"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Avbryt
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Skapa Ticket
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TicketDialog;
