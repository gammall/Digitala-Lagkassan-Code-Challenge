export interface TicketState {
  tickets: Ticket[];
}

export const initialState: TicketState = {
  tickets: [],
};

export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Closed";
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketContextType {
  state: TicketState;
  actions: {
    fetchTickets: () => Promise<void>;
  };
}
