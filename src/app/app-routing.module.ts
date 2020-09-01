import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    data: { page: 'home'} },

  { path: 'men',
    loadChildren: () => import('./pages/men/men.module').then(m => m.MenPageModule),
    data: { page: 'category' }},

  { path: 'kids',
    loadChildren: () => import('./pages/kids/kids.module').then(m => m.KidsPageModule),
    data: { page: 'category' }},

  { path: 'women',
    loadChildren: () => import('./pages/women/women.module').then(m => m.WomenPageModule),
    data: { page: 'category' }},

  { path: 'organic',
    loadChildren: () => import('./pages/organic/organic.module').then( m => m.OrganicPageModule),
    data: { page: 'category' } },

  { path: 'accessories',
    loadChildren: () => import('./pages/accessories/accessories.module').then(m => m.AccessoriesPageModule),
    data: { page: 'category' } },

  { path: 'product/:category_name/:product_id/image',
    loadChildren: () => import('./pages/image/image.module').then(m => m.ImagePageModule),
    data: { page: 'image' } },

  { path: 'product/:category_name/:product_id',
    loadChildren: () => import('./pages/product/product.module').then(m => m.ProductPageModule),
    data: { page: 'product' } },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
