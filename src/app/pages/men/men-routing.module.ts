import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenPage } from './men.page';

const routes: Routes = [
  {
    path: '',
    component: MenPage,
  },
  {
    path: 'shirts',
    component: MenPage,
  },
  {
    path: 't-shirts',
    component: MenPage,
  },
  {
    path: 'longsleeves',
    component: MenPage,
  },
  {
    path: 'jackets',
    component: MenPage,
  },
  {
    path: 'tanks',
    component: MenPage,
  },
  {
    path: 'pants',
    component: MenPage,
  },
  {
    path: 'sweatshirts',
    component: MenPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenPageRoutingModule {}
