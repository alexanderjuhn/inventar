import { Component, OnInit } from '@angular/core';
import { InventarService } from '../service/inventar.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-hello-world',
    templateUrl: '../itemList/itemList.component.html',
    styleUrls: ['../itemList/itemList.component.css']
})

export class ItemHistoryEntry implements OnInit {
    id: number = 0;
    item_id: number = 0;
    amount_change: number = 0;
    date_change: number = 0;

    connected!: boolean 

    constructor() { }

    ngOnInit(): void {
    }

    increase() {
    }

    decrease() {
    }

    getHistory(item_id:number){
    }

    update() {
    }

    reload() {
    }

    newItem(){
    }

    livenessProbe(){
    }

    closeNewItem(){}

    checkForUnsavedItems(){}

}