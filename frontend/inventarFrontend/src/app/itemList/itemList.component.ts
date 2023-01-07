import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InventarService } from '../service/inventar.service';
import { ItemComponent } from '../model/itemComponent';
import { interval, Subscription } from 'rxjs';
import { FormBuilder,FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

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

  getHistory(item_id:number){
    console.log('Get history ItemList ' + item_id)
    this.inventarService.getItemHistory(item_id.toString()).subscribe((res) =>{
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].Id)
      }
    }
    
    )

  }
}
