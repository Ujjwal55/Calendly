"use client"
import { EventContext } from "@/context/EventContext";
import { TEvent } from "@/types/EventType";
import { useState } from "react";

type EventProviderProps = {
    children: React.ReactNode;
}

export function EventProvider({children}: EventProviderProps){
    const [events, setEvents] = useState<TEvent[]>([])
    const addEvent = (eventDetails: TEvent) => {
        setEvents(e => [...e, {...eventDetails, id: crypto.randomUUID()}])
    }
    const updateEvent = (id: string, eventDetails: Omit<Event, "id">) => {
        setEvents(e => e.map(event => event.id === id ? {...event, ...eventDetails} : event))
    }
    const deleteEvent = (id: string) => {
        setEvents(e => e.filter(event => event.id !== id))
    }
    return (
        <EventContext.Provider value={{events,updateEvent, addEvent, deleteEvent}}>
            {children}
        </EventContext.Provider>
    )
}