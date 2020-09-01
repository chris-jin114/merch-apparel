import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { NavbarComponent } from './header/navbar/navbar.component';
import { FilterComponent } from './filter/filter.component';
import { FooterComponent } from './footer/footer.component';
import { SideMenuComponent } from './header/side-menu/side-menu.component';
import { AccordionItemComponent } from './filter/accordion-item/accordion-item.component';

@NgModule({
  declarations: [ SideMenuComponent, FooterComponent, NavbarComponent, FilterComponent, AccordionItemComponent ],
  imports: [ CommonModule, IonicModule ],
  exports: [ SideMenuComponent, FooterComponent, NavbarComponent, FilterComponent ]
})

export class LayoutModule { }
