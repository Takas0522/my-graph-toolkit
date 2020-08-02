import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MsalService } from '../msal/msal.service';
import { Subscription, SubscriptionBody } from '../models/subscription';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SubscriptionPostResponse } from './subscription-post-response';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SubscriptionService {

  private _subscriptionData: BehaviorSubject<SubscriptionBody[]> = new BehaviorSubject<SubscriptionBody[]>([]);
  get subscriptionData$(): Observable<SubscriptionBody[]> {
    return this._subscriptionData.asObservable();
  }
  private _post!: Subject<void>;
  get post(): Observable<void> {
    return this._post.asObservable();
  }

  private readonly subscriptionEndPoint = 'https://graph.microsoft.com/beta/subscriptions';

  constructor(
    private msalService: MsalService,
    private http: HttpClient,
    private snackBar: MatSnackBar
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
        const d =  this.adjustSubscription(m);
        return d;
      })
    ).subscribe(x => {
      this._subscriptionData.next(x);
    });
  }

  private getTargetUserId(data: SubscriptionBody): string[] {
    const resources = data.resource.split('/');
    if (resources.length > 1) {
      let userFilter = resources[2];
      userFilter = userFilter.replace('presences?$filter=id in (', '').replace(')', '');
      const users = userFilter.split(',');
      return users.map(m => m.replace(`'`, '').replace(`'`, ''));
    }
    return [];
  }

  private adjustSubscription(data: Subscription): SubscriptionBody[] {
    if (data.value.length < 1) {
      return [];
    }
    const res: SubscriptionBody[] = [];
    data.value.forEach(vm => {
      const d = this.genSubscriptionBody(vm);
      d.forEach(item => res.push(item));
    });
    console.log({adjustSubscription: res})
    return res;
  }

  private genSubscriptionBody(vm: SubscriptionBody): SubscriptionBody[] {
    const users = this.getTargetUserId(vm);
    return users.map(m => {
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
        useiId: m
      };
    });
  }

  makePostSubscription(): void {
    this._post = new Subject<void>();
  }

  private async deleteSubscription(): Promise<void> {
    const data = this._subscriptionData.value;
    console.log({deleteSubscription: data})
    const token = await this.msalService.aquireToken();
    const header = new HttpHeaders().append('Authorization', `Bearer ${token}`);
    if (data !== []) {
      for (const item of data) {
        await this.http.delete(`${this.subscriptionEndPoint}/${item.id}`, { headers: header }).toPromise();
      }
    }
  }

  private genFilterUserIds(userId: string): string {
    const nowSubscrpitionIds = this._subscriptionData.value.map(m => m.useiId);
    if (nowSubscrpitionIds.includes(userId)) {
      return nowSubscrpitionIds.map(m => `'${m}'`).join(',');
    }
    if(nowSubscrpitionIds.length > 0) {
      return nowSubscrpitionIds.map(m => `'${m}'`).join(',') + `,'${userId}'`;
    }
    return `'${userId}'`;
  }

  async setSubscriotion(userId: string): Promise<void> {
    await this.deleteSubscription();

    const expDate = new Date();
    expDate.setHours(new Date().getHours() + 71);
    const genUserIds = this.genFilterUserIds(userId);
    const token = await this.msalService.aquireToken();
    const header = new HttpHeaders().append('Authorization', `Bearer ${token}`);
    const sendBody = {
      changeType: 'updated',
      notificationUrl: 'https://okawa-sample-subscription.azurewebsites.net/api/SubscriptionEndPoint?code=5OVO4Sd6AirOg21Kh1R2j3NlXkZAm9AFCHbU5knKuNjHSZGk7UrXDw==',
      resource: `/communications/presences?$filter=id in (${genUserIds})`,
      expirationDateTime: expDate.toJSON()
    };
    this.http.post<SubscriptionPostResponse>(this.subscriptionEndPoint, sendBody, { headers: header }).pipe(
      map((m: SubscriptionPostResponse) => {
        const vm: SubscriptionBody = {
          applicationId: m.applicationId,
          changeType: m.changeType,
          clientState: '',
          creatorId: m.creatorId,
          expirationDateTime: m.expirationDateTime,
          id: m.id,
          notificationUrl: m.notificationUrl,
          latestSupportedTlsVersion: '',
          resource: m.resource,
          useiId: ''
        };
        return this.genSubscriptionBody(vm);
      })
    ).subscribe(
      res => {
        console.log(res);
        const nowv = this._subscriptionData.value;
        const newData = nowv.concat(res);
        this._subscriptionData.next(newData);
        this._post.next();
        this._post.complete();
        this.snackBar.open('監視を開始しました', '閉じる', { duration: 5000 });
      },
      err => {
        this._post.next();
        this._post.complete();
        this.snackBar.open('失敗しました', '閉じる', { duration: 5000 });
      }
    );
  }
}
