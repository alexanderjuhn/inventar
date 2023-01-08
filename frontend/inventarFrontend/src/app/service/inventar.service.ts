import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemComponent } from '../model/itemComponent';
import { environment } from '../../environments/environment';
import { ItemHistoryEntry } from '../model/ItemHistoryEntry';

@Injectable({
    providedIn: 'root'
})
export class InventarService {

    private readonly URL = environment.url
    private readonly READ_INVENTAR = 'readInventar'
    private readonly LIVENESS_PROBE = 'livenessProbe'
    private readonly UPDATE_INVENTAR = 'updateInventar'
    private readonly GET_ITEM_HISTORY = 'getItemHistory'
    private showNewItem = false
    private showItemHistory = false
    private showHome = true
    private newItem = new ItemComponent()
    private itemHistoryList: Array<ItemHistoryEntry> = []
    private itemName: string = ""

    constructor(private http: HttpClient) {
    }

    readInventar(): Observable<any> {
        return this.http.get(this.URL + this.READ_INVENTAR);
    }

    getItemHistory(item_id: string): Observable<any> {
        return this.http.get(this.URL + this.GET_ITEM_HISTORY + "?itemId=" + item_id);
    }

    updateInventar(itemComponentList: Array<ItemComponent>){
        console.log('Update inventar')
        this.http.post(this.URL + this.UPDATE_INVENTAR, itemComponentList).subscribe()
    }

    setItemHistoryList(itemHistoryListNew : Array<ItemHistoryEntry>, itemNameNew : string){
        this.itemHistoryList=itemHistoryListNew
        this.itemName=itemNameNew
    }

    getItemHistoryList(): Array<ItemHistoryEntry> {
        return this.itemHistoryList
    }

    getItemName(): string {
        return this.itemName
    }


    livenessProbe(): Observable<any> {
        return this.http.get(this.URL + this.LIVENESS_PROBE, { observe: 'response' })
    }

    updateShowNewItem(status: boolean){
        this.showNewItem=status
    }

    updateShowItemHistory(status: boolean){
        this.showItemHistory=status
    }

    updateShowHome(status: boolean){
        this.showHome=status
    }

    getShowNewItem(): boolean{
        return this.showNewItem
    }

    getShowItemHistory(): boolean{
        return this.showItemHistory
    }

    getShowHome(): boolean{
        return this.showHome
    }

    getNewItem(): ItemComponent{
        return this.newItem
    }

    setNewItem(newItem: ItemComponent){
        this.newItem = newItem
    }
}