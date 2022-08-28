import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InventarService } from '../service/inventar.service';
import { ItemComponent } from '../model/itemComponent';
import { first, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-hello-world',
  templateUrl: './itemList.component.html',
  styleUrls: ['./itemList.component.css']
})



export class ItemList implements OnInit {

  connected: boolean = true
  loadContent: boolean = true

  itemComponentList: Array<ItemComponent> = [];
  subscription!: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router, private inventarService: InventarService) { }



  update() {
    console.log("Update Trigger")
    this.inventarService.updateInventar(this.itemComponentList)
    window.location.reload()
  }

  reload() {
    console.log("Reload Trigger");
    this.itemComponentList=[]
    this.ngOnInit()
  }

  newItem() {
    console.log('New Item')
  }


  ngOnInit() {
    if (this.itemComponentList.length==0) {
      console.log('Load Inventory')
      this.inventarService.readInventar().subscribe((res) => {
        for (var i = 0; i < res.length; i++) {
          var itemComponent = new ItemComponent();
          itemComponent.id = res[i].Id
          itemComponent.name = res[i].Name
          itemComponent.amount = res[i].Amount
          itemComponent.datecreated = res[i].Last_Update
          this.itemComponentList.push(itemComponent)
        }

      })
    }
  };

  ngAfterContentInit() {
    const source = interval(2000);
    this.subscription = source.subscribe(val => this.livenessProbe());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  livenessProbe() {
    this.inventarService.livenessProbe().subscribe(
      res => {
        this.connected=true
      }, error => {
        this.connected=false
      }
    )    
  }
}
