import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: NbMenuItem[] = [
    {
      title: 'GAMES',
      icon: 'gamepad',
      link: '/games'
    },
    {
      title: 'STORE',
      icon: 'shopping-bag',
      link: '/store'
    },
    {
      title: 'SOCIAL',
      icon: 'users',
      link: '/social'
    },

  ];

  constructor() { }

  ngOnInit(): void {

  }

}
