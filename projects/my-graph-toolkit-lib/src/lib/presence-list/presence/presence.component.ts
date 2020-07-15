import { Component, OnInit, Input } from '@angular/core';
import { UserPresence } from '../../models/user-presence';

@Component({
  selector: 'mygtk-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.scss']
})
export class PresenceComponent implements OnInit {

  @Input()
  data!: UserPresence;

  constructor() { }

  ngOnInit(): void {
  }

}
