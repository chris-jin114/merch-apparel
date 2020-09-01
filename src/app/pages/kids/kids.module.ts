import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LayoutModule } from 'src/app/layouts/layout.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentModule } from 'src/app/components/component.module';

import { KidsPage } from './kids.page';
import { KidsPageRoutingModule } from './kids-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    LayoutModule,
    ComponentModule,
    KidsPageRoutingModule,
  ],
  declarations: [KidsPage]
})
export class KidsPageModule {}
