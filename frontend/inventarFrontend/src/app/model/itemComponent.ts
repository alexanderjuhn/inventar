import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-hello-world',
    templateUrl: '../itemList/itemList.component.html',
    styleUrls: ['../itemList/itemList.component.css']
})

export class ItemComponent implements OnInit {
    id: number = 0;
    name: string = "";
    amount: number = 0;
    datecreated: number = 0;
    updated: boolean = false;

    connected!: boolean 

    constructor() { }

    ngOnInit(): void {
    }

    increase() {
        this.amount++
        this.updated=true
    }

    decrease() {
        this.amount--
        if(this.amount<0){
            this.amount=0
        }
        this.updated=true
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