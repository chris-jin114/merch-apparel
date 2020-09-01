import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LayoutModule } from 'src/app/layouts/layout.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentModule } from 'src/app/components/component.module';


import { OrganicPage } from './organic.page';
import { OrganicPageRoutingModule } from './organic-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    LayoutModule,
    ComponentModule,
    OrganicPageRoutingModule,
  ],
  declarations: [OrganicPage]
})
export class OrganicPageModule {}
