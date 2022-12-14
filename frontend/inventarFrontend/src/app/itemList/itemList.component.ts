import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InventarService } from '../service/inventar.service';
import { ItemComponent } from '../model/itemComponent';
import { interval, Subscription } from 'rxjs';
import { FormBuilder,FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemHistoryEntry } from '../model/ItemHistoryEntry';

@Component({
  selector: 'app-hello-world',
  templateUrl: './itemList.component.html',
  styleUrls: ['./itemList.component.css']
})



export class ItemList implements OnInit {

  connected: boolean = true
  loadContent: boolean = true
  showNewItem: boolean = false

  itemComponentList: Array<ItemComponent> = [];
  itemHistoryList: Array<ItemHistoryEntry> = [];
  subscription!: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router, private inventarService: InventarService, private fb: FormBuilder) { 
      
    }



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
    this.inventarService.updateShowNewItem(true)
    this.inventarService.updateShowHome(false)
  }

  itemHistory(){
    console.log('Show item history')
    this.inventarService.updateShowItemHistory(true)
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
        console.log(error)
      }
    )    
  }

  getShowNewItem(): boolean{
    return this.inventarService.getShowNewItem();
  }

  getShowItemHistory(): boolean{
    return this.inventarService.getShowItemHistory();
  }

  getShowHome(): boolean{
    return this.inventarService.getShowHome();
  }

  checkForUnsavedItems(){
    if(this.inventarService.getNewItem().name!=''){
      this.itemComponentList.push(this.inventarService.getNewItem())
      this.inventarService.setNewItem(new ItemComponent)
      this.itemComponentList.sort(function(a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    }
  }

  getHistory(item:ItemComponent){
    console.log('Get history ItemList ' + item.id)
    this.itemHistoryList=[]
    this.inventarService.getItemHistory(item.id.toString()).subscribe((res) =>{
      for (var i = 0; i < res.length; i++) {
        var itemHistoryEntry  = new ItemHistoryEntry();
        itemHistoryEntry.id = res[i].Id
        itemHistoryEntry.item_id = res[i].Item_Id
        itemHistoryEntry.amount_change = res[i].AmountChange
        itemHistoryEntry.date_change = res[i].Date_Change
        this.itemHistoryList.push(itemHistoryEntry)
      }
    }
    
    )

    this.inventarService.setItemHistoryList(this.itemHistoryList, item.name)
    
    this.inventarService.updateShowHome(false)
    this.inventarService.updateShowItemHistory(true)
  }
}
