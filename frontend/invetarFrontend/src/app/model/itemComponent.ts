import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-hello-world',
    templateUrl: '../itemList/itemList.component.html',
    styleUrls: ['../itemList/itemList.component.css']
})

export class ItemComponent implements OnInit {
    id: string = "";
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
}