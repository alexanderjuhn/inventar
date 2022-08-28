import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventarService } from './service/inventar.service';
import { ItemList } from './itemList/itemList.component';

@NgModule({
  declarations: [
    AppComponent,
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