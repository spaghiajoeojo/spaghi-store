import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  @Input() public friend: { name: string, avatarUrl: string, online: boolean }

  constructor() { }

  ngOnInit(): void {
  }

}
