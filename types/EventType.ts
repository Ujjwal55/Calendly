export type TEvent = {
    id: string
    name: string
    color: "red" | "green" | "blue"
    date: Date
} & (
    | { allDay: false; startTime: string; endTime: string }
    | { allDay: true; startTime?: never; endTime?: never }
)