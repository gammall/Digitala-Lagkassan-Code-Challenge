import { createContext, useContext, useReducer } from "react";
import {
  initialState,
  type Ticket,
  type TicketContextType,
  type TicketState,
} from "../models/Ticket";
import React from "react";

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketActionType = {
  FETCH_TICKETS: "FETCH_TICKETS",
  CREATE_TICKET: "CREATE_TICKET",
  UPDATE_TICKET: "UPDATE_TICKET",
} as const;

type TicketAction =
  | { type: typeof TicketActionType.FETCH_TICKETS; payload: Ticket[] }
  | { type: typeof TicketActionType.CREATE_TICKET; payload: Ticket }
  | { type: typeof TicketActionType.UPDATE_TICKET; payload: Ticket };

function ticketReducer(state: TicketState, action: TicketAction): TicketState {
  switch (action.type) {
    case TicketActionType.FETCH_TICKETS:
      return { ...state, tickets: action.payload };

    case TicketActionType.CREATE_TICKET:
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
      };

    case TicketActionType.UPDATE_TICKET:
      return {
        ...state,
        tickets: state.tickets.map((ticket) =>
          ticket.id === action.payload.id ? action.payload : ticket
        ),
      };

    default:
      return state;
  }
}

interface TicketProviderProps {
  children: React.ReactNode;
}
const API_BASE_URL = "https://localhost:7198";

export function TicketProvider({ children }: TicketProviderProps) {
  const [state, dispatch] = useReducer(ticketReducer, initialState);
  const actions = {
    async fetchTickets() {
      const tickets = await fetch(`${API_BASE_URL}/tickets`);
      dispatch({
        type: TicketActionType.FETCH_TICKETS,
        payload: await tickets.json(),
      });
    },
  };
  return (
    <TicketContext.Provider value={{ state, actions }}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTicketContext(): TicketContextType {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTickets must be used within a TicketProvider");
  }
  return context;
}
