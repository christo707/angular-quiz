import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup } from '@angular/forms';
import { User } from '../user';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userModel = new User('', '', '',0,'');

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
  constructor(private quizService : QuizService,private route : Router) { }

  ngOnInit() {
      localStorage.clear();
  }

onFormSubmit() {
  localStorage.clear();
  localStorage.setItem('participant',JSON.stringify(this.userModel));
  this.userModel.fname = '';
  this.userModel.lname = '';
  this.userModel.email = '';
  this.route.navigate(['/quiz']);
}

}
