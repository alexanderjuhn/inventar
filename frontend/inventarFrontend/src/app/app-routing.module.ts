import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemList } from './itemList/itemList.component';
import { MatFormFieldModule } from '@angular/material/form-field';

const routes: Routes = [
  {path: '', component: ItemList},
  {path: 'hello-world', component: ItemList},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),MatFormFieldModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }