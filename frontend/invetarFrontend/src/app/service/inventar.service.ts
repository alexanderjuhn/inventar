import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InventarService {

    private readonly URL = 'http://localhost:8080/readInventar'
    
    constructor(private http: HttpClient) {
    }

    readInventar() : Observable<any> {
        console.log('Request sent')
        return this.http.get(this.URL);
    }

    updateInventar(){
        console.log('Update inventar')
    }
}