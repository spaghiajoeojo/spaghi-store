import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbButtonModule } from '@nebular/theme';
import { MenuComponent } from '../menu/menu.component';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective],
  imports: [CommonModule, TranslateModule, FormsModule, RouterModule, NbButtonModule],
  exports: [TranslateModule, WebviewDirective, FormsModule]
})
export class SharedModule { }
