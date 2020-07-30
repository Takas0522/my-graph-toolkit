import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignalRConnectionInfo } from './singal-r-conncection-info';
import { HubConnection, LogLevel, HubConnectionBuilder } from '@aspnet/signalr';
import { SignalRResponse } from './signal-r-response';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection: HubConnection | undefined;
  private readonly url = 'https://okawa-sample-subscription.azurewebsites.net/api/SubscriptionEndPoint?code=5OVO4Sd6AirOg21Kh1R2j3NlXkZAm9AFCHbU5knKuNjHSZGk7UrXDw==';
  private readonly negoUrl = 'https://okawa-sample-subscription.azurewebsites.net/api/Negotiate?code=KALBdHhpxaRlSLSOVazFAlAFS56WuiVLUw1iqP1y/1/Vc8/hMdwWUA==';

  private _signalRResponse: Subject<SignalRResponse[]> = new Subject<SignalRResponse[]>();
  get signalRResponse$(): Observable<SignalRResponse[]> {
    return this._signalRResponse.asObservable();
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  setSignalRHub(): void {
    this.httpClient.get<SignalRConnectionInfo>(this.negoUrl).subscribe((info: SignalRConnectionInfo) => {
      this.hubConncetionSettings(info);
    });
  }

  private hubConncetionSettings(info: SignalRConnectionInfo): void {
    const options = {
      accessTokenFactory: () => info.accessToken
    };

    this.hubConnection = new HubConnectionBuilder()
        .withUrl(info.url, options)
        .configureLogging(LogLevel.Information)
        .build();

    this.hubConnection.start().catch(err => console.error(err.toString()));
    this.hubConnection.on('notify', (datas: SignalRResponse[]) => {
      console.log({hubConncetionSettings: datas});
      if (this.canAccessStatus(datas)) {
        alert('通信可能になったよ');
      }
      this._signalRResponse.next(datas);
    });
  }

  private canAccessStatus(datas: SignalRResponse[]): boolean {
    const avadata = datas.filter(f => {
      switch (f.availability) {
        case 'Available':
        case 'AvailableIdle':
          return true;
        default:
          return false;
      }
    });
    return avadata.length > 0;
  }
}
