export interface Presence {
    value: PresenceBody[];
}
export interface PresenceBody {
    id: string;
    availability: string;
    activity: string;
}
