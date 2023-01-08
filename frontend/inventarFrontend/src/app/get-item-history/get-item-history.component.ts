import { Component } from '@angular/core';
import { InventarService } from '../service/inventar.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ItemHistoryEntry } from '../model/ItemHistoryEntry';

@Component({
  selector: '.app-get-item-history',
  templateUrl: './get-item-history.component.html',
  styleUrls: ['./get-item-history.component.css']
})
export class GetItemHistoryComponent {
  
  itemForm = this.formBuilder.group({
    name: '',
  });

  constructor(private inventarService: InventarService,private formBuilder: FormBuilder,) {
  }


  close(){
    this.inventarService.updateShowHome(true)
    this.inventarService.updateShowItemHistory(false)
  }

  getHistory() : Array<ItemHistoryEntry>{
    return this.inventarService.getItemHistoryList()
  }

  getItemName() : string {
    return this.inventarService.getItemName()
  }

}
