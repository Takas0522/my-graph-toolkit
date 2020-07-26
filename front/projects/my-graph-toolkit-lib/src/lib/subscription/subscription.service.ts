import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MsalService } from '../msal/msal.service';
import { Subscription, SubscriptionBody } from '../models/subscription';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SubscriptionService {

  private _subscriptionData: BehaviorSubject<SubscriptionBody[]> = new BehaviorSubject<SubscriptionBody[]>([]);
  get subscriptionData$(): Observable<SubscriptionBody[]> {
    return this._subscriptionData.asObservable();
  }
  private readonly subscriptionEndPoint = 'https://graph.microsoft.com/beta/subscriptions';

  constructor(
    private msalService: MsalService,
    private http: HttpClient
  ) { }

  async getSubscription(): Promise<void> {
    if (this.msalService.isCompleteSettingState) {
      this.getSubscriptionInner();
      return;
    }
    this.msalService.isCompleteSettingState$.subscribe(x => {
      if (x) {
          this.getSubscriptionInner();
      }
    });
  }

  private async getSubscriptionInner(): Promise<void> {
    const token = await this.msalService.aquireToken();
    const header = new HttpHeaders().append('Authorization', `Bearer ${token}`);
    this.http.get<Subscription>(this.subscriptionEndPoint, { headers: header }).pipe(
      map((m: Subscription) => {
        return this.adjustSubscription(m);
      })
    ).subscribe(x => {
      this._subscriptionData.next(x);
    });
  }

  private adjustSubscription(data: Subscription): SubscriptionBody[] {
    if (data.value.length < 1) {
      return [];
    }
    const res: SubscriptionBody[] = data.value.map(vm => {
      const resourceSplit = vm.resource.split('/');
      let userId = '';
      if (resourceSplit.length > 2) {
        userId = resourceSplit[2];
      }
      return {
        applicationId: vm.applicationId,
        changeType: vm.changeType,
        clientState: vm.clientState,
        creatorId: vm.creatorId,
        expirationDateTime: new Date(vm.expirationDateTime),
        id: vm.id,
        latestSupportedTlsVersion: vm.latestSupportedTlsVersion,
        notificationUrl: vm.notificationUrl,
        resource: vm.resource,
        useiId: userId
      };
    });
    return res;
  }

  async setSubscriotion(userId: string): Promise<void> {
    const expDate = new Date();
    expDate.setHours(new Date().getHours() + 10);
    const token = await this.msalService.aquireToken();
    const header = new HttpHeaders().append('Authorization', `Bearer ${token}`);
    const sendBody = {
      changeType: 'updated',
      notificationUrl: 'https://okawa-sample-subscription.azurewebsites.net/api/SubscriptionEndPoint?code=5OVO4Sd6AirOg21Kh1R2j3NlXkZAm9AFCHbU5knKuNjHSZGk7UrXDw==',
      resource: `communications/presences/${userId}`,
      expirationDateTime: expDate.toJSON()
    };
    this.http.post<Subscription>(this.subscriptionEndPoint, sendBody, { headers: header }).pipe(
      map((m: Subscription) => {
        return this.adjustSubscription(m);
      })
    ).subscribe(res => {
      const nowv = this._subscriptionData.value;
      nowv.concat(res);
      this._subscriptionData.next(nowv);
    });
  }
}
