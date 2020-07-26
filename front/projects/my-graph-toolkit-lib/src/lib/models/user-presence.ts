export class UserPresence {
    id: string;
    name: string;
    availability: string;
    outputAvailability: string;
    activity: string;
    outputActivity: string;
    subscriptionExpirationDateTime: Date | null = null;

    constructor(data: { id: string, name: string, availability: string, activity: string}) {
        this.id = data.id;
        this.name = data.name;
        this.availability = data.availability;
        this.activity = data.activity;
        this.outputAvailability = this.genOutputAvailability();
        this.outputActivity = this.genOutputActivity();
    }

    private genOutputAvailability(): string {
        switch (this.availability.toLowerCase()) {
            case 'availableidle':
                return '連絡可能';
            case 'away':
                return '退席中';
            case 'berightback':
                return 'すぐ戻ってくる';
            case 'busy':
                return '取り込み中';
            case 'busyidle':
                return '取り込み中';
            case 'donotdisturb':
                return '応答不可';
            case 'offline':
                return 'オフライン';
            case 'presenceunknown':
                return '不明';
        }
        return '不明';
    }

    private genOutputActivity(): string {
        switch (this.activity.toLowerCase()) {
            case 'available':
                return '連絡可能';
            case 'away':
                return '退席中';
            case 'berightback':
                return 'すぐ戻ってくる';
            case 'busy':
                return '取り込み中';
            case 'donotdisturb':
                return '超取り込み中';
            case 'inacall':
                return '通話中';
            case 'inaconferencecall':
                return '電話会議中';
            case 'inactive':
                return 'Off';
            case 'inameeting':
                return 'ミーティング中';
            case 'offline':
                return 'オフライン';
            case 'offwork':
                return '仕事してない';
            case 'outofoffice':
                return '職場にいない';
            case 'presenceunknown':
                return '不明';
            case 'presenting':
                return '発表中';
            case 'urgentinterruptionsonly':
                return '緊急の中断のみ';
        }
        return '不明';
    }
}
