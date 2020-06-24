import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { GamesModule } from './games/games.module';
import { SocialModule } from './social/social.module';
import { StoreModule } from './store/store.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HomeModule } from './home/home.module';
import { DetailModule } from './detail/detail.module';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbMenuModule, NbDialogModule, NbCardModule, NbTabsetModule, NbInputModule, NbFormFieldModule, NbIconModule, NbButtonModule, NbUserModule, NbContextMenuModule } from '@nebular/theme';



import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { UploadComponent } from './upload/upload.component';
import { RouterModule } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { SocialComponent } from './social/social.component';
import { StoreComponent } from './store/store.component';
import { FriendComponent } from './friend/friend.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, MenuComponent, LoginComponent, UserNavComponent, UploadComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    DetailModule,
    AppRoutingModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NbButtonModule,
    NbFormFieldModule,
    NbUserModule,
    NbContextMenuModule,
    NbTabsetModule,
    GamesModule,
    SocialModule,
    StoreModule,
    RouterModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
