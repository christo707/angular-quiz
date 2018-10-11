import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private router: Router, private quizService: QuizService) { }

  ngOnInit() {
    console.log("In Quiz: ");
    console.log("Participant: " + localStorage.getItem('participant'));
    this.quizService.clear();
    this.quizService.getQuestions().subscribe(
      (questions) => {
        this.quizService.qns = questions;
        if (this.quizService.qnProgress == (this.quizService.qns).length)
            this.router.navigate(['/result']);
        this.startTimer();
      }
    );
  }

  startTimer() {
    this.quizService.timer = setInterval(() => {
    this.quizService.seconds++;
    localStorage.setItem('seconds', this.quizService.seconds.toString());
    }, 1000);
  }

  answer(qID, choice) {
    console.log('Saving Answer for ques Id: ' + qID);
    this.quizService.qns[this.quizService.qnProgress].answer = choice;
    localStorage.setItem('qns', JSON.stringify(this.quizService.qns));
    if(this.quizService.qns[this.quizService.qnProgress].answer == this.quizService.qns[this.quizService.qnProgress].correct)
      {
        this.quizService.correctAnswerCount++;
        localStorage.setItem('correctAnswerCount', this.quizService.correctAnswerCount.toString());
      }
    this.quizService.qnProgress++;
    localStorage.setItem('qnProgress', this.quizService.qnProgress.toString());
    console.log(this.quizService.qns[this.quizService.qnProgress - 1]);
    if (this.quizService.qnProgress == this.quizService.qns.length) {
      clearInterval(this.quizService.timer);
      this.router.navigate(['/result']);
    }
  }

}
