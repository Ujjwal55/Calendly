import { TEvent } from "@/types/EventType";
import { createContext } from "react";

type TEventsContext = {
    events: TEvent[];
    addEvent: (eventDetails: Omit<TEvent, "id">) => void;
    updateEvent: (id: string, eventDetails: Omit<Event, "id">) => void;
    deleteEvent: (id: string) => void;
}

export const EventContext = createContext<any>(null);