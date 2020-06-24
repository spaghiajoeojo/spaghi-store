import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialRoutingModule } from './social-routing.module';
import { SocialComponent } from './social.component';
import { RouterModule } from '@angular/router';
import { NbInputModule, NbCardModule, NbFormFieldModule, NbIconModule, NbAlertModule, NbUserModule } from '@nebular/theme';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FriendComponent } from '../friend/friend.component';


@NgModule({
  declarations: [SocialComponent, FriendComponent],
  imports: [
    CommonModule,
    SocialRoutingModule,
    RouterModule,
    NbInputModule,
    NbCardModule,
    NbFormFieldModule,
    NbIconModule,
    ReactiveFormsModule,
    FormsModule,
    NbAlertModule,
    NbUserModule
  ]
})
export class SocialModule { }
