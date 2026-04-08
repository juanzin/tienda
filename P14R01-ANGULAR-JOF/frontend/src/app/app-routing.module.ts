import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoComponent } from './producto/producto.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

// const routes: Routes = [
//   { path: 'products', component: ProductoComponent },
//   { path: 'categories', component: CategoriaComponent },
//   { path: '', redirectTo: 'products', pathMatch: 'full' }
// ];
const routes: Routes = [
  { path: '', component: MainLayoutComponent },
  { path: 'products', component: ProductoComponent },
  { path: 'categories', component: CategoriaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
