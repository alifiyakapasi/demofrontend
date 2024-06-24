import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from '@components/product-list/product-list.component';
import { ProductDetailsComponent } from '@components/product-details/product-details.component';
import { AddProductComponent } from '@components/add-product/add-product.component';
import { CategoryListComponent } from '@components/category-list/category-list.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from '@components/login/login.component';

const routes: Routes = [
  { path: '', component: ProductListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'products/:id', component: ProductDetailsComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddProductComponent, canActivate: [AuthGuard] },
  { path: 'category', component: CategoryListComponent, canActivate: [AuthGuard] },
  { path: 'lazy-loading', loadChildren: () => import('./lazy-loading-routing/lazy-loading-routing.module').then(m => m.LazyLoadingRoutingModule), canActivate: [AuthGuard] },
  { path: '**', component: ProductListComponent, pathMatch: 'full', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
