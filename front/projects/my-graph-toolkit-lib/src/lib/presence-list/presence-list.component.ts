import { Component, OnInit } from '@angular/core';
import { UserPresence } from '../models/user-presence';
import { PresenceListService } from './presence-list.service';
import { SubscriptionService } from '../subscription/subscription.service';
import { SignalRService } from '../singal-r/signal-r.service';

@Component({
  selector: 'mygtk-presence-list',
  templateUrl: './presence-list.component.html',
  styleUrls: ['./presence-list.component.scss']
})
export class PresenceListComponent implements OnInit {

  datas: UserPresence[] = [];

  constructor(
    private service: PresenceListService,
    private subscriptionService: SubscriptionService,
    private signalRService: SignalRService
  ) { }

  ngOnInit(): void {
    this.service.userPresence$.subscribe(s => {
      this.datas = s;
    });
    this.service.getUserPresence();
    this.subscriptionService.subscriptionData$.subscribe(x => {
      this.service.setSubscriptionSettings(x);
      if (x.length > 0) {
        this.signalRService.setSignalRHub();
      }
    });
    this.subscriptionService.getSubscription();
    this.signalRService.signalRResponse$.subscribe(x => {
      this.service.adjustSignalRResponse(x);
    });
  }

}
