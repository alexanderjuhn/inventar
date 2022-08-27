import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageModel } from '../model/message';

@Injectable({
    providedIn: 'root'
})
export class HelloWorldService {
    constructor(private http: HttpClient) {
    }
    executeHelloWorldService() {
        var test = this.http.get<MessageModel>('http://localhost:8080/readInventar');
        console.log(test.forEach.toString);
        
        return this.http.get<MessageModel>('http://localhost:8080/readInventar');
    }
}