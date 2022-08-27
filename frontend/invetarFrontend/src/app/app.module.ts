import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventarService } from './service/inventar.service';
import { MenuComponent } from './menu/menu.component';
import { ItemList } from './itemList/itemList.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ItemList,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    InventarService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }