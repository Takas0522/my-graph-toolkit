export interface Subscription {
    value: SubscriptionBody[];
}

export interface SubscriptionBody {
    id: string;
    resource: string;
    applicationId: string;
    changeType: string;
    clientState: string | null;
    notificationUrl: string;
    expirationDateTime: Date;
    creatorId: string;
    latestSupportedTlsVersion: string;
    useiId: string;
}

