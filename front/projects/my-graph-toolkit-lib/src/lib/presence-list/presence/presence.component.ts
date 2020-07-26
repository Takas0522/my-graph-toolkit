import { Component, OnInit, Input } from '@angular/core';
import { UserPresence } from '../../models/user-presence';
import { SubscriptionService } from '../../subscription/subscription.service';

@Component({
  selector: 'mygtk-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.scss']
})
export class PresenceComponent implements OnInit {

  @Input()
  data!: UserPresence;

  constructor(
    private subscriotionService: SubscriptionService
  ) { }

  ngOnInit(): void {
  }

  setSubscription(): void {
    this.subscriotionService.setSubscriotion(this.data.id);
  }

}
