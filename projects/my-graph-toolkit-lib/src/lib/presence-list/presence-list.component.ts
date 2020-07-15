import { Component, OnInit } from '@angular/core';
import { UserPresence } from '../models/user-presence';
import { PresenceListService } from './presence-list.service';

@Component({
  selector: 'mygtk-presence-list',
  templateUrl: './presence-list.component.html',
  styleUrls: ['./presence-list.component.scss']
})
export class PresenceListComponent implements OnInit {

  datas: UserPresence[] = [
    { id: 'aaa', name: 'hoge', activity: 'act', availability: '', outputActivity: 'Ayye'}
  ];

  constructor(
    private service: PresenceListService
  ) { }

  ngOnInit(): void {
    this.service.getUserList$();
  }

}
