import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InventarService } from '../service/inventar.service';
import { ItemComponent } from './../model/itemComponent';

@Component({
  selector: 'app-hello-world',
  templateUrl: './itemList.component.html',
  styleUrls: ['./itemList.component.css']
})



export class ItemList implements OnInit {

  itemComponentList: Array<ItemComponent> = [];

  constructor(private route: ActivatedRoute,
    private router: Router, private inventarService: InventarService) { }


  ngOnInit() {
    this.inventarService.readInventar().subscribe((res) => {
      console.log(res.length);
      for (var i = 0; i < res.length; i++) {
        var itemComponent = new ItemComponent();
        itemComponent.id = res[i].Id
        itemComponent.name = res[i].Name
        itemComponent.amount = res[i].Amount
        itemComponent.datecreated = res[i].Last_Update
        this.itemComponentList.push(itemComponent)
      }

    })

    
  };


}
