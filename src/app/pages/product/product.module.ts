import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { ProductPage } from './product.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentModule } from 'src/app/components/component.module';

const routes: Routes = [
  {
    path: '',
    component: ProductPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ComponentModule,
    MatSliderModule,
    TooltipModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [ProductPage]
})
export class ProductPageModule {}
