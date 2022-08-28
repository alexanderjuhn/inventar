import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class InventarService {

    private readonly URL = 'http://192.168.2.208:8080/'
    private readonly READ_INVENTAR = 'readInventar'
    private readonly LIVENESS_PROBE = 'livenessProbe'

    public connected = false

    constructor(private http: HttpClient) {
    }

    readInventar(): Observable<any> {
        return this.http.get(this.URL + this.READ_INVENTAR);
    }

    updateInventar() {
        console.log('Update inventar')
    }

    livenessProbe(): Observable<any> {
        return this.http.get(this.URL + this.LIVENESS_PROBE, { observe: 'response' })
    }

    onError() {
        this.connected = false
    }

}