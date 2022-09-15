import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: '.app-click-me',
  templateUrl: './click-me.component.html',
  styleUrls: ['./click-me.component.css']
})
export class ClickMeComponent implements OnInit {

  checkoutForm = this.formBuilder.group({
    name: '',
    address: ''
  });

  constructor(private formBuilder: FormBuilder,) { 
    
  }

  save(){
    console.warn('Your order has been submitted', this.checkoutForm.value);
  }
  

  ngOnInit(): void {
  }

}
