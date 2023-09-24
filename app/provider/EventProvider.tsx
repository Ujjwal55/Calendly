"use client"
import { EventContext } from "@/context/EventContext";
import { TEvent } from "@/types/EventType";
import { useState } from "react";

type EventProviderProps = {
    children: React.ReactNode;
}

export function EventProvider({children}: EventProviderProps){
    const [events, setEvents] = useState<TEvent[]>([])
    const addEvent = (event: Omit<TEvent, "id">) => {
        setEvents(e => [...e, {...event, id: crypto.randomUUID()}])
    }
    return (
        <EventContext.Provider value={{events, addEvent}}>
            {children}
        </EventContext.Provider>
    )
}