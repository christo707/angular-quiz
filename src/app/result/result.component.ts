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

  constructor(private router: Router, public quizService: QuizService, public snackBar: MatSnackBar) {
    let msg = this.quizService.participantPosted ? 'Participant Results posted on Server' : 'Failed to Post Participant Result to Server';
    this.snackBar.open(msg, 'Undo', {
      duration: 5000
    });
  }



  ngOnInit() {
    this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
    this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
    this.quizService.qns = JSON.parse(localStorage.getItem('qns'));
    this.quizService.correctAnswerCount = JSON.parse(localStorage.getItem('correctAnswerCount'));
    if (parseInt(localStorage.getItem('qnProgress')) != (this.quizService.qns).length) {
      this.router.navigate(['/quiz']);
    }

  }

  retry() {
    this.quizService.seconds = 0;
    localStorage.setItem('seconds','0');
    this.router.navigate(['/quiz']);
  }

  result() {
    window.open(this.quizService.rootUrl + '/participants', '_blank');
  }


}
