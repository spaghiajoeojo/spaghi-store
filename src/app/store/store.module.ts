import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [StoreComponent],
  imports: [
    CommonModule,
    StoreRoutingModule,
    RouterModule
  ]
})
export class StoreModule { }
