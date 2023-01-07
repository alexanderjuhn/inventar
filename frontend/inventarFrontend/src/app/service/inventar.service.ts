import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemComponent } from '../model/itemComponent';
import { environment } from '../../environments/environment';

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
    private newItem = new ItemComponent()

    constructor(private http: HttpClient) {
    }

    readInventar(): Observable<any> {
        return this.http.get(this.URL + this.READ_INVENTAR);
    }

    getItemHistory(item_id: string): Observable<any> {
        const headers = new HttpHeaders().append('Item-Id', item_id);
        return this.http.get(this.URL + this.GET_ITEM_HISTORY, { headers });
    }

    updateInventar(itemComponentList: Array<ItemComponent>){
        console.log('Update inventar')
        this.http.post(this.URL + this.UPDATE_INVENTAR, itemComponentList).subscribe()
    }


    livenessProbe(): Observable<any> {
        return this.http.get(this.URL + this.LIVENESS_PROBE, { observe: 'response' })
    }

    updateShowNewItem(status: boolean){
        this.showNewItem=status
    }

    getShowNewItem(): boolean{
        return this.showNewItem
    }

    getNewItem(): ItemComponent{
        return this.newItem
    }

    setNewItem(newItem: ItemComponent){
        this.newItem = newItem
    }
}