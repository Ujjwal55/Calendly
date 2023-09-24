import { TEvent } from "@/types/EventType";
import { createContext } from "react";

type TEventsContext = {
    events: TEvent[];
    addEvent: (event: Omit<TEvent, "id">) => void;
}

export const EventContext = createContext<TEventsContext | null>(null)