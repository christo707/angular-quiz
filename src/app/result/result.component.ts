import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private router: Router, private quizService: QuizService, public snackBar: MatSnackBar) {
    let msg = this.quizService.participantPosted ? 'Participant Results posted on Server' : 'Failed to Post Participant Result to Server';
    this.snackBar.open(msg, 'Undo', {
      duration: 5000
    });
  }



  ngOnInit() {
  }

  retry() {
    this.router.navigate(['/quiz']);


  }


}
