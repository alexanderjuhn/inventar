import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-hello-world',
    templateUrl: './itemList.component.html',
    styleUrls: ['./itemList.component.css']
})

export class ItemComponent implements OnInit {
    id: string = "";
    name: string = "";
    amount: number = 0;
    datecreated: number = 0;
    updated: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }
}