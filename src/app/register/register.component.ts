import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userModel = new User('', '', '');

  registerationForm = new FormGroup({

  fnameFormControl : new FormControl('', [
    Validators.required
  ]),

  lnameFormControl : new FormControl('', [
    Validators.required
  ]),

  emailFormControl : new FormControl('', [
    Validators.required,
    Validators.email,
  ])
});
  constructor() { }

  ngOnInit() {
  }

onFormSubmit() {
  this.userModel.fname = '';
  this.userModel.lname = '';
  this.userModel.email = '';
  console.log(this.userModel);
}

}
