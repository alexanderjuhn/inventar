import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'frontend-spring-boot-angular-hello-world-example';

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }
}