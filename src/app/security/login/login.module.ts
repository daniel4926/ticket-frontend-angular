import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';




@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],

  exports: [
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
