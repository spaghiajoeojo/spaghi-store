import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';
import { RouterModule } from '@angular/router';
import { NbAlertModule } from '@nebular/theme';


@NgModule({
  declarations: [GamesComponent],
  imports: [
    CommonModule,
    GamesRoutingModule,
    NbAlertModule,
    RouterModule
  ]
})
export class GamesModule { }
