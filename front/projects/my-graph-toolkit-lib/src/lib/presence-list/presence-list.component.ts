import { Component, OnInit } from '@angular/core';
import { UserPresence } from '../models/user-presence';
import { PresenceListService } from './presence-list.service';
import { SubscriptionService } from '../subscription/subscription.service';

@Component({
  selector: 'mygtk-presence-list',
  templateUrl: './presence-list.component.html',
  styleUrls: ['./presence-list.component.scss']
})
export class PresenceListComponent implements OnInit {

  datas: UserPresence[] = [];

  constructor(
    private service: PresenceListService,
    private subscriptionService: SubscriptionService
  ) { }

  ngOnInit(): void {
    this.service.userPresence$.subscribe(s => {
      console.log(s)
      this.datas = s;
    });
    this.service.getUserPresence();
    this.subscriptionService.subscriptionData$.subscribe(x => {
      this.service.setSubscriptionSettings(x);
    });
    this.subscriptionService.getSubscription();
  }

}
