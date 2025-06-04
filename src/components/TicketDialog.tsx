import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";

interface TicketDialogProps {
  open: boolean;
  onClose: () => void;
  onSave?: (ticketData: any) => void;
}

function TicketDialog({ open, onClose, onSave }: TicketDialogProps) {
  const handleSave = () => {
    if (onSave) {
      onSave({
        title: "Ny ticket",
        description: "Beskrivning",
        status: "Open",
      });
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Skapa ny ticket</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Titel" fullWidth variant="outlined" />
          <TextField
            label="Beskrivning"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select label="Status" defaultValue="Open">
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Avbryt
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Spara
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TicketDialog;
