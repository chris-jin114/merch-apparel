import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterFacade } from '../core/services/facades/filter.facade';
import { FilterState } from '../core/services/states/filter.state';
import { AccordionFacade } from '../core/services/facades/accordion.facade';
import { ImagePreloadDirective } from './directives/image-preload.directive';

@NgModule({
  declarations: [ ImagePreloadDirective ],
  imports: [ CommonModule, IonicModule, FormsModule, ReactiveFormsModule ],
  exports: [ ImagePreloadDirective ],
  providers: [FilterFacade, FilterState, AccordionFacade]
})
export class SharedModule { }
