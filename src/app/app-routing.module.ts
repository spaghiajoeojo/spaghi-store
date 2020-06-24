import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeRoutingModule } from './home/home-routing.module';
import { DetailRoutingModule } from './detail/detail-routing.module';
import { SocialRoutingModule } from './social/social-routing.module';
import { StoreRoutingModule } from './store/store-routing.module';
import { GamesRoutingModule } from './games/games-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomeRoutingModule,
    DetailRoutingModule,
    SocialRoutingModule,
    StoreRoutingModule,
    GamesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
