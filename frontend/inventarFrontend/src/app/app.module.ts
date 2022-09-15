import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventarService } from './service/inventar.service';
import { ItemList } from './itemList/itemList.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field'
import { AddNewItemComponent } from './add-new-item/add-new-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClickMeComponent } from './click-me/click-me.component';

const MaterialComponents = [
  MatInputModule,
  MatFormFieldModule,
]

@NgModule({
  declarations: [
    AppComponent,
    ItemList,
    AddNewItemComponent,
    ClickMeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    InventarService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    ItemList
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }