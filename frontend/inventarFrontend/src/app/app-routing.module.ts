import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemList } from './itemList/itemList.component';

const routes: Routes = [
  {path: '', component: ItemList},
  {path: 'hello-world', component: ItemList},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }