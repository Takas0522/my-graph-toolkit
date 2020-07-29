export interface Presence {
    value: PresenceBody[];
}
export interface PresenceBody {
    id: string;
    availability: 'Available' | 'AvailableIdle' | 'Away' | 'BeRightBack' | 'Busy' | 'BusyIdle' | 'DoNotDisturb' | 'Offline' | 'PresenceUnknown';
    activity: 'Available'|'Away'|'BeRightBack'|'Busy'|'DoNotDisturb'|'InACall'|'InAConferenceCall'|'Inactive'|'InAMeeting'|'Offline'|'OffWork'|'OutOfOffice'|'PresenceUnknown'|'Presenting'|'UrgentInterruptionsOnly';
}
