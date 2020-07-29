import { Injectable } from '@angular/core';
import { MsalService } from '../msal/msal.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserPresence } from '../models/user-presence';
import { User } from '../models/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { Presence } from '../models/presence';
import { SubscriptionBody } from '../models/subscription';
import { SignalRResponse } from '../singal-r/signal-r-response';

@Injectable()
export class PresenceListService {

    private _userPresence: BehaviorSubject<UserPresence[]> = new BehaviorSubject<UserPresence[]>([]);
    get userPresence$(): Observable<UserPresence[]> {
        return this._userPresence.asObservable();
    }
    private readonly grpahEndPoint = 'https://graph.microsoft.com/beta/';
    private subscriptionData: SubscriptionBody[] = [];

    constructor(
        private msalService: MsalService,
        private httpClient: HttpClient
    ) {}

    async getUserPresence(): Promise<void> {
        if (this.msalService.isCompleteSettingState) {
            this.getUserPresence$();
            return;
        }
        this.msalService.isCompleteSettingState$.subscribe(x => {
            if (x) {
                this.getUserPresence$();
            }
        });
    }

    private async getUserPresence$(): Promise<void> {
        const token = await this.msalService.aquireToken();
        this.getUser$(token).pipe(
            mergeMap(val => {
                return this.getPresence$(token, val);
            })
        ).subscribe(s => {
            this._userPresence.next(s);
            this.mergePresenceAndSubscription();
        });
    }

    private getPresence$(token: string, users: User): Observable<UserPresence[]> {
        const header = new HttpHeaders().append('Authorization', `Bearer ${token}`);
        const body = { ids: users.value.map(m => m.id) };
        return this.httpClient.post<Presence>(`${this.grpahEndPoint}/communications/getPresencesByUserId`, body, { headers: header })
            .pipe(
                map(m => {
                    const r = m.value.map(pr => {
                        const user = users.value.filter(f => f.id === pr.id)[0];
                        const retData: UserPresence = new UserPresence({
                            id: pr.id,
                            activity: pr.activity,
                            availability: pr.availability,
                            name: user.displayName
                        });
                        return retData;
                    });
                    return r;
                })
            );
    }

    private getUser$(token: string): Observable<User> {
        const header = new HttpHeaders().append('Authorization', `Bearer ${token}`);
        return this.httpClient.get<User>(`${this.grpahEndPoint}users?$select=id,displayName`, { headers: header });
    }

    setSubscriptionSettings(datas: SubscriptionBody[]): void {
        this.subscriptionData = datas;
        this.mergePresenceAndSubscription();
    }

    private mergePresenceAndSubscription(): void {
        const nowData = this._userPresence.value;
        if (nowData !== null) {
            nowData.forEach(data => {
                const d = this.subscriptionData.some(s => s.useiId === data.id);
                if (d) {
                    const sd = this.subscriptionData.filter(s => s.useiId === data.id);
                    data.subscriptionExpirationDateTime = sd[0].expirationDateTime;
                }
            });
            this._userPresence.next(nowData);
        }
    }

    adjustSignalRResponse(datas: SignalRResponse[]): void {
        const nowV = this._userPresence.value;
        nowV.forEach(f => {
            const userData = datas.filter(fi => fi.userId === f.id);
            if (userData.length > 0) {
                f.activity = userData[0].activity;
                f.availability = userData[0].availability;
                f.genOutputActivity();
                f.genOutputAvailability();
            }
        });
        this._userPresence.next(nowV);
    }
}
