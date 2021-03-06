export class UserPresence {
    id: string;
    name: string;
    availability: 'Available' | 'AvailableIdle' | 'Away' | 'BeRightBack' | 'Busy' | 'BusyIdle' | 'DoNotDisturb' | 'Offline' | 'PresenceUnknown';
    outputAvailability = '';
    activity: 'Available'|'Away'|'BeRightBack'|'Busy'|'DoNotDisturb'|'InACall'|'InAConferenceCall'|'Inactive'|'InAMeeting'|'Offline'|'OffWork'|'OutOfOffice'|'PresenceUnknown'|'Presenting'|'UrgentInterruptionsOnly';
    outputActivity = '';
    subscriptionExpirationDateTime: Date | null = null;
    iconStatus: 'Available' | 'Away' | 'Offline' = 'Offline';

    constructor(data: {
        id: string,
        name: string,
        availability: 'Available' | 'AvailableIdle' | 'Away' | 'BeRightBack' | 'Busy' | 'BusyIdle' | 'DoNotDisturb' | 'Offline' | 'PresenceUnknown',
        activity: 'Available'|'Away'|'BeRightBack'|'Busy'|'DoNotDisturb'|'InACall'|'InAConferenceCall'|'Inactive'|'InAMeeting'|'Offline'|'OffWork'|'OutOfOffice'|'PresenceUnknown'|'Presenting'|'UrgentInterruptionsOnly'
    }) {
        this.id = data.id;
        this.name = data.name;
        this.availability = data.availability;
        this.activity = data.activity;
        this.setAllStatus();
    }

    setAllStatus(): void {
        this.outputAvailability = this.genOutputAvailability();
        this.outputActivity = this.genOutputActivity();
        this.iconStatus = this.setIconStatus();
    }

    private setIconStatus(): 'Available' | 'Away' | 'Offline' {
        switch (this.availability) {
            case 'Available':
                return 'Available';
            case 'Away':
            case 'BeRightBack':
            case 'Busy':
            case 'BusyIdle':
            case 'DoNotDisturb':
                return 'Away';
            case 'Offline':
            case 'PresenceUnknown':
                return 'Offline';
        }
        return 'Offline';
    }

    private genOutputAvailability(): string {
        switch (this.availability) {
            case 'Available':
                return '連絡可能';
            case 'Away':
                return '退席中';
            case 'BeRightBack':
                return 'すぐ戻ってくる';
            case 'Busy':
                return '取り込み中';
            case 'BusyIdle':
                return '取り込み中';
            case 'DoNotDisturb':
                return '応答不可';
            case 'Offline':
                return 'オフライン';
            case 'PresenceUnknown':
                return '不明';
        }
        return '不明';
    }

    private genOutputActivity(): string {
        switch (this.activity) {
            case 'Available':
                return '連絡可能';
            case 'Away':
                return '退席中';
            case 'BeRightBack':
                return 'すぐ戻ってくる';
            case 'Busy':
                return '取り込み中';
            case 'DoNotDisturb':
                return '超取り込み中';
            case 'InACall':
                return '通話中';
            case 'InAConferenceCall':
                return '電話会議中';
            case 'Inactive':
                return 'Off';
            case 'InAMeeting':
                return 'ミーティング中';
            case 'Offline':
                return 'オフライン';
            case 'OffWork':
                return '仕事してない';
            case 'OutOfOffice':
                return '職場にいない';
            case 'PresenceUnknown':
                return '不明';
            case 'Presenting':
                return '発表中';
            case 'UrgentInterruptionsOnly':
                return '緊急の中断のみ';
        }
        return '不明';
    }
}
