export interface SubscriptionPostResponse {
    '@odata.context': string;
    id: string;
    resource: string;
    applicationId: string;
    changeType: string;
    notificationUrl: string;
    expirationDateTime: Date;
    creatorId: string;
}
