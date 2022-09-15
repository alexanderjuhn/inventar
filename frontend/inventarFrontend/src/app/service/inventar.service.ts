import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemComponent } from '../model/itemComponent';

@Injectable({
    providedIn: 'root'
})
export class InventarService {

    private readonly URL = 'http://192.168.2.208:8080/'
    private readonly READ_INVENTAR = 'readInventar'
    private readonly LIVENESS_PROBE = 'livenessProbe'
    private readonly UPDATE_INVENTAR = 'updateInventar'
    private showNewItem = false
    private newItem = new ItemComponent()

    constructor(private http: HttpClient) {
    }

    readInventar(): Observable<any> {
        return this.http.get(this.URL + this.READ_INVENTAR);
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