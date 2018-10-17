import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';
import { User } from '../user';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  user: User;
  loaded: boolean = true;

  constructor(private router: Router, public quizService: QuizService) { }

  ngOnInit() {
    console.log("In Quiz: ");
    console.log("Participant: " + localStorage.getItem('participant'));
    let u = JSON.parse(localStorage.getItem('participant'));
    this.user = new User(u.name, u.email, u.score, u.time);
     if (parseInt(localStorage.getItem('seconds')) > 0) {
       this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
       this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
       this.quizService.qns = JSON.parse(localStorage.getItem('qns'));
       if (this.quizService.qnProgress == (this.quizService.qns).length)
          this.router.navigate(['/result']);
       else
          this.startTimer();
     } else {
    this.quizService.clear();
    this.quizService.getQuestions().subscribe(
      (questions) => {
        this.quizService.qns = questions;
        if (this.quizService.qnProgress == (this.quizService.qns).length)
            this.router.navigate(['/result']);
        this.startTimer();
        this.loaded = false;
      });
    }
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
      this.user.score = this.quizService.correctAnswerCount;
      clearInterval(this.quizService.timer);
      this.user.time = this.quizService.displayTimeElapsed();
      this.quizService.submitScore(this.user).subscribe(
        data => {
          console.log('Participant Posted : ' + data);
          this.quizService.participantPosted = true;
          this.router.navigate(['/result']);
        }, err => {
          console.log('Participant Post Failed : ' + err);
          this.quizService.participantPosted = false;
          this.router.navigate(['/result']);
        });
    }
  }

}
