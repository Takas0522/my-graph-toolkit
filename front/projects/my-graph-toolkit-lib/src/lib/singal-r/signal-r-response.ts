export interface SignalRResponse {
    userId: string;
    activity: 'Available'|'Away'|'BeRightBack'|'Busy'|'DoNotDisturb'|'InACall'|'InAConferenceCall'|'Inactive'|'InAMeeting'|'Offline'|'OffWork'|'OutOfOffice'|'PresenceUnknown'|'Presenting'|'UrgentInterruptionsOnly';
    availability: 'Available' | 'AvailableIdle' | 'Away' | 'BeRightBack' | 'Busy' | 'BusyIdle' | 'DoNotDisturb' | 'Offline' | 'PresenceUnknown';
}
