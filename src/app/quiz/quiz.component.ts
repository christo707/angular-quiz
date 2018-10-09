import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';
import { Question } from '../question';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private router: Router, private quizService: QuizService) { }

  ngOnInit() {
    if (this.quizService.qnProgress == 10)
        this.router.navigate(['/result']);
    console.log("In Quiz: ");
    console.log("Participant: " + localStorage.getItem('participant'));
    this.quizService.clear();
    this.quizService.getQuestions().subscribe(
      (questions) => {
        questions.map(question => question.json())
        console.log('Data: ' + questions[0]);
        this.quizService.qns = questions;
        this.startTimer();
      }
    );
    console.log(this.quizService.qns);
  }

  startTimer() {
    this.quizService.timer = setInterval(() => {
    this.quizService.seconds++;
    localStorage.setItem('seconds', this.quizService.seconds.toString());
    }, 1000);
  }

  answer(qID, choice) {
    this.quizService.qns[this.quizService.qnProgress].answer = choice;
    localStorage.setItem('qns', JSON.stringify(this.quizService.qns));
    this.quizService.qnProgress++;
    localStorage.setItem('qnProgress', this.quizService.qnProgress.toString());
    console.log(this.quizService.qns[this.quizService.qnProgress]);
    if (this.quizService.qnProgress == 10) {
      clearInterval(this.quizService.timer);
      this.router.navigate(['/result']);
    }
  }

}
