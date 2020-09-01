import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WomenPage } from './women.page';

const routes: Routes = [
  {
    path: '',
    component: WomenPage,
  },
  {
    path: 'shirts',
    component: WomenPage,
  },
  {
    path: 't-shirts',
    component: WomenPage,
  },
  {
    path: 'longsleeves',
    component: WomenPage,
  },
  {
    path: 'dresses',
    component: WomenPage,
  },
  {
    path: 'tanks',
    component: WomenPage,
  },
  {
    path: 'pants',
    component: WomenPage,
  },
  {
    path: 'sweatshirts',
    component: WomenPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WomenPageRoutingModule {}
