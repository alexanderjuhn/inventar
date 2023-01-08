import { Component, OnInit, Input } from '@angular/core';
import { ItemComponent } from '../model/itemComponent';
import { InventarService } from '../service/inventar.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: '.app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.css']
})
export class AddNewItemComponent implements OnInit {

  @Input()
  public itemComponent: ItemComponent=new ItemComponent();

  itemForm = this.formBuilder.group({
    name: '',
  });

  constructor(private inventarService: InventarService,private formBuilder: FormBuilder,) {
  }

  ngOnInit(): void {
  }

  abort(){
    this.inventarService.updateShowHome(true)
    this.inventarService.updateShowNewItem(false)
  }

  saveNewItem(itemComponent: ItemComponent){
    console.log(this.itemForm.value.name)
    if(this.itemForm.value.name !=null && this.itemComponent.amount>0) {
      this.itemComponent.name=this.itemForm.value.name
      this.inventarService.setNewItem(this.itemComponent)
      this.inventarService.updateShowNewItem(false)
      this.inventarService.updateShowHome(true)
      //Debug
      console.log(this.itemComponent)
    }
  }
  
}
